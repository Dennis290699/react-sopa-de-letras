import { useEffect, useState, useRef, useCallback, type PointerEvent } from 'react';
import { generateGrid, type Grid } from '../lib/wordSearch';
import { LoadingState } from './game/LoadingState';
import { ErrorState } from './game/ErrorState';
import { GameHeader } from './game/GameHeader';
import { WordList } from './game/WordList';
import { GameBoard } from './game/GameBoard';
import { VictoryModal } from './game/VictoryModal';

const API_URL = 'https://random-word-api.herokuapp.com/word?number=50&lang=es';

export function WordSearchGame() {
  const [words, setWords] = useState<string[]>([]);
  const [grid, setGrid] = useState<Grid>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ row: number; col: number } | null>(null);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchWords = useCallback(async () => {
    setLoading(true);
    setError(null);
    setShowVictory(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar palabras');
      const data = await response.json();
      
      const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

      const uniqueWords = new Set<string>();
      const filtered: string[] = [];
      
      for (const w of data) {
        const normalized = normalize(w);
        if (normalized.length >= 3 && normalized.length <= 12 && !uniqueWords.has(normalized)) {
          uniqueWords.add(normalized);
          filtered.push(normalized);
        }
        if (filtered.length >= 12) break;
      }

      if (filtered.length < 5) {
         throw new Error('No suficientes palabras válidas');
      }

      setWords(filtered);
      const { grid: newGrid } = generateGrid(filtered);
      setGrid(newGrid);
      setFoundWords([]);
      setSelectedCells([]);
      setSelectionStart(null);
      setIsSelecting(false);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las palabras. Intentando de nuevo...');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  useEffect(() => {
    if (words.length > 0 && foundWords.length === words.length) {
      setShowVictory(true);
    }
  }, [foundWords, words]);

  // Selection Logic
  const getCellsBetween = useCallback((start: { row: number; col: number }, end: { row: number; col: number }) => {
    const cells: { row: number; col: number }[] = [];
    const dx = end.col - start.col;
    const dy = end.row - start.row;
    
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    if (steps === 0) return [{ ...start }];

    if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) {
      return []; 
    }

    const xInc = dx / steps;
    const yInc = dy / steps;

    for (let i = 0; i <= steps; i++) {
      cells.push({
        row: Math.round(start.row + i * yInc),
        col: Math.round(start.col + i * xInc)
      });
    }
    return cells;
  }, []);

  const handlePointerDown = (row: number, col: number, e: PointerEvent) => {
    e.preventDefault();
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    
    setIsSelecting(true);
    setSelectionStart({ row, col });
    setSelectedCells([{ row, col }]);
  };

  useEffect(() => {
    const handlePointerMove = (e: globalThis.PointerEvent) => {
      if (!isSelecting || !selectionStart) return;
      
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const cellElement = element?.closest('[data-cell="true"]');
      
      if (cellElement instanceof HTMLElement) {
        const row = parseInt(cellElement.dataset.row || '-1');
        const col = parseInt(cellElement.dataset.col || '-1');
        
        if (row >= 0 && col >= 0) {
          const newSelection = getCellsBetween(selectionStart, { row, col });
          if (newSelection.length > 0) {
            setSelectedCells(newSelection);
          }
        }
      }
    };

    const handlePointerUp = () => {
      if (!isSelecting) return;
      setIsSelecting(false);
      
      if (selectedCells.length > 0) {
        const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col].letter).join('');
        const reversedWord = selectedWord.split('').reverse().join('');
        
        const found = words.find(w => w === selectedWord || w === reversedWord);
        
        if (found && !foundWords.includes(found)) {
          setFoundWords(prev => [...prev, found]);
          
          setGrid(prev => {
            const newGrid = prev.map(row => row.map(cell => ({ ...cell })));
            selectedCells.forEach(({ row, col }) => {
              newGrid[row][col].isFound = true;
            });
            return newGrid;
          });
        }
      }
      
      setSelectionStart(null);
      setSelectedCells([]);
    };

    if (isSelecting) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isSelecting, selectionStart, grid, words, foundWords, getCellsBetween, selectedCells]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchWords} />;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-lg mx-auto p-2 sm:p-4 gap-6 min-h-screen">
      
      <div className="w-full">
        <GameHeader 
          foundCount={foundWords.length} 
          totalCount={words.length} 
          onRestart={fetchWords} 
        />
        <WordList words={words} foundWords={foundWords} />
      </div>

      <GameBoard 
        grid={grid} 
        selectedCells={selectedCells} 
        onPointerDown={handlePointerDown} 
        gridRef={gridRef} 
      />

      <VictoryModal 
        isOpen={showVictory} 
        onClose={() => setShowVictory(false)} 
        onRestart={fetchWords} 
      />

    </div>
  );
}
