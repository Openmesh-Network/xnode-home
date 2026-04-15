import { Spinner } from './Spinner';
import { Text } from './Text';

const appInfo: Record<string, { icon: string; name: string }> = {
  explorer: { icon: '📁', name: 'File Explorer' },
  taskmanager: { icon: '📊', name: 'Task Manager' },
  appstore: { icon: '🛒', name: 'App Store' },
  settings: { icon: '⚙️', name: 'Settings' },
};

export function LoadingPage({ app }: { app: string }) {
  const info = appInfo[app] || { icon: '📦', name: app };
  
  return (
    <div className="h-full flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <div className="absolute inset-0 bg-[var(--color-bg-elevated)] rounded-full animate-ping opacity-20" />
        <div className="text-7xl p-6 bg-[var(--color-bg-elevated)] rounded-2xl shadow-2xl relative">
          {info.icon}
        </div>
      </div>
      <div className="text-center space-y-2">
        <Text size="xl" weight="semibold" color="primary">Loading {info.name}</Text>
        <Text size="sm" color="muted">Please wait...</Text>
      </div>
      <Spinner size="lg" />
    </div>
  );
}
