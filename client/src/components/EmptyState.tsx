import { Bot, Zap, Code, MessageSquare } from "lucide-react";

interface EmptyStateProps {
  onSuggestedPrompt: (prompt: string) => void;
}

const suggestedPrompts = [
  { icon: Code, text: "Help me debug a code issue" },
  { icon: Zap, text: "Explain a technical concept" },
  { icon: MessageSquare, text: "Review my approach to a problem" },
];

export function EmptyState({ onSuggestedPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Bot className="w-12 h-12 text-primary" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2" data-testid="text-welcome-title">
        Hi, I'm LISA
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        How can I help the BIOS team today?
      </p>
      
      <div className="grid gap-3 w-full max-w-2xl">
        {suggestedPrompts.map((prompt, index) => {
          const Icon = prompt.icon;
          return (
            <button
              key={index}
              onClick={() => onSuggestedPrompt(prompt.text)}
              data-testid={`button-prompt-${index}`}
              className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover-elevate active-elevate-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">{prompt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
