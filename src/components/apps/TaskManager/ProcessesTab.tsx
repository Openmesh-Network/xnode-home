import { useState, useMemo, useRef, useEffect } from "react";
import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";
import { Button } from "../../ui/Button";
import { SortableHeader } from "../../ui/SortableHeader";
import { useXNodeClient } from "../../../providers";
import { useHostListProcess, useHostProcessLogs, useHostProcessStatus, useHostProcessStart, useHostProcessStop, useHostProcessRestart, useHostProcessUsage } from "../../../../sdk/react/src";
import type { Client } from "../../../../sdk/package/src/common/utils/client";

type SortConfig = { key: string; direction: "asc" | "desc" };

interface ProcessUsage {
  cpu: number;
  memory: number;
  diskReadSpeed: number;
  diskWriteSpeed: number;
  netInSpeed: number;
  netOutSpeed: number;
}

interface Process {
  name: string;
  description: string | null;
  running: boolean;
  usage: ProcessUsage;
}

interface UsageSnapshot {
  timestamp: number;
  cpu: number;
  disk_read: number;
  disk_write: number;
  network_ingress: number;
  network_egress: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec === 0 || !isFinite(bytesPerSec) || isNaN(bytesPerSec)) return "0 B/s";
  const k = 1024;
  const sizes = ["B/s", "KB/s", "MB/s", "GB/s"];
  const i = Math.floor(Math.log(bytesPerSec) / Math.log(k));
  return parseFloat((bytesPerSec / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-32">
      <Text color="muted">Loading...</Text>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-32">
      <Text color="danger">Error: {message}</Text>
    </div>
  );
}

interface ProcessRowProps {
  process: Process;
  onClick: () => void;
}

function ProcessRow({ process, onClick }: ProcessRowProps) {
  return (
    <tr
      className="hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <td className="p-3">
        <div className="flex items-center gap-2">
          <Text size="sm">{process.running ? "🟢" : "🔴"}</Text>
          <Text size="sm" color="primary" className="font-mono">{process.name}</Text>
        </div>
      </td>
      <td className="p-3 text-right">
        <Text size="sm" color="primary" className="font-mono">{process.usage.cpu.toFixed(1)}%</Text>
      </td>
      <td className="p-3 text-right hidden lg:table-cell">
        <Text size="sm" color="primary" className="font-mono">{formatBytes(process.usage.memory)}</Text>
      </td>
      <td className="p-3 text-right hidden lg:table-cell">
        <Text size="sm" color="primary" className="font-mono">{formatSpeed(process.usage.diskReadSpeed)}</Text>
      </td>
      <td className="p-3 text-right hidden lg:table-cell">
        <Text size="sm" color="primary" className="font-mono">{formatSpeed(process.usage.diskWriteSpeed)}</Text>
      </td>
      <td className="p-3 text-right hidden lg:table-cell">
        <Text size="sm" color="primary" className="font-mono">{formatSpeed(process.usage.netInSpeed)}</Text>
      </td>
      <td className="p-3 text-right hidden lg:table-cell">
        <Text size="sm" color="primary" className="font-mono">{formatSpeed(process.usage.netOutSpeed)}</Text>
      </td>
    </tr>
  );
}

