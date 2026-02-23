import { Trophy, RefreshCw, X } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export function VictoryModal({ isOpen, onClose, onRestart }: VictoryModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
    >
      <div 
        className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center relative transform transition-all duration-300 scale-100 opacity-100"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">¡Felicidades!</h2>
        <p className="text-gray-400 mb-6">
          Has encontrado todas las palabras correctamente.
        </p>
        
        <button
          onClick={onRestart}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
}
