import { NextRequest, NextResponse } from 'next/server';

import { getChatContext, getStaticChatResponse } from '@/lib/chatbot';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = String(body.message || '').trim();
    const context = body.context || getChatContext();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content:
                  'You are a concise portfolio assistant. Answer only from the provided portfolio context and do not invent details.',
              },
              {
                role: 'system',
                content: `Context: ${JSON.stringify(context)}`,
              },
              {
                role: 'user',
                content: message,
              },
            ],
            temperature: 0.4,
          }),
        });

        if (response.ok) {
          const payload = await response.json();
          const content = payload.choices?.[0]?.message?.content;

          if (content) {
            return NextResponse.json({ message: content, source: 'gpt-4o-mini' });
          }
        }
      } catch {
        // Fall through to local response.
      }
    }

    return NextResponse.json({
      message: getStaticChatResponse(message),
      source: 'static',
    });
  } catch {
    return NextResponse.json({ error: 'Unable to process chat request.' }, { status: 500 });
  }
}
