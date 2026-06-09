import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const isNetwork = message.toLowerCase().includes('network');

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
        {isNetwork ? (
          <WifiOff size={28} className="text-red-400" strokeWidth={1.5} />
        ) : (
          <AlertTriangle size={28} className="text-red-400" strokeWidth={1.5} />
        )}
      </div>
      <h3 className="font-display text-xl font-medium text-ink mb-2">
        {isNetwork ? 'Connection Problem' : 'Something Went Wrong'}
      </h3>
      <p className="text-sm text-ink-muted max-w-sm leading-relaxed mb-6">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2.5 bg-ink text-cream text-sm font-medium rounded-full hover:bg-ink/80 transition-colors"
      >
        <RefreshCw size={14} strokeWidth={2} />
        Try Again
      </button>
    </div>
  );
}
