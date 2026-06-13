'use client';

import type { Message } from '@/types';

interface MessageCardProps {
  message: Message;
  onNext: () => void;
}

export default function MessageCard({ message, onNext }: MessageCardProps) {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(
    new Date(message.created_at),
  );

  return (
    <div className="max-w-xl w-full mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8">
      <p className="text-gray-500 text-sm mb-6">💌 Alguém enviou isso para o mundo...</p>
      <p className="text-white text-xl font-medium leading-relaxed mb-8 whitespace-pre-wrap">
        {message.content}
      </p>
      <hr className="border-gray-800 mb-6" />
      <p className="text-gray-500 text-sm mb-8">Anônimo · {formattedDate}</p>
      <button
        type="button"
        onClick={onNext}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
      >
        📬 Receber outra mensagem
      </button>
    </div>
  );
}
