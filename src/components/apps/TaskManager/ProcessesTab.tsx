import { useState, useMemo, useRef, useEffect } from "react";
import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";
import { Button } from "../../ui/Button";
import { SortableHeader } from "../../ui/SortableHeader";
import { useXNodeClient } from "../../../providers";
import {
  useHostProcess,
  useHostProcessLogs,
  useHostProcessInfo,
  useHostProcessStart,
  useHostProcessStop,
  useHostProcessRestart,
} from "../../../../sdk/react/src";
import { xnode } from "@openmesh-network/xnode-manager-sdk";
import type { Client } from "../../../../sdk/package/src/common/utils/client";

type SortConfig = { key: string; direction: "asc" | "desc" };

interface ProcessUsage {
  cpu: number;
  memory: number;
  diskReadSpeed: number;
  diskWriteSpeed: number;
  netInSpeed: number;
  netOutSpeed: number;
  rawCpu?: number;
  rawDiskRead?: number;
  rawDiskWrite?: number;
  rawNetIn?: number;
  rawNetOut?: number;
}

interface Process {
  id: string; // Process ID from API
  name: string; // Derived from id for display
  description: string | null;
  running: boolean;
  exitCode: number | null; // null if running or no exit code available
  usage: ProcessUsage;
  status?: {
    running: boolean;
  };
  rawUsage?: any;
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
  if (bytesPerSec === 0 || !isFinite(bytesPerSec) || isNaN(bytesPerSec))
    return "0 B/s";
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
  const getStatusEmoji = () => {
    if (!process.running && process.exitCode && process.exitCode !== 0) return "❌";
    if (process.running) return "🟢";
    return "🔴";
  };

