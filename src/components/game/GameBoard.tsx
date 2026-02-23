import { type PointerEvent, type RefObject } from 'react';
import { cn } from '../../lib/utils';
import { type Grid } from '../../lib/wordSearch';

interface GameBoardProps {
  grid: Grid;
  selectedCells: { row: number; col: number }[];
  onPointerDown: (row: number, col: number, e: PointerEvent) => void;
  gridRef: RefObject<HTMLDivElement | null>;
}

export function GameBoard({ grid, selectedCells, onPointerDown, gridRef }: GameBoardProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center flex-1">
      <div 
        className="relative select-none touch-none"
        ref={gridRef}
      >
        <div 
          className="grid gap-0.5 sm:gap-1"
          style={{ 
            gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))` 
          }}
        >
          {grid.flat().map((cell) => {
            const isSelected = selectedCells.some(s => s.row === cell.row && s.col === cell.col);
            
            return (
              <div
                key={`${cell.row}-${cell.col}`}
                data-cell="true"
                data-row={cell.row}
                data-col={cell.col}
                onPointerDown={(e) => onPointerDown(cell.row, cell.col, e)}
                className={cn(
                  "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center text-sm sm:text-lg md:text-xl font-medium rounded-sm sm:rounded-md transition-all duration-150 cursor-pointer select-none",
                  // Default state - Dark theme optimized
                  !cell.isFound && !isSelected && "text-gray-400 hover:bg-gray-800/50 hover:text-white",
                  // Selected state
                  isSelected && "bg-indigo-600 text-white scale-105 shadow-lg z-10 rounded-full",
                  // Found state
                  cell.isFound && !isSelected && "bg-emerald-500/20 text-emerald-400 font-bold"
                )}
              >
                {cell.letter}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
