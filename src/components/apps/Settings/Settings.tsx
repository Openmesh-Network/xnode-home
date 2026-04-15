import { useState } from "react";
import { Sidebar } from "../../layout/Sidebar";
import { Text } from "../../ui/Text";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { Card } from "../../ui/Card";

const sections = ["Display", "Sound", "Network", "About"];

export function Settings({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState("Display");
  const items = sections.map((s) => ({ id: s, label: s }));

  const renderContent = () => {
    switch (activeSection) {
      case "Display":
        return (
          <SettingsGroup title="Appearance">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded"
              />
              <Text>Dark Mode</Text>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded" />
              <Text>Compact Mode</Text>
            </label>
          </SettingsGroup>
        );
      case "Sound":
        return (
          <SettingsGroup title="Audio">
            <div>
              <label className="flex items-center gap-3">
                <Text color="secondary" className="w-20">
                  Volume
                </Text>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="75"
                  className="flex-1"
                />
                <Text color="muted" className="w-10">
                  75%
                </Text>
              </label>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded"
              />
              <Text>System Sounds</Text>
            </label>
          </SettingsGroup>
        );
      case "Network":
        return (
          <div className="space-y-4">
            <Card padding="md" className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">📶</span>
                <div>
                  <Text weight="medium">Wi-Fi</Text>
                  <Text size="sm" color="muted">
                    Connected to HomeNetwork
                  </Text>
                </div>
              </div>
              <Text color="accent" size="sm" weight="medium">
                On
              </Text>
            </Card>
            <Card padding="md" className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">📡</span>
                <div>
                  <Text weight="medium">Bluetooth</Text>
                  <Text size="sm" color="muted">
                    2 devices connected
                  </Text>
                </div>
              </div>
              <Text color="accent" size="sm" weight="medium">
                On
              </Text>
            </Card>
          </div>
        );
      case "About":
        return (
          <SettingsGroup title="System">
            <Text weight="medium">Desktop OS</Text>
            <Text size="sm" color="muted">
              Version 1.0.0
            </Text>
            <Text size="sm" color="muted">
              Build 2024.1.0
            </Text>
          </SettingsGroup>
        );
      default:
        return null;
    }
  };

  return (
    <Sidebar
      title="Settings"
      items={items}
      activeItem={activeSection}
      onSelect={setActiveSection}
      onClose={onClose}
    >
      {renderContent()}
    </Sidebar>
  );
}
