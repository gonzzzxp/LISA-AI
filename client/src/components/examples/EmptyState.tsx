import { EmptyState } from '../EmptyState';

export default function EmptyStateExample() {
  return (
    <div className="h-screen bg-background">
      <EmptyState onSuggestedPrompt={(prompt) => console.log('Prompt selected:', prompt)} />
    </div>
  );
}
