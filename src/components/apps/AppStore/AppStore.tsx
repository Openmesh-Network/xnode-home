import { useState, useCallback } from "react";
import { Text } from "../../ui/Text";
import { IconButton } from "../../ui/IconButton";
import { Button } from "../../ui/Button";
import { InputModal } from "../../ui/InputModal";
import { TextEditorModal } from "../../ui/TextEditorModal";
import { AppList, AppDetail } from "./AppStoreContent";
import { availableApps, type AppInfo, customApps as initialCustomApps, addCustomApp as addCustomAppToMetadata } from "./appMetadata";
import { useToast } from "../../ui/Toast";
import { useInstalledApps } from "./useInstalledApps";

const CUSTOM_FLAKE_TEMPLATE = `{
  inputs = {
    app.url = "github:Openmesh-Network/xnode-apps?dir={{APP_ID}}";
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

export function AppStore({ onClose }: { onClose: () => void }) {
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);
  const [showCreateCustom, setShowCreateCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customFlake, setCustomFlake] = useState(CUSTOM_FLAKE_TEMPLATE);
  const [editingCustom, setEditingCustom] = useState(false);

  const allApps = [...availableApps, ...initialCustomApps];

  const handleCreateCustomApp = () => {
    if (!customName.trim()) return;
    
    const appId = `custom-${customName.trim().toLowerCase().replace(/\s+/g, "-")}`;
    
    const newApp: AppInfo = {
      id: appId,
      name: customName.trim(),
      icon: "📦",
      description: "Custom application",
      category: "Custom",
      version: "1.0.0",
      custom: true,
    };
    
    addCustomAppToMetadata(newApp);
    setShowCreateCustom(false);
    setCustomName("");
    setCustomFlake(CUSTOM_FLAKE_TEMPLATE);
    setSelectedApp(newApp);
  };

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
          <AppDetail
            app={selectedApp}
            onBack={() => setSelectedApp(null)}
          />
        ) : (
          <AppList
            onSelectApp={setSelectedApp}
            onCreateCustom={() => setShowCreateCustom(true)}
          />
        )}
      </div>

      {showCreateCustom && (
        <InputModal
          title="Install Custom App"
          label="App name"
          placeholder="Enter app name"
          onCreate={(name) => {
            setCustomName(name);
            setShowCreateCustom(false);
            setEditingCustom(true);
          }}
          onClose={() => setShowCreateCustom(false)}
        />
      )}

      {editingCustom && (
        <TextEditorModal
          title="Edit Flake Configuration"
          initialContent={customFlake}
          onSave={(content) => {
            setCustomFlake(content);
            setEditingCustom(false);
            handleCreateCustomApp();
          }}
          onClose={() => {
            setEditingCustom(false);
            setCustomName("");
            setCustomFlake(CUSTOM_FLAKE_TEMPLATE);
          }}
        />
      )}
    </div>
  );
}

export { useInstalledApps } from "./useInstalledApps";
export type { AppInfo } from "./appMetadata";