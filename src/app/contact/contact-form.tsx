'use client';

import { submitContact } from '@/app/actions/contact';
import Button from '@/components/ui/button';
import { useCallback, useState, useTransition } from 'react';
import { HiArrowRight } from 'react-icons/hi';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback(async (formData: FormData) => {
    startTransition(async () => {
      setStatus('Sending...');
      try {
        const result = await submitContact(formData);
        if (result.success) {
          setStatus('Message sent successfully!');
          setName('');
          setEmail('');
          setMessage('');
        } else {
          setStatus(`Failed to send message: ${result.error || 'Please try again.'}`);
        }
      } catch (error) {
        console.error(error);
        setStatus('An error occurred. Please try again later.');
      }
    });
  }, []);

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full min-h-[150px]"
          rows={6}
          disabled={isPending}
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isPending}
          icon={isPending ? undefined : <HiArrowRight />}
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
      {status && 
        <p className={`text-sm mt-4 text-center ${status.startsWith('Failed') || status.startsWith('An error') ? 'text-red-600' : 'text-green-600'}`}>
          {status}
        </p>
      }
    </form>
  );
};
