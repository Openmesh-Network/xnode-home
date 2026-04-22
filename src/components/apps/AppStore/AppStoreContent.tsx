import { useState, useCallback, useEffect } from "react";
import { GridItem } from "../../ui/GridItem";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";
import { IconButton } from "../../ui/IconButton";
import { TextEditorModal } from "../../ui/TextEditorModal";
import { availableApps, appCategories, type AppInfo } from "./appMetadata";
import { useInstalledApps } from "./useInstalledApps";
import { useToast } from "../../ui/Toast";
import { useXNodeClient } from "../../../providers";
import { useContainerConfigGet } from "../../../../sdk/react/src/container";

function InstallProgress({ onCancel }: { onCancel?: () => void }) {
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
      {onCancel && (
        <button
          onClick={onCancel}
          className="ml-2 text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
}

function UninstallProgress() {
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
      <span>Uninstalling...</span>
    </div>
  );
}

export function AppDetail({
  app,
  onBack,
}: {
  app: AppInfo;
  onBack: () => void;
}) {
  const client = useXNodeClient();
  const { installedAppIds, installApp, updateApp, uninstallApp, cancelInstall: cancelCurrentInstall, isInstalling, isRemoving } = useInstalledApps();
  const { pendingInstalls, isInstallCancelled } = useToast();
  const [processingAppId, setProcessingAppId] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isAppInstalling, setIsAppInstalling] = useState(false);
  const [isAppRemoving, setIsAppRemoving] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isInstalled = installedAppIds.includes(app.id);
  const isPendingInstall = pendingInstalls.has(app.id);
  const isCancelled = isInstallCancelled(app.id);
  const isProcessing =
    isInstalling || isRemoving || isAppInstalling || isAppRemoving;

  const { data: currentConfig } = useContainerConfigGet({
    client,
    container: app.id,
    overrides: { enabled: !!client && !!app.id && showEdit },
  });

  const handleInstall = async () => {
    setIsAppInstalling(true);
    setProcessingAppId(app.id);
    try {
      await installApp(app.id, app.name);
    } finally {
      setIsAppInstalling(false);
      setProcessingAppId(null);
    }
  };

  const handleCancel = () => {
    cancelCurrentInstall(app.id);
  };

  const handleUninstall = async () => {
    setIsAppRemoving(true);
    setProcessingAppId(app.id);
    try {
      await uninstallApp(app.id, app.name);
    } finally {
      setIsAppRemoving(false);
      setProcessingAppId(null);
    }
  };

  const handleEditClick = () => {
    setShowEdit(true);
    setShowMenu(false);
  };

  const handleEditClose = () => {
    setShowEdit(false);
  };

  const handleEditSave = async (flakeTemplate: string) => {
    setShowEdit(false);
    setIsAppInstalling(true);
    setProcessingAppId(app.id);
    try {
      await updateApp(app.id, app.name, flakeTemplate);
    } finally {
      setIsAppInstalling(false);
      setProcessingAppId(null);
    }
    setShowMenu(false);
  };

  const getInitialContent = (): string => {
    if (currentConfig) {
      const decoder = new TextDecoder();
      const configStr =
        currentConfig instanceof Uint8Array
          ? decoder.decode(currentConfig)
          : String(currentConfig);
      return configStr;
    }
    return getDefaultFlake(app.id);
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
            {app.author || "Openmesh Network"}
          </Text>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <Badge variant="accent">{app.category}</Badge>
            <Text size="sm" color="muted">
              v{app.version}
            </Text>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {isInstalled && (
            <div className="relative">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setShowMenu(!showMenu)}
                className="sm:w-auto min-w-[40px]"
              >
                ⋯
              </Button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg shadow-xl z-10 min-w-[140px]">
                  <button
                    onClick={handleEditClick}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-bg-hover)] transition-colors"
                  >
                    Edit Flake
                  </button>
                </div>
              )}
            </div>
          )}
          <Button
            variant={isInstalled && !isPendingInstall ? "secondary" : "primary"}
            size="lg"
            onClick={
              isAppInstalling || isAppRemoving
                ? () => {}
                : isInstalled && !isPendingInstall
                  ? handleUninstall
                  : handleInstall
            }
            disabled={isProcessing}
            className="w-full sm:w-auto min-w-[140px]"
          >
            {isAppInstalling ? (
              <InstallProgress onCancel={handleCancel} />
            ) : isAppRemoving ? (
              <UninstallProgress />
            ) : isPendingInstall ? (
              <InstallProgress onCancel={handleCancel} />
            ) : isInstalled ? (
              "Uninstall"
            ) : (
              "Install"
            )}
          </Button>
        </div>
      </div>

      <Card padding="md">
        <Text size="lg" weight="semibold" className="mb-3">
          About
        </Text>
        <Text color="secondary" className="leading-relaxed">
          {app.description}
        </Text>
      </Card>

      {isInstalled && !isPendingInstall && (
        <Card padding="md" className="border-green-500/30">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <Text weight="medium">Installed</Text>
          </div>
          <Text size="sm" color="muted" className="mt-1">
            This app is installed on your system.
          </Text>
        </Card>
      )}

      {isPendingInstall && (
        <Card padding="md" className="border-blue-500/30">
          <div className="flex items-center gap-2">
            <span className="text-blue-500">⟳</span>
            <Text weight="medium">Installing...</Text>
          </div>
          <Text size="sm" color="muted" className="mt-1">
            Installation in progress. Please wait.
          </Text>
        </Card>
      )}

      {showEdit && (
        <TextEditorModal
          title={`Edit ${app.name} Flake`}
          initialContent={getInitialContent()}
          onSave={handleEditSave}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
}

function getDefaultFlake(appId: string): string {
  return `{
  inputs = {
    app.url = "github:Openmesh-Network/xnode-apps?dir=${appId}";
    nixpkgs.follows = "app/nixpkgs";
  };

  outputs = inputs: {
    nixosConfigurations.xnode = inputs.nixpkgs.lib.nixosSystem {
      modules = [
        inputs.app.nixosModules.default
        (
          { pkgs, ... }@args:
          {
            xnode.xnode-config = ./xnode-config;

            # START USER CONFIG

            # END USER CONFIG
          }
        )
      ];
    };
  };
}`;
}

export function AppList({
  onSelectApp,
  onCreateCustom,
}: {
  onSelectApp: (app: AppInfo) => void;
  onCreateCustom?: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { installedAppIds, installApp, isInstalling } = useInstalledApps();
  const { pendingInstalls } = useToast();
  const [installingAppId, setInstallingAppId] = useState<string | null>(null);

  const installedIds = new Set(installedAppIds);
  const pendingIds = new Set(pendingInstalls);

  const categories = [...new Set([...appCategories, "Custom"])];

  const filteredApps =
    activeCategory === "All"
      ? availableApps
      : activeCategory === "Custom"
        ? availableApps.filter((app) => app.custom)
        : availableApps.filter((app) => app.category === activeCategory);

  const getAppStatus = (app: AppInfo): string | undefined => {
    if (installingAppId === app.id) return "Installing...";
    if (pendingIds.has(app.id)) return "Installing...";
    if (installedIds.has(app.id)) return "Installed";
    return undefined;
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
            {categories.map((cat) => (
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
          {onCreateCustom && (
            <Button
              variant="primary"
              size="sm"
              onClick={onCreateCustom}
              className="w-full mt-4"
            >
              + Install Custom App
            </Button>
          )}
        </aside>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredApps.map((app) => {
              const isAppInstalled = installedIds.has(app.id);
              const isAppInstalling = installingAppId === app.id;
              const isDisabled = isInstalling && !isAppInstalling;

              return (
                <div
                  key={app.id}
                  onClick={() => {
                    if (isDisabled || isAppInstalling) return;
                    onSelectApp(app);
                  }}
                  className={`cursor-pointer relative ${
                    isDisabled && !isAppInstalling
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <GridItem
                    icon={app.icon}
                    label={app.name}
                    subtitle={getAppStatus(app)}
                  />
                  {isAppInstalled && !isAppInstalling && (
                    <div
                      className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"
                      title="Installed"
                    />
                  )}
                  {isAppInstalling && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                      <svg
                        className="animate-spin h-8 w-8 text-white"
                        viewBox="0 0 24 24"
                      >
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
