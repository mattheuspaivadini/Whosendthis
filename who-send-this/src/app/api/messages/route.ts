import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body as { content: string };

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Conteúdo inválido.' }, { status: 400 });
    }

    const trimmed = content.trim();

    if (trimmed.length === 0) {
      return NextResponse.json({ error: 'A mensagem não pode estar vazia.' }, { status: 400 });
    }

    if (trimmed.length > 500) {
      return NextResponse.json({ error: 'A mensagem deve ter no máximo 500 caracteres.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({ content: trimmed })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Erro ao salvar a mensagem.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
