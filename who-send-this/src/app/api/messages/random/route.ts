import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Message } from '@/types';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('id, content, created_at')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Erro ao buscar mensagem.' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Nenhuma mensagem encontrada.' }, { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    const message: Message = data[randomIndex];

    return NextResponse.json({ message }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
