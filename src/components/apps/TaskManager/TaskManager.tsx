import { useState } from "react";
import { Sidebar } from "../../layout/Sidebar";
import { Text } from "../../ui/Text";
import { SystemTab } from "./SystemTab";
import { ProcessesTab } from "./ProcessesTab";
import { AppsTab } from "./AppsTab";

const sections = ["System", "Processes", "Performance", "Apps"];

export function TaskManager({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState("System");
  const items = sections.map((s) => ({ id: s, label: s }));

  const renderContent = () => {
    switch (activeSection) {
      case "System":
        return <SystemTab />;
      case "Processes":
        return <ProcessesTab />;
      case "Performance":
        return (
          <div className="flex items-center justify-center h-full">
            <Text color="muted">Performance history chart coming soon</Text>
          </div>
        );
      case "Apps":
        return <AppsTab />;
      default:
        return <SystemTab />;
    }
  };

  return (
    <Sidebar
      title="Task Manager"
      items={items}
      activeItem={activeSection}
      onSelect={setActiveSection}
      onClose={onClose}
    >
      {renderContent()}
    </Sidebar>
  );
}
