import { useState, useMemo } from "react";
import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";
import { CircularMetric } from "../../ui/CircularMetric";
import { MetricRow } from "../../ui/MetricRow";
import { DetailModal } from "../../ui/DetailModal";
import { useXNodeClient } from "../../../providers";
import {
  useHostHardwareCpu,
  useHostHardwareMemoryUsage,
  useHostHardwareDisk,
  useHostHardwareNetwork,
} from "../../../../sdk/react/src";
import {
  useDiskSpeedCalculator,
  useNetworkSpeedCalculator,
  type DiskUsageData,
  type NetworkUsageData,
} from "./useSpeedCalculators";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec === 0 || !isFinite(bytesPerSec) || isNaN(bytesPerSec))
    return "0 B/s";
  const k = 1024;
  const sizes = ["B/s", "KB/s", "MB/s", "GB/s"];
  const i = Math.floor(Math.log(bytesPerSec) / Math.log(k));
  return parseFloat((bytesPerSec / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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

type DetailType = "cpu" | "disk" | "disk-bandwidth" | "network" | null;

export function SystemTab() {
  const client = useXNodeClient();
  const cpuQuery = useHostHardwareCpu({ client, usage: true });
  const memQuery = useHostHardwareMemoryUsage({ client });
  const diskQuery = useHostHardwareDisk({ client, usage: true });
  const netQuery = useHostHardwareNetwork({ client, usage: true });

  const [detailType, setDetailType] = useState<DetailType>(null);

  const cpuData = cpuQuery.data ?? [];
  const memoryData = memQuery.data as { total: number; available: number } | undefined;
  const diskData = (diskQuery.data ?? []).map(d => ({
    mount_point: d.id,
    used: d.usage?.used ?? 0,
    total: d.usage?.total ?? 0,
    read: 0,
    written: 0,
  })) as DiskUsageData[];
  const networkData = (netQuery.data ?? []).map(n => ({
    name: n.id,
    mac: "",
    addresses: [],
    received: n.usage?.received ?? 0,
    transmitted: n.usage?.transmitted ?? 0,
  })) as NetworkUsageData[];

  const diskSpeed = useDiskSpeedCalculator(diskData, diskQuery.dataUpdatedAt);
  const networkInterfaces = useNetworkSpeedCalculator(networkData, netQuery.dataUpdatedAt);

  const sortedInterfaces = useMemo(() => {
    return [...networkInterfaces].sort((a, b) => a.name.localeCompare(b.name));
  }, [networkInterfaces]);

  const isLoading = cpuQuery.isLoading || memQuery.isLoading || diskQuery.isLoading || netQuery.isLoading;
  const hasError = cpuQuery.error || memQuery.error || diskQuery.error || netQuery.error;

  if (isLoading) return <LoadingState />;
  if (hasError) return <ErrorState message={String(hasError)} />;

  const totalCpuUsage = cpuData.length > 0
    ? cpuData.reduce((sum: number, cpu: any) => {
        if (!cpu.usage) return sum;
        const total = cpu.usage.user + cpu.usage.nice + cpu.usage.system + cpu.usage.idle + 
                     cpu.usage.iowait + cpu.usage.irq + cpu.usage.softirq + cpu.usage.steal + 
                     cpu.usage.guest + cpu.usage.guest_nice;
        const used = total - (cpu.usage.idle + cpu.usage.iowait);
        return sum + (total > 0 ? (used / total) * 100 : 0);
      }, 0) / cpuData.length
    : 0;

  const memUsed = memoryData ? memoryData.total - memoryData.available : 0;
  const memTotal = memoryData?.total ?? 0;
  const memPercentage = memTotal > 0 ? (memUsed / memTotal) * 100 : 0;

  const totalDiskUsed = diskData.reduce((sum, d) => sum + d.used, 0);
  const totalDiskTotal = diskData.reduce((sum, d) => sum + d.total, 0);
  const totalDiskPercentage = totalDiskTotal > 0 ? (totalDiskUsed / totalDiskTotal) * 100 : 0;

  const totalDownload = sortedInterfaces.reduce((sum, ni) => sum + ni.downloadSpeed, 0);
  const totalUpload = sortedInterfaces.reduce((sum, ni) => sum + ni.uploadSpeed, 0);

  const cpuDetails = cpuData.map((cpu: any, i) => {
    const usage = cpu.usage;
    let usedPercent = 0;
    if (usage) {
      const total = usage.user + usage.nice + usage.system + usage.idle + 
                   usage.iowait + usage.irq + usage.softirq + usage.steal + 
                   usage.guest + usage.guest_nice;
      const used = total - (usage.idle + usage.iowait);
      usedPercent = total > 0 ? (used / total) * 100 : 0;
    }
    return {
      label: cpu.id || `CPU ${i}`,
      value: `${Math.round(usedPercent)}%`,
      subValue: undefined,
    };
  });

  const diskCapacityDetails = diskData.map((disk) => ({
    label: disk.mount_point || "Unknown",
    value: `${formatBytes(disk.used)} / ${formatBytes(disk.total)}`,
    subValue: undefined,
  }));

  const diskBandwidthDetails = diskSpeed.details.flatMap((disk) => [
    {
      label: `${disk.mount_point || "Unknown"} (Read)`,
      value: formatSpeed(disk.readSpeed),
      subValue: undefined,
    },
    {
      label: `${disk.mount_point || "Unknown"} (Write)`,
      value: formatSpeed(disk.writeSpeed),
      subValue: undefined,
    },
  ]);

  const networkDetails = sortedInterfaces.flatMap((ni) => [
    {
      label: `${ni.name} (Download)`,
      value: formatSpeed(ni.downloadSpeed),
      subValue: ni.addresses.length > 0 ? ni.addresses.join(", ") : undefined,
    },
    {
      label: `${ni.name} (Upload)`,
      value: formatSpeed(ni.uploadSpeed),
      subValue: undefined,
    },
  ]);

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <CircularMetric
            label="CPU"
            value={totalCpuUsage}
            unit={cpuData.length > 0 ? `${cpuData.length} cores` : undefined}
            color="#6366f1"
            onClick={() => setDetailType("cpu")}
          />
          <CircularMetric
            label="Memory"
            value={memPercentage}
            unit={`${formatBytes(memUsed)} / ${formatBytes(memTotal)}`}
            color="#22c55e"
          />
          <CircularMetric
            label="Disk"
            value={totalDiskPercentage}
            unit={`${formatBytes(totalDiskUsed)} / ${formatBytes(totalDiskTotal)}`}
            color="#f59e0b"
            onClick={() => setDetailType("disk")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            padding="md"
            className="cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors"
            onClick={() => setDetailType("disk-bandwidth")}
          >
            <Text
              size="xs"
              color="muted"
              weight="semibold"
              className="uppercase tracking-wider mb-3"
            >
              Disk Bandwidth
            </Text>
            <MetricRow label="Read" value={formatSpeed(diskSpeed.total.read)} mono />
            <MetricRow label="Write" value={formatSpeed(diskSpeed.total.write)} mono />
          </Card>
          <Card
            padding="md"
            className="cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors"
            onClick={() => setDetailType("network")}
          >
            <Text
              size="xs"
              color="muted"
              weight="semibold"
              className="uppercase tracking-wider mb-3"
            >
              Network
            </Text>
            <MetricRow label="Download" value={formatSpeed(totalDownload)} mono />
            <MetricRow label="Upload" value={formatSpeed(totalUpload)} mono />
          </Card>
        </div>
      </div>

      {detailType === "cpu" && (
        <DetailModal title="CPU Details" items={cpuDetails} onClose={() => setDetailType(null)} />
      )}
      {detailType === "disk" && (
        <DetailModal title="Disk Capacity" items={diskCapacityDetails} onClose={() => setDetailType(null)} />
      )}
      {detailType === "disk-bandwidth" && (
        <DetailModal title="Disk Bandwidth" items={diskBandwidthDetails} onClose={() => setDetailType(null)} />
      )}
      {detailType === "network" && (
        <DetailModal title="Network Speed" items={networkDetails} onClose={() => setDetailType(null)} />
      )}
    </>
  );
}
