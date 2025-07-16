'use client';

import { submitContact } from '@/app/actions/contact';
import Button from '@/components/ui/button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
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
      <Input
        label="Name"
        type="text"
        id="name"
        name="name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        variant="glass"
        fullWidth
        disabled={isPending}
      />
      <Input
        label="Email"
        type="email"
        id="email"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        variant="glass"
        fullWidth
        disabled={isPending}
      />
      <Textarea
        label="Message"
        id="message"
        name="message"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        variant="glass"
        fullWidth
        rows={6}
        disabled={isPending}
      />
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
        <p className={`text-sm mt-4 text-center ${status.startsWith('Failed') || status.startsWith('An error') ? 'text-danger' : 'text-accent'}`}>
          {status}
        </p>
      }
    </form>
  );
};
