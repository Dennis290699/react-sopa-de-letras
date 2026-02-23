import { Trophy, RefreshCw } from 'lucide-react';

interface GameHeaderProps {
  foundCount: number;
  totalCount: number;
  onRestart: () => void;
}

export function GameHeader({ foundCount, totalCount, onRestart }: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-gray-200 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        Palabras
      </h2>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300 border border-gray-700">
          {foundCount} / {totalCount}
        </span>
        <button
          onClick={onRestart}
          className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800"
          title="Nueva Partida"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
