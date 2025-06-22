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
    let assistantIndex = 0;
    setMessages((m) => {
      assistantIndex = m.length + 1;
      return [...m, userMessage, { role: 'assistant', content: '' }];
    });
    setInput('');
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to get reply');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value);
        setMessages((m) => {
          const updated = [...m];
          updated[assistantIndex] = { role: 'assistant', content: assistantContent };
          return updated;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
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
          className={`px-4 py-2 rounded text-white ${
            loading || !input.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600'
          }`}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
      {error && <p className="text-red-600 text-center">{error}</p>}
    </div>

  );
}
