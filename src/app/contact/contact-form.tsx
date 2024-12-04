'use client';

import { submitContact } from '@/app/actions/contact';
import Button, { ButtonVariants } from '@/components/ui/button';
import { useCallback, useState, useTransition } from 'react';

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
          setStatus('Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error(error);
        setStatus('An error occurred. Please try again later.');
      }
    });
  }, []);

  return (
    <form action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="name" className="block sr-only">
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
          />
        </div>
        <div>
          <label htmlFor="email" className="block sr-only">
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
          />
        </div>
        <div>
          <label htmlFor="message" className="block sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full"
            rows={7}
          ></textarea>
        </div>
        <Button
          variants={[ButtonVariants.PRIMARY]}
          onClick={() => { }}
          onClickData={null}
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </Button>
        {status && <p>{status}</p>}
      </div>
    </form>
  );
};