interface ProcessTableProps {
  processes: Process[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  onSelectProcess: (name: string) => void;
}

function ProcessTable({ processes, sortConfig, onSort, onSelectProcess }: ProcessTableProps) {
  return (
    <Card padding="none" className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="bg-[var(--color-bg-elevated)]">
            <SortableHeader label="Process" sortKey="name" currentSort={sortConfig} onSort={onSort} />
            <SortableHeader label="CPU" sortKey="cpu" currentSort={sortConfig} onSort={onSort} className="text-right" />
            <SortableHeader label="Memory" sortKey="memory" currentSort={sortConfig} onSort={onSort} className="text-right" hideOnMobile />
            <SortableHeader label="Disk R" sortKey="diskRead" currentSort={sortConfig} onSort={onSort} className="text-right" hideOnMobile />
            <SortableHeader label="Disk W" sortKey="diskWrite" currentSort={sortConfig} onSort={onSort} className="text-right" hideOnMobile />
            <SortableHeader label="Net In" sortKey="netIn" currentSort={sortConfig} onSort={onSort} className="text-right" hideOnMobile />
            <SortableHeader label="Net Out" sortKey="netOut" currentSort={sortConfig} onSort={onSort} className="text-right" hideOnMobile />
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {processes.map((process) => (
            <ProcessRow
              key={process.name}
              process={process}
              onClick={() => onSelectProcess(process.name)}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
}

interface ProcessLogsProps {
  client: Client;
  processName: string;
}

function ProcessLogs({ client, processName }: ProcessLogsProps) {
  const logsQuery = useHostProcessLogs({ client, process: processName, max: 100 });
  const logs = logsQuery.data ?? [];
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "Error": return "text-red-400";
      case "Warn": return "text-yellow-400";
      case "Info": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  if (logsQuery.isLoading) {
    return <Text color="muted">Loading logs...</Text>;
  }

  if (logs.length === 0) {
    return <Text color="muted">No logs available</Text>;
  }

  return (
    <div className="space-y-1 font-mono text-xs overflow-x-auto">
      {logs.map((log, index) => (
        <div key={index} className="whitespace-pre-wrap break-words">
          <span className="text-gray-500 cursor-help" title={formatDate(log.timestamp)}>
            [{formatTime(log.timestamp)}]
          </span>
          <span className={`ml-2 ${getLogLevelColor(log.level)}`}>
            {log.message}
          </span>
        </div>
      ))}
      <div ref={logsEndRef} />
    </div>
  );
}

interface ProcessDetailProps {
  client: Client;
  processName: string;
  description: string | null;
  onBack: () => void;
}

function ProcessDetail({ client, processName, description, onBack }: ProcessDetailProps) {
  const statusQuery = useHostProcessStatus({ client, process: processName });
  const startMutation = useHostProcessStart();
  const stopMutation = useHostProcessStop();
  const restartMutation = useHostProcessRestart();

  const isRunning = statusQuery.data?.running ?? false;

  const handleStart = () => {
    startMutation.mutate({ client, path: { process: processName } });
  };

  const handleStop = () => {
    stopMutation.mutate({ client, path: { process: processName } });
  };

  const handleRestart = () => {
    restartMutation.mutate({ client, path: { process: processName } });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 p-4 border-b border-[var(--color-border)]">
        <Button variant="ghost" size="sm" onClick={onBack}>← Back</Button>
        <div className="flex flex-col">
          <Text size="lg" weight="semibold" className="font-mono">{processName}</Text>
          {description && <Text size="xs" color="muted">{description}</Text>}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {isRunning ? (
            <>
              <Button variant="danger" size="sm" onClick={handleStop}>Stop</Button>
              <Button variant="secondary" size="sm" onClick={handleRestart}>Restart</Button>
            </>
          ) : (
            <Button variant="primary" size="sm" onClick={handleStart}>Start</Button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <Text size="sm" color="muted" weight="semibold" className="uppercase tracking-wider mb-2">Logs</Text>
        <Card padding="sm" className="bg-[var(--color-bg-elevated)] overflow-auto">
          <ProcessLogs client={client} processName={processName} />
        </Card>
      </div>
    </div>
  );
}

interface ProcessUsageHookProps {
  client: Client;
  processName: string;
}

function useProcessUsageHook({ client, processName }: ProcessUsageHookProps): ProcessUsage {
  const query = useHostProcessUsage({ client, process: processName });
  const prevRef = useRef<UsageSnapshot | null>(null);
  const timeRef = useRef<number>(0);
  const [usage, setUsage] = useState<ProcessUsage>({
    cpu: 0,
    memory: 0,
    diskReadSpeed: 0,
    diskWriteSpeed: 0,
    netInSpeed: 0,
    netOutSpeed: 0,
  });

  useEffect(() => {
    const data = query.data;
    if (!data) return;

    const now = query.dataUpdatedAt || Date.now();

    if (!prevRef.current || timeRef.current === 0) {
      prevRef.current = {
        timestamp: now,
        cpu: data.cpu ?? 0,
        disk_read: data.disk_read ?? 0,
        disk_write: data.disk_write ?? 0,
        network_ingress: data.network_ingress ?? 0,
        network_egress: data.network_egress ?? 0,
      };
      timeRef.current = now;
      setUsage({
        cpu: 0,
        memory: data.memory ?? 0,
        diskReadSpeed: 0,
        diskWriteSpeed: 0,
        netInSpeed: 0,
        netOutSpeed: 0,
      });
      return;
    }

    const timeDelta = (now - timeRef.current) / 1000;

    if (timeDelta > 0 && timeDelta < 60) {
      const prev = prevRef.current;
      const cpuPercent = Math.min(100, Math.max(0, ((data.cpu ?? 0) - prev.cpu) / timeDelta / 1e9 * 100));
      const diskReadSpeed = Math.max(0, ((data.disk_read ?? 0) - prev.disk_read) / timeDelta);
      const diskWriteSpeed = Math.max(0, ((data.disk_write ?? 0) - prev.disk_write) / timeDelta);
      const netInSpeed = Math.max(0, ((data.network_ingress ?? 0) - prev.network_ingress) / timeDelta);
      const netOutSpeed = Math.max(0, ((data.network_egress ?? 0) - prev.network_egress) / timeDelta);

      setUsage({
        cpu: cpuPercent,
        memory: data.memory ?? 0,
        diskReadSpeed,
        diskWriteSpeed,
        netInSpeed,
        netOutSpeed,
      });
    }

    prevRef.current = {
      timestamp: now,
      cpu: data.cpu ?? 0,
      disk_read: data.disk_read ?? 0,
      disk_write: data.disk_write ?? 0,
      network_ingress: data.network_ingress ?? 0,
      network_egress: data.network_egress ?? 0,
    };
    timeRef.current = now;
  }, [query.data, query.dataUpdatedAt]);

  return usage;
}

interface ProcessListWithUsageProps {
  processes: { name: string; description: string | null; running: boolean }[];
  client: Client;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  onSelectProcess: (name: string) => void;
}

function ProcessListWithUsage({ processes, client, sortConfig, onSort, onSelectProcess }: ProcessListWithUsageProps) {
  const usages = processes.map((p) => useProcessUsageHook({ client, processName: p.name }));

  const processList: Process[] = processes.map((p, i) => ({
    name: p.name,
    description: p.description,
    running: p.running,
    usage: usages[i],
  }));

  const sortedProcesses = useMemo(() => {
    const sorted = [...processList];
    sorted.sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      switch (sortConfig.key) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "cpu":
          aVal = a.usage.cpu;
          bVal = b.usage.cpu;
          break;
        case "memory":
          aVal = a.usage.memory;
          bVal = b.usage.memory;
          break;
        case "diskRead":
          aVal = a.usage.diskReadSpeed;
          bVal = b.usage.diskReadSpeed;
          break;
        case "diskWrite":
          aVal = a.usage.diskWriteSpeed;
          bVal = b.usage.diskWriteSpeed;
          break;
        case "netIn":
          aVal = a.usage.netInSpeed;
          bVal = b.usage.netInSpeed;
          break;
        case "netOut":
          aVal = a.usage.netOutSpeed;
          bVal = b.usage.netOutSpeed;
          break;
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [processList, sortConfig]);

  return (
    <ProcessTable
      processes={sortedProcesses}
      sortConfig={sortConfig}
      onSort={onSort}
      onSelectProcess={onSelectProcess}
    />
  );
}

export function ProcessesTab() {
  const client = useXNodeClient();
  const [selectedProcess, setSelectedProcess] = useState<{ name: string; description: string | null } | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });

  const { data: processes, isLoading, error } = useHostListProcess({ client });

  const handleSort = (key: string) => {
    if (sortConfig.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
    } else {
      const numericKeys = ["cpu", "memory", "diskRead", "diskWrite", "netIn", "netOut"];
      setSortConfig({ key, direction: numericKeys.includes(key) ? "desc" : "asc" });
    }
  };

  if (!client) return <LoadingState />;
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={String(error)} />;
  if (!processes || processes.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <Text color="muted">No processes found</Text>
      </div>
    );
  }

  const processData = processes.map((p) => ({
    name: p.name,
    description: p.description ?? null,
    running: p.running,
  }));

  if (selectedProcess) {
    return (
      <ProcessDetail
        client={client}
        processName={selectedProcess.name}
        description={selectedProcess.description}
        onBack={() => setSelectedProcess(null)}
      />
    );
  }

  return (
    <ProcessListWithUsage
      processes={processData}
      client={client}
      sortConfig={sortConfig}
      onSort={handleSort}
      onSelectProcess={(name) => {
        const p = processData.find((x) => x.name === name);
        if (p) {
          setSelectedProcess({ name: p.name, description: p.description });
        }
      }}
    />
  );
}
