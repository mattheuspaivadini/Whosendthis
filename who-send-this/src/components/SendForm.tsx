'use client';

import { useState } from 'react';

interface SendFormProps {
  onSuccess: () => void;
}

export default function SendForm({ onSuccess }: SendFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const counterColor =
    content.length === 500
      ? 'text-red-400'
      : content.length > 450
        ? 'text-yellow-400'
        : 'text-gray-500';

  async function handleSubmit() {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (response.status === 201) {
        onSuccess();
        setContent('');
        return;
      }

      const data = (await response.json()) as { error?: string };
      setError(data.error ?? 'Erro ao enviar mensagem.');
    } catch {
      setError('Erro ao enviar mensagem.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl w-full">
      <h1 className="text-3xl font-bold text-white mb-3">Diga algo para o mundo...</h1>
      <p className="text-gray-400 mb-8">
        Sua mensagem será anônima e poderá ser lida por qualquer pessoa.
      </p>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={500}
        placeholder="Escreva o que quiser. Ninguém vai saber que foi você."
        className="w-full min-h-[200px] bg-gray-900 border border-gray-700 focus:border-violet-500 focus:outline-none rounded-xl p-4 text-white resize-none transition-colors"
      />
      <p className={`text-right ${counterColor}`}>{content.length}/500</p>
      {error ? <p className="text-red-400 text-sm mt-2">{error}</p> : null}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={content.trim().length === 0 || loading}
        className={`w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors mt-6 ${
          content.trim().length === 0 || loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Enviando...' : '🚀 Enviar mensagem'}
      </button>
    </div>
  );
}