  return (
    <tr
      className="hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <td className="p-3 text-center w-16">
        <Text size="sm">{getStatusEmoji()}</Text>
      </td>
      <td className="p-3">
        <Text size="sm" color="primary" className="font-mono">
          {process.id}
        </Text>
      </td>
      <td className="p-3 text-right">
        <Text size="sm" color="primary" className="font-mono">
          {process.usage.cpu.toFixed(1)}%
        </Text>
      </td>
      <td className="p-3 text-right">
        <Text size="sm" color="primary" className="font-mono">
          {formatBytes(process.usage.memory)}
        </Text>
      </td>
      <td className="p-3 text-right">
        <Text size="sm" color="primary" className="font-mono">
          {formatSpeed(process.usage.diskReadSpeed)}
        </Text>
      </td>
      <td className="p-3 text-right">
        <Text size="sm" color="primary" className="font-mono">
          {formatSpeed(process.usage.diskWriteSpeed)}
        </Text>
      </td>
      <td className="p-3 text-right">
        <Text size="sm" color="primary" className="font-mono">
          {formatSpeed(process.usage.netInSpeed)}
        </Text>
      </td>
      <td className="p-3 text-right">
        <Text size="sm" color="primary" className="font-mono">
          {formatSpeed(process.usage.netOutSpeed)}
        </Text>
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

function ProcessTable({
  processes,
  sortConfig,
  onSort,
  onSelectProcess,
}: ProcessTableProps) {
  return (
    <Card padding="none" className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="bg-[var(--color-bg-elevated)]">
            <SortableHeader
              label="Status"
              sortKey="status"
              currentSort={sortConfig}
              onSort={onSort}
              className="text-center w-20"
            />
            <SortableHeader
              label="Process"
              sortKey="name"
              currentSort={sortConfig}
              onSort={onSort}
            />
            <SortableHeader
              label="CPU"
              sortKey="cpu"
              currentSort={sortConfig}
              onSort={onSort}
              className="text-right"
            />
            <SortableHeader
              label="Memory"
              sortKey="memory"
              currentSort={sortConfig}
              onSort={onSort}
              className="text-right"
              hideOnMobile
            />
            <SortableHeader
              label="Disk R"
              sortKey="diskRead"
              currentSort={sortConfig}
              onSort={onSort}
              className="text-right"
              hideOnMobile
            />
            <SortableHeader
              label="Disk W"
              sortKey="diskWrite"
              currentSort={sortConfig}
              onSort={onSort}
              className="text-right"
              hideOnMobile
            />
            <SortableHeader
              label="Net In"
              sortKey="netIn"
              currentSort={sortConfig}
              onSort={onSort}
              className="text-right"
              hideOnMobile
            />
            <SortableHeader
              label="Net Out"
              sortKey="netOut"
              currentSort={sortConfig}
              onSort={onSort}
              className="text-right"
              hideOnMobile
            />
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {processes.map((process) => (
            <ProcessRow
              key={process.id}
              process={process}
              onClick={() => onSelectProcess(process.id)}
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
  const logsQuery = useHostProcessLogs({
    client,
    process: processName,
    max: 100,
  });
  const logs = logsQuery.data ?? [];
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "Error":
        return "text-red-400";
      case "Warn":
        return "text-yellow-400";
      case "Info":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp / 1000); // Convert microseconds to milliseconds
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp / 1000); // Convert microseconds to milliseconds
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
          <span
            className="text-gray-500 cursor-help"
            title={formatDate(log.timestamp)}
          >
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
  isRunning: boolean;
  exitCode: number | null;
  onBack: () => void;
}

function ProcessDetail({
  client,
  processName,
  description,
  isRunning,
  exitCode,
  onBack,
}: ProcessDetailProps) {
  const infoQuery = useHostProcessInfo({ client, process: processName });
  const startMutation = useHostProcessStart();
  const stopMutation = useHostProcessStop();
  const restartMutation = useHostProcessRestart();

  const processDescription = infoQuery.data?.description ?? description;

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
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back
        </Button>
        <div className="flex flex-col">
          <Text size="lg" weight="semibold" className="font-mono">
            {processName}
          </Text>
          {!isRunning && exitCode && exitCode !== 0 ? (
            <Text size="xs" color="danger">
              Exit code: {exitCode} ❌
            </Text>
          ) : (
            processDescription && (
              <Text size="xs" color="muted">
                {description}
              </Text>
            )
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {isRunning ? (
            <>
              <Button variant="danger" size="sm" onClick={handleStop}>
                Stop
              </Button>
              <Button variant="secondary" size="sm" onClick={handleRestart}>
                Restart
              </Button>
            </>
          ) : (
            <Button variant="primary" size="sm" onClick={handleStart}>
              Start
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <Text
          size="sm"
          color="muted"
          weight="semibold"
          className="uppercase tracking-wider mb-2"
        >
          Logs
        </Text>
        <Card
          padding="sm"
          className="bg-[var(--color-bg-elevated)] overflow-auto"
        >
          <ProcessLogs client={client} processName={processName} />
        </Card>
      </div>
    </div>
  );
}

// Process usage is now included in the list query with usage: true
// Using useMemo to calculate usage rates from raw counters

interface ProcessListWithUsageProps {
  processes: Process[];
  client: Client;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  onSelectProcess: (name: string) => void;
}

function ProcessListWithUsage({
  processes,
  client,
  sortConfig,
  onSort,
  onSelectProcess,
}: ProcessListWithUsageProps) {
  const processList: Process[] = processes;

  const sortedProcesses = useMemo(() => {
    const sorted = [...processList];
    sorted.sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;
      let secondarySort = 0;

      switch (sortConfig.key) {
        case "status":
          // Status priority: ❌ (failed) > 🟢 (running) > 🔴 (stopped)
          const getStatusPriority = (p: Process) => {
            if (!p.running && p.exitCode && p.exitCode !== 0) return 0; // ❌ highest
            if (p.running) return 1; // 🟢
            return 2; // 🔴 lowest
          };
          aVal = getStatusPriority(a);
          bVal = getStatusPriority(b);
          // Secondary sort by name if status is equal
          if (aVal === bVal) {
            secondarySort = (a.id || "").toLowerCase().localeCompare((b.id || "").toLowerCase());
          }
          break;
        case "name":
          aVal = (a.id || "").toLowerCase();
          bVal = (b.id || "").toLowerCase();
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

      if (sortConfig.key === "status") {
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return secondarySort;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc" 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
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
  const [selectedProcess, setSelectedProcess] = useState<{
    name: string;
    description: string | null;
  } | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "status",
    direction: "asc",
  });
  const prevRef = useRef<Map<string, { usage: any; time: number }>>(new Map());

  const {
    data: processes,
    isLoading,
    error,
  } = useHostProcess({ client, status: true, usage: true });

  // Calculate usage rates - this must be before any early returns
  // Moving computation outside useMemo to avoid ref access issues
  const now = Date.now();
  const newMap = new Map<string, { usage: any; time: number }>();

  const calculatedProcesses: Process[] =
    !processes || processes.length === 0
      ? []
      : processes
          .filter((p) => p && p.id) // Filter out invalid entries
          .map((p) => {
            // Map raw process to Process type
            const processItem: Process = {
              id: p.id,
              name: p.id, // Use id as name for display
              description: null,
              running: p.status?.running ?? false,
              exitCode: p.status?.exit_code ?? null,
              rawUsage: p.usage,
              usage: {
                cpu: 0,
                memory: p.usage?.memory ?? 0,
                diskReadSpeed: 0,
                diskWriteSpeed: 0,
                netInSpeed: 0,
                netOutSpeed: 0,
              },
            };

            const prev = prevRef.current.get(p.id);
            const usage = p.usage;

            // Skip if no usage data
            if (!usage) {
              newMap.set(p.id, { usage: null, time: now });
              return { ...processItem, exitCode: p.status?.exit_code ?? null };
            }

            if (prev && usage && prev.usage && prev.time > 0) {
              const timeDelta = (now - prev.time) / 1000;
              if (timeDelta > 0 && timeDelta < 60) {
                // Process CPU usage is in nanoseconds - calculate percentage from delta
                const cpuDelta = (usage.cpu ?? 0) - (prev.usage.cpu ?? 0);
                const cpuPercent = Math.min(
                  100,
                  Math.max(0, (cpuDelta / timeDelta / 1e9) * 100),
                );

                // Calculate speeds from cumulative counters
                const diskReadSpeed = Math.max(
                  0,
                  ((usage.disk_read ?? 0) - (prev.usage.disk_read ?? 0)) /
                    timeDelta,
                );
                const diskWriteSpeed = Math.max(
                  0,
                  ((usage.disk_write ?? 0) - (prev.usage.disk_write ?? 0)) /
                    timeDelta,
                );
                const netInSpeed = Math.max(
                  0,
                  ((usage.network_ingress ?? 0) -
                    (prev.usage.network_ingress ?? 0)) /
                    timeDelta,
                );
                const netOutSpeed = Math.max(
                  0,
                  ((usage.network_egress ?? 0) -
                    (prev.usage.network_egress ?? 0)) /
                    timeDelta,
                );

                newMap.set(p.id, { usage: p.usage, time: now });

                return {
                  ...processItem,
                  usage: {
                    cpu: cpuPercent,
                    memory: usage.memory ?? 0,
                    diskReadSpeed,
                    diskWriteSpeed,
                    netInSpeed,
                    netOutSpeed,
                  },
                };
              }
            }

            // First reading or invalid time delta - return zero speeds
            newMap.set(p.id, { usage: p.usage, time: now });

            return {
              ...processItem,
              usage: {
                cpu: 0,
                memory: usage?.memory ?? 0,
                diskReadSpeed: 0,
                diskWriteSpeed: 0,
                netInSpeed: 0,
                netOutSpeed: 0,
              },
            };
          });

  // Update previous values for next calculation
  prevRef.current = newMap;

  const handleSort = (key: string) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      const numericKeys = [
        "status",
        "cpu",
        "memory",
        "diskRead",
        "diskWrite",
        "netIn",
        "netOut",
      ];
      setSortConfig({
        key,
        direction: numericKeys.includes(key) ? "desc" : "asc",
      });
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

  if (selectedProcess) {
    const processInfo = calculatedProcesses.find(
      (p) => p.id === selectedProcess.name,
    );
    return (
      <ProcessDetail
        client={client}
        processName={selectedProcess.name}
        description={selectedProcess.description}
        isRunning={processInfo?.running ?? false}
        exitCode={processInfo?.exitCode ?? null}
        onBack={() => setSelectedProcess(null)}
      />
    );
  }

  return (
    <ProcessListWithUsage
      processes={calculatedProcesses}
      client={client}
      sortConfig={sortConfig}
      onSort={handleSort}
      onSelectProcess={(id) => {
        const p = calculatedProcesses.find((x) => x.id === id);
        if (p) {
          setSelectedProcess({ name: p.id, description: p.description });
        }
      }}
    />
  );
}
