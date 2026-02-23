import { WordSearchGame } from "./components/WordSearchGame";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col relative">
      <main className="flex-1 flex items-center justify-center p-0 sm:p-4">
        <WordSearchGame />
      </main>
    </div>
  );
}
