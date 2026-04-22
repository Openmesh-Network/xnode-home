import { useState, lazy, Suspense } from 'react';
import { Text } from './ui/Text';
import { LoadingPage } from './ui/LoadingPage';
import { TaskbarButton } from './ui/TaskbarButton';
import { ToastProvider } from './ui/Toast';
import { ReactQueryProvider, XNodeClientProvider } from '../providers';

type AppType = 'explorer' | 'taskmanager' | 'appstore' | 'settings' | null;

const FileExplorer = lazy(() => import('./apps/FileExplorer/FileExplorer').then(m => ({ default: m.FileExplorer })));
const TaskManager = lazy(() => import('./apps/TaskManager/TaskManager').then(m => ({ default: m.TaskManager })));
const AppStore = lazy(() => import('./apps/AppStore/AppStore').then(m => ({ default: m.AppStore })));
const Settings = lazy(() => import('./apps/Settings/Settings').then(m => ({ default: m.Settings })));

const taskbarConfig = [
  { id: 'explorer' as const, icon: '📁', label: 'File Explorer', variant: 'blue' as const },
  { id: 'taskmanager' as const, icon: '📊', label: 'Task Manager', variant: 'green' as const },
  { id: 'appstore' as const, icon: '🛒', label: 'App Store', variant: 'purple' as const },
  { id: 'settings' as const, icon: '⚙️', label: 'Settings', variant: 'orange' as const },
];

export default function Desktop() {
  const [activeApp, setActiveApp] = useState<AppType>(null);

  const renderApp = () => {
    switch (activeApp) {
      case 'explorer': return <FileExplorer onClose={() => setActiveApp(null)} />;
      case 'taskmanager': return <TaskManager onClose={() => setActiveApp(null)} />;
      case 'appstore': return <AppStore onClose={() => setActiveApp(null)} />;
      case 'settings': return <Settings onClose={() => setActiveApp(null)} />;
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <span className="text-6xl opacity-20">🖥️</span>
            <Text size="lg" color="muted">Select an app from the dock below</Text>
          </div>
        );
    }
  };

  return (
    <XNodeClientProvider>
      <ReactQueryProvider>
        <ToastProvider>
          <div className="flex flex-col h-screen">
            <main className="flex-1 p-6 overflow-auto">
              <div className="h-full max-w-6xl mx-auto">
                <Suspense fallback={activeApp ? <LoadingPage app={activeApp} /> : null}>
                  {renderApp()}
                </Suspense>
              </div>
            </main>
            <div className="flex justify-center gap-2 p-2 bg-[var(--color-bg-secondary)]/80 border-t border-[var(--color-border)] backdrop-blur-xl">
              {taskbarConfig.map((item) => (
                <TaskbarButton
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  variant={item.variant}
                  active={activeApp === item.id}
                  onClick={() => setActiveApp(item.id)}
                />
              ))}
            </div>
          </div>
        </ToastProvider>
      </ReactQueryProvider>
    </XNodeClientProvider>
  );
}
