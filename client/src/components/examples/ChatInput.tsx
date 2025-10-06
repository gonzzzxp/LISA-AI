import { ChatInput } from '../ChatInput';

export default function ChatInputExample() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1" />
      <ChatInput 
        onSendMessage={(msg) => console.log('Message sent:', msg)} 
        disabled={false}
      />
    </div>
  );
}
