'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MessageCard from '@/components/MessageCard';
import type { Message } from '@/types';

export default function ReceivePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  async function fetchRandomMessage() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/messages/random');

      if (response.ok) {
        const data = (await response.json()) as { message: Message };
        setMessage(data.message);
        return;
      }

      setMessage(null);
      setError(response.status === 404 ? 'Nenhuma mensagem encontrada ainda.' : 'Erro ao buscar mensagem.');
    } catch {
      setMessage(null);
      setError('Erro ao buscar mensagem.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandomMessage();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      {loading ? <div className="text-gray-400 animate-pulse text-lg">Buscando mensagem...</div> : null}

      {!loading && error ? (
        <div className="max-w-xl w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Voltar ao início
          </button>
        </div>
      ) : null}

      {!loading && message ? (
        <>
          <MessageCard message={message} onNext={fetchRandomMessage} />
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-300 text-sm mt-6 transition-colors"
          >
            ← Voltar
          </button>
        </>
      ) : null}
    </main>
  );
}
