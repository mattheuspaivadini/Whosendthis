'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SendForm from '@/components/SendForm';

export default function SendPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      {submitted ? (
        <div className="max-w-sm w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-white mb-3">Mensagem enviada!</h1>
          <p className="text-gray-400 mb-10">
            Ela está lá fora, esperando para ser lida por alguém.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-3"
          >
            ✉️ Enviar outra mensagem
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Voltar ao início
          </button>
        </div>
      ) : (
        <>
          <SendForm onSuccess={() => setSubmitted(true)} />
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-300 text-sm mt-6 transition-colors"
          >
            ← Cancelar
          </button>
        </>
      )}
    </main>
  );
}
