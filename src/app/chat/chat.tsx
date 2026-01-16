"use client";
import Button from '@/components/ui/button';
import Textarea from '@/components/ui/Textarea';
import { SYSTEM_PROMPTS } from '@/config/ai';
import { useEffect, useRef, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatAboutMe() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
    <div className="max-w-3xl mx-auto space-y-4">
      {messages.length > 0 && (
        <div ref={chatContainerRef} className="w-full border border-text-low rounded-lg p-4 h-80 overflow-y-auto bg-glass-elev2 backdrop-blur-xl">
          {messages.map((m, idx) => (
            <div key={idx} className="mb-2 text-med">
              <strong className="text-high">{m.role === 'user' ? 'You' : 'NJCbot'}:</strong> {m.content}
            </div>
          ))}
        </div>
      )}
      <form onSubmit={sendMessage} className="space-y-4">
        <p className="text-med text-center">NJCbot is an expert - what do you want to know?</p>
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about our experience, skills, or projects..."
          disabled={loading}
          required
          variant="glass"
          fullWidth
          rows={3}
          resize="none"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading || !input.trim()}
            icon={<HiArrowRight />}
          >
            {loading ? 'Thinking...' : 'Send'}
          </Button>
        </div>
      </form>
      {error && <p className="text-danger text-center">{error}</p>}
    </div>

  );
}
