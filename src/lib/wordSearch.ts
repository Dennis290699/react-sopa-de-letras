export type Cell = {
  letter: string;
  row: number;
  col: number;
  isSelected: boolean;
  isFound: boolean;
  foundColor?: string;
};

export type Grid = Cell[][];

export type WordPosition = {
  word: string;
  startRow: number;
  startCol: number;
  direction: 'horizontal' | 'vertical' | 'diagonal';
  color: string;
};

const GRID_SIZE = 15; // Standard size
const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

// Soft pastel colors for found words (light/dark compatible via opacity or specific shades)
const COLORS = [
  "bg-red-200 dark:bg-red-900/50",
  "bg-orange-200 dark:bg-orange-900/50",
  "bg-amber-200 dark:bg-amber-900/50",
  "bg-yellow-200 dark:bg-yellow-900/50",
  "bg-lime-200 dark:bg-lime-900/50",
  "bg-green-200 dark:bg-green-900/50",
  "bg-emerald-200 dark:bg-emerald-900/50",
  "bg-teal-200 dark:bg-teal-900/50",
  "bg-cyan-200 dark:bg-cyan-900/50",
  "bg-sky-200 dark:bg-sky-900/50",
  "bg-blue-200 dark:bg-blue-900/50",
  "bg-indigo-200 dark:bg-indigo-900/50",
  "bg-violet-200 dark:bg-violet-900/50",
  "bg-purple-200 dark:bg-purple-900/50",
  "bg-fuchsia-200 dark:bg-fuchsia-900/50",
  "bg-pink-200 dark:bg-pink-900/50",
  "bg-rose-200 dark:bg-rose-900/50",
];

function getRandomColor(index: number) {
  return COLORS[index % COLORS.length];
}

export function generateGrid(words: string[]): { grid: Grid; placedWords: WordPosition[] } {
  // Initialize empty grid
  const grid: Grid = Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => ({
      letter: '',
      row,
      col,
      isSelected: false,
      isFound: false,
    }))
  );

  const placedWords: WordPosition[] = [];
  
  // Sort words by length descending to place longest first
  const sortedWords = [...words].sort((a, b) => b.length - a.length);

  for (let i = 0; i < sortedWords.length; i++) {
    const word = sortedWords[i].toUpperCase();
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const direction = Math.random() < 0.33 ? 'horizontal' : Math.random() < 0.66 ? 'vertical' : 'diagonal';
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      if (canPlaceWord(grid, word, row, col, direction)) {
        placeWord(grid, word, row, col, direction);
        placedWords.push({
          word,
          startRow: row,
          startCol: col,
          direction,
          color: getRandomColor(i),
        });
        placed = true;
      }
      attempts++;
    }
  }

  // Fill empty spaces with random letters
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col].letter === '') {
        grid[row][col].letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      }
    }
  }

  return { grid, placedWords };
}

function canPlaceWord(grid: Grid, word: string, row: number, col: number, direction: string): boolean {
  if (direction === 'horizontal') {
    if (col + word.length > GRID_SIZE) return false;
    for (let i = 0; i < word.length; i++) {
      const cell = grid[row][col + i];
      if (cell.letter !== '' && cell.letter !== word[i]) return false;
    }
  } else if (direction === 'vertical') {
    if (row + word.length > GRID_SIZE) return false;
    for (let i = 0; i < word.length; i++) {
      const cell = grid[row + i][col];
      if (cell.letter !== '' && cell.letter !== word[i]) return false;
    }
  } else if (direction === 'diagonal') {
    if (row + word.length > GRID_SIZE || col + word.length > GRID_SIZE) return false;
    for (let i = 0; i < word.length; i++) {
      const cell = grid[row + i][col + i];
      if (cell.letter !== '' && cell.letter !== word[i]) return false;
    }
  }
  return true;
}

function placeWord(grid: Grid, word: string, row: number, col: number, direction: string) {
  for (let i = 0; i < word.length; i++) {
    let r = row;
    let c = col;
    if (direction === 'horizontal') c += i;
    else if (direction === 'vertical') r += i;
    else if (direction === 'diagonal') {
      r += i;
      c += i;
    }
    grid[r][c].letter = word[i];
  }
}
