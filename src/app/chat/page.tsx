import type { Metadata } from 'next';
import ChatAboutMe from './chat';

export const metadata: Metadata = {
  title: 'Chat About Me | Nathaniel J. Clement',
  description: 'Chat with an AI about Nathaniel J. Clement.',
};

export default function ChatPage() {
  return <ChatAboutMe />;
}
