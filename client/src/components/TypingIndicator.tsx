import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6" data-testid="indicator-typing">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-card border border-card-border flex items-center justify-center">
        <Bot className="w-4 h-4 text-foreground" />
      </div>
      
      <div className="flex flex-col items-start">
        <div className="px-4 py-3 rounded-2xl bg-card border border-card-border rounded-bl-md">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
