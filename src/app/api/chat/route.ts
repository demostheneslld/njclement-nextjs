import { getModel, SYSTEM_PROMPTS } from '@/config/ai';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

async function checkUsageLimit(): Promise<boolean> {
  const limit = parseFloat(process.env.OPENAI_USAGE_LIMIT || '0');
  if (!limit) return false;
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .slice(0, 10);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .slice(0, 10);
  const resp = await fetch(
    `https://api.openai.com/dashboard/billing/usage?start_date=${startDate}&end_date=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    },
  );
  if (!resp.ok) return false;
  const data = await resp.json();
  const used = (data.total_usage || 0) / 100;
  return used >= limit;
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI not configured' }, { status: 500 });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const overLimit = await checkUsageLimit();
  if (overLimit) {
    return NextResponse.json(
      { error: 'Too many people have been chatting this month.' },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const messages = body.messages || [];
    const completion = await openai.chat.completions.create({
      model: getModel({ requiresThinking: true, costLevel: "LOW" }),
      stream: true,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.getChatAboutMePrompt(),
        },
        {
          role: 'assistant',
          content: SYSTEM_PROMPTS.getChatAboutMeInitialMessage(),
        },
        ...messages,
      ],
    });

    const stream = new ReadableStream<string | Uint8Array>({
      async start(controller) {
        for await (const chunk of completion) {
          const token = chunk.choices[0]?.delta?.content || '';
          if (token) controller.enqueue(token);
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Looks like NathanBot is really popular right now. Please try again later or contact us if you want to pay for more tokens :P' }, { status: 500 });
  }
}
