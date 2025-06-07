import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { bio } from '@/config/constants';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an assistant answering questions about Nathaniel J. Clement based on the following bio: ${bio}`,
        },
        ...messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content || '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to generate reply.' }, { status: 500 });
  }
}
