import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
      <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
      <p className="mt-4 text-lg font-medium text-gray-400">Generando sopa de letras...</p>
    </div>
  );
}
