import { Bot } from "lucide-react";

interface ChatHeaderProps {
  isConnected: boolean;
}

export function ChatHeader({ isConnected }: ChatHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold" data-testid="text-app-title">LISA</h1>
            <p className="text-sm text-muted-foreground">BIOS Team AI Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-status-online' : 'bg-status-offline'
            }`}
            data-testid="status-connection"
          />
          <span className="text-sm text-muted-foreground">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </header>
  );
}
