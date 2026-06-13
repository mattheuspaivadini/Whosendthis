'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">Who Send This?</h1>
      <p className="text-gray-400 text-lg mb-12">Mensagens anônimas. Sem rastros.</p>

      <div className="flex flex-col gap-4 w-full items-center">
        <button
          type="button"
          onClick={() => router.push('/receive')}
          className="w-full max-w-xs bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg py-4 px-8 rounded-xl transition-colors"
        >
          📬 Receber uma mensagem
        </button>
        <button
          type="button"
          onClick={() => router.push('/send')}
          className="w-full max-w-xs border border-gray-600 hover:border-gray-400 hover:bg-gray-800 text-white font-semibold text-lg py-4 px-8 rounded-xl transition-colors"
        >
          ✉️ Enviar uma mensagem anônima
        </button>
      </div>

      <p className="text-gray-600 text-sm mt-16">
        Ninguém sabe de onde veio. Ninguém sabe para onde foi.
      </p>
    </main>
  );
}
