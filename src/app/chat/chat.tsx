"use client";
import { useState } from 'react';
import Section from '@/components/ui/Section';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatAboutMe() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage: Message = { role: 'user', content: input };
    setMessages((m) => [...m, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      } else {
        setError(data.error || 'Unable to get reply');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Chat About Me" subtitle="Ask anything about my profile" background="gray" divider>
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="border rounded p-4 h-80 overflow-y-auto bg-white">
          {messages.map((m, idx) => (
            <div key={idx} className="mb-2">
              <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.content}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            className="flex-grow border rounded p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question"
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </Section>
  );
}
