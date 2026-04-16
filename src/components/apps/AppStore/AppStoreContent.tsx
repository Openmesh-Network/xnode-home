import { useState } from "react";
import { GridItem } from "../../ui/GridItem";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";
import { IconButton } from "../../ui/IconButton";
import { availableApps, appCategories, type AppInfo } from "./appMetadata";
import { useInstalledApps } from "./useInstalledApps";

function InstallProgress() {
  return (
    <div className="flex items-center gap-2">
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>Installing...</span>
    </div>
  );
}

export function AppDetail({ app, onBack }: { app: AppInfo; onBack: () => void }) {
  const { installedAppIds, installApp, uninstallApp, isInstalling, isRemoving } = useInstalledApps();
  const [installingAppId, setInstallingAppId] = useState<string | null>(null);
  const isInstalled = installedAppIds.includes(app.id);
  const isAppInstalling = installingAppId === app.id;
  const isProcessing = isInstalling || isRemoving;

  const handleInstall = async () => {
    setInstallingAppId(app.id);
    try {
      await installApp(app.id);
    } finally {
      setInstallingAppId(null);
    }
  };

  const handleUninstall = async () => {
    setInstallingAppId(app.id);
    try {
      await uninstallApp(app.id);
    } finally {
      setInstallingAppId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
        >
          <span className="p-2 rounded-lg bg-[var(--color-bg-elevated)] group-hover:bg-[var(--color-bg-hover)] transition-colors">
            ←
          </span>
          <Text size="sm" weight="medium">
            Back to apps
          </Text>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="text-6xl p-4 bg-[var(--color-bg-elevated)] rounded-2xl shadow-xl">
          {app.icon}
        </div>
        <div className="flex-1">
          <Text size="3xl" weight="bold">
            {app.name}
          </Text>
          <Text size="lg" color="secondary" className="mt-1">
            Openmesh Network
          </Text>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <Badge variant="accent">{app.category}</Badge>
            <Text size="sm" color="muted">
              v{app.version}
            </Text>
          </div>
        </div>
        <Button
          variant={isInstalled ? "secondary" : "primary"}
          size="lg"
          onClick={isAppInstalling ? () => {} : isInstalled ? handleUninstall : handleInstall}
          disabled={isProcessing}
          className="w-full sm:w-auto min-w-[140px]"
        >
          {isAppInstalling ? <InstallProgress /> : isInstalled ? "Uninstall" : "Install"}
        </Button>
      </div>

      <Card padding="md">
        <Text size="lg" weight="semibold" className="mb-3">
          About
        </Text>
        <Text color="secondary" className="leading-relaxed">
          {app.description}
        </Text>
      </Card>

      {isInstalled && (
        <Card padding="md" className="border-green-500/30">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <Text weight="medium">Installed</Text>
          </div>
          <Text size="sm" color="muted" className="mt-1">
            This app is installed on your system. Changes require a system rebuild.
          </Text>
        </Card>
      )}
    </div>
  );
}

export function AppList({ onSelectApp }: { onSelectApp: (app: AppInfo) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { installedAppIds, installApp, isInstalling } = useInstalledApps();
  const [installingAppId, setInstallingAppId] = useState<string | null>(null);

  const installedIds = new Set(installedAppIds);

  const filteredApps =
    activeCategory === "All"
      ? availableApps
      : availableApps.filter((app) => app.category === activeCategory);

  const handleAppClick = async (app: AppInfo) => {
    if (installedIds.has(app.id) || isInstalling) return;
    setInstallingAppId(app.id);
    try {
      await installApp(app.id);
    } finally {
      setInstallingAppId(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] md:hidden">
        <IconButton icon="☰" onClick={() => setMobileSidebarOpen(true)} />
        <Text weight="semibold">App Store</Text>
        <Text size="sm" color="muted">
          / {activeCategory}
        </Text>
      </div>

      <div
        className="fixed inset-0 bg-[var(--color-bg-secondary)] z-50 flex flex-col md:hidden transition-all duration-300"
        style={{
          transform: mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <Text
            size="xs"
            color="muted"
            weight="semibold"
            className="uppercase tracking-wider"
          >
            Categories
          </Text>
          <IconButton icon="✕" onClick={() => setMobileSidebarOpen(false)} />
        </div>
        <div className="p-4 space-y-2">
          {appCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setMobileSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-52 border-r border-[var(--color-border)] p-4 hidden md:block">
          <Text
            size="xs"
            color="muted"
            weight="semibold"
            className="uppercase tracking-wider mb-3"
          >
            Categories
          </Text>
          <ul className="space-y-1">
            {appCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredApps.map((app) => {
              const isAppInstalled = installedIds.has(app.id);
              const isAppInstalling = installingAppId === app.id;
              const isDisabled = isAppInstalled || isInstalling;
              
              return (
                <div
                  key={app.id}
                  onClick={() => isAppInstalling ? {} : onSelectApp(app)}
                  className={`cursor-pointer relative ${isDisabled && !isAppInstalling ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <GridItem icon={app.icon} label={app.name} subtitle={isAppInstalling ? "Installing..." : undefined} />
                  {isAppInstalled && !isAppInstalling && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" title="Installed" />
                  )}
                  {isAppInstalling && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                      <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
