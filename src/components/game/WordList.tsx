import { cn } from '../../lib/utils';

interface WordListProps {
  words: string[];
  foundWords: string[];
}

export function WordList({ words, foundWords }: WordListProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {words.map((word) => {
        const isFound = foundWords.includes(word);
        return (
          <div
            key={word}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 cursor-default select-none border",
              isFound
                ? "bg-emerald-900/30 border-emerald-800 text-emerald-400 line-through decoration-2 opacity-50"
                : "bg-gray-800/50 border-gray-700 text-gray-400"
            )}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
}
