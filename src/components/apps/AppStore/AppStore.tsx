import { useState } from "react";
import { Text } from "../../ui/Text";
import { IconButton } from "../../ui/IconButton";
import { AppList, AppDetail, allApps } from "./AppStoreContent";

export function AppStore({ onClose }: { onClose: () => void }) {
  const [selectedApp, setSelectedApp] = useState<(typeof allApps)[0] | null>(
    null,
  );

  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-[var(--radius-app)] h-full flex flex-col overflow-hidden shadow-2xl border border-[var(--color-border)]">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
        <Text weight="semibold" size="lg">
          {selectedApp ? "App Details" : "App Store"}
        </Text>
        <IconButton icon="✕" onClick={onClose} />
      </div>
      <div className="flex-1 overflow-auto">
        {selectedApp ? (
          <AppDetail app={selectedApp} onBack={() => setSelectedApp(null)} />
        ) : (
          <AppList onSelectApp={setSelectedApp} />
        )}
      </div>
    </div>
  );
}
