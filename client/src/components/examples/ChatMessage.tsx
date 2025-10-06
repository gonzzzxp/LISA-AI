import { ChatMessage } from '../ChatMessage';

export default function ChatMessageExample() {
  const userMessage = {
    id: '1',
    role: 'user' as const,
    content: 'Hello LISA! Can you help me with a technical question?',
    timestamp: Date.now() - 60000,
  };

  const assistantMessage = {
    id: '2',
    role: 'assistant' as const,
    content: 'Hello! Of course, I\'d be happy to help the BIOS team with any technical questions. What would you like to know?',
    timestamp: Date.now(),
  };

  return (
    <div className="p-6 bg-background">
      <ChatMessage message={userMessage} />
      <ChatMessage message={assistantMessage} />
    </div>
  );
}
