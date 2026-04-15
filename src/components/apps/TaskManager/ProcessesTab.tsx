import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";

const processes = [
  { name: "explorer.exe", cpu: "2%", mem: "120 MB" },
  { name: "chrome.exe", cpu: "15%", mem: "890 MB" },
  { name: "code.exe", cpu: "8%", mem: "450 MB" },
  { name: "slack.exe", cpu: "3%", mem: "210 MB" },
  { name: "spotify.exe", cpu: "1%", mem: "95 MB" },
];

const HeaderCell = ({ children }: { children: string }) => (
  <th className="text-left p-3"><Text size="xs" color="muted" weight="semibold" className="uppercase tracking-wider">{children}</Text></th>
);

export function ProcessesTab() {
  return (
    <Card padding="none">
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--color-bg-elevated)]">
            <HeaderCell>Process</HeaderCell>
            <HeaderCell>CPU</HeaderCell>
            <HeaderCell>Memory</HeaderCell>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {processes.map((proc) => (
            <tr key={proc.name} className="hover:bg-[var(--color-bg-hover)] transition-colors">
              <td className="p-3"><Text size="sm" color="primary" className="font-mono">{proc.name}</Text></td>
              <td className="p-3"><Text size="sm" color="secondary">{proc.cpu}</Text></td>
              <td className="p-3"><Text size="sm" color="secondary">{proc.mem}</Text></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
