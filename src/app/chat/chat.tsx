"use client";
import { SYSTEM_PROMPTS } from '@/config/ai';
import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const initialMessage: Message = {
  role: 'assistant',
  content: SYSTEM_PROMPTS.getChatAboutMeInitialMessage(),
};

export default function ChatAboutMe() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

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
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div ref={chatContainerRef} className="border rounded p-4 h-80 overflow-y-auto bg-white">
        {messages.map((m, idx) => (
          <div key={idx} className="mb-2">
            <strong>{m.role === 'user' ? 'You' : 'NathanBot'}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          ref={inputRef}
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

  );
}
