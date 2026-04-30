import { useState, useMemo, useRef } from "react";
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
import { xnode } from "@openmesh-network/xnode-manager-sdk";
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
  const prevCpuRef = useRef<any[]>([]);

  const cpuData = (cpuQuery.data ?? []).sort((a, b) =>
    a.id.localeCompare(b.id),
  );
  const memoryData = memQuery.data;
  const diskData = (diskQuery.data ?? [])
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((d) => ({
      mount_point: d.id,
      used: d.usage?.used ?? 0,
      total: d.usage?.total ?? 0,
      read: d.usage?.read ?? 0,
      written: d.usage?.written ?? 0,
    })) as DiskUsageData[];
  const networkData = (netQuery.data ?? [])
    .filter((n) => n.id.startsWith("en") || n.id.startsWith("wl"))
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((n) => ({
      name: n.id,
      mac: "",
      addresses: [],
      received: n.usage?.received ?? 0,
      transmitted: n.usage?.transmitted ?? 0,
    })) as NetworkUsageData[];

  const diskSpeed = useDiskSpeedCalculator(diskData, diskQuery.dataUpdatedAt);
  const networkInterfaces = useNetworkSpeedCalculator(
    networkData,
    netQuery.dataUpdatedAt,
  );

  // Calculate CPU usage percentage using SDK helper
  const { totalCpuUsage, cpuDetails: memoizedCpuDetails } = useMemo(() => {
    const prevData = prevCpuRef.current;
    let totalPercent = 0;
    const details = cpuData.map((cpu: any, i) => {
      const usage = cpu.usage;
      let usedPercent = 0;
      if (usage && prevData.length > 0) {
        const prevCpu = prevData.find((p) => p.id === cpu.id);
        if (prevCpu && prevCpu.usage) {
          usedPercent =
            xnode.common.utils.helpers.cpuUsagePercentage({
              previous: prevCpu.usage,
              current: usage,
            }) * 100;
          totalPercent += usedPercent;
        }
      }
      return {
        label: cpu.id || `CPU ${i}`,
        value: `${Math.round(usedPercent)}%`,
        subValue: undefined,
      };
    });

    // Update previous data for next calculation
    prevCpuRef.current = JSON.parse(JSON.stringify(cpuData));

    return {
      totalCpuUsage: cpuData.length > 0 ? totalPercent / cpuData.length : 0,
      cpuDetails: details,
    };
  }, [cpuData, cpuQuery.dataUpdatedAt]);

  const memUsed = memoryData ? memoryData.total - memoryData.free : 0;
  const memTotal = memoryData?.total ?? 0;
  const memPercentage = memTotal > 0 ? (memUsed / memTotal) * 100 : 0;

  const totalDiskUsed = diskData.reduce((sum, d) => sum + d.used, 0);
  const totalDiskTotal = diskData.reduce((sum, d) => sum + d.total, 0);
  const totalDiskPercentage =
    totalDiskTotal > 0 ? (totalDiskUsed / totalDiskTotal) * 100 : 0;

  const totalDownload = networkInterfaces.reduce(
    (sum, ni) => sum + ni.downloadSpeed,
    0,
  );
  const totalUpload = networkInterfaces.reduce(
    (sum, ni) => sum + ni.uploadSpeed,
    0,
  );

  const cpuDetails = memoizedCpuDetails;

  const diskCapacityDetails = diskData.map((disk) => ({
    label: disk.mount_point || "Unknown",
    value: `${formatBytes(disk.used)} / ${formatBytes(disk.total)}`,
    subValue: undefined,
  }));

  const diskBandwidthDetails = diskSpeed.details.flatMap((disk) => [
    {
      label: disk.mount_point,
      value: `↓${formatSpeed(disk.readSpeed)} ↑${formatSpeed(disk.writeSpeed)}`,
      subValue: undefined,
    },
  ]);

  const networkDetails = networkInterfaces.flatMap((ni) => [
    {
      label: ni.name,
      value: `↓${formatSpeed(ni.downloadSpeed)} ↑${formatSpeed(ni.uploadSpeed)}`,
      subValue: ni.addresses.length > 0 ? ni.addresses.join(", ") : undefined,
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
            <MetricRow
              label="Read"
              value={formatSpeed(diskSpeed.total.read)}
              mono
            />
            <MetricRow
              label="Write"
              value={formatSpeed(diskSpeed.total.write)}
              mono
            />
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
            <MetricRow
              label="Download"
              value={formatSpeed(totalDownload)}
              mono
            />
            <MetricRow label="Upload" value={formatSpeed(totalUpload)} mono />
          </Card>
        </div>
      </div>

      {detailType === "cpu" && (
        <DetailModal
          title="CPU Details"
          items={cpuDetails}
          onClose={() => setDetailType(null)}
        />
      )}
      {detailType === "disk" && (
        <DetailModal
          title="Disk Capacity"
          items={diskCapacityDetails}
          onClose={() => setDetailType(null)}
        />
      )}
      {detailType === "disk-bandwidth" && (
        <DetailModal
          title="Disk Bandwidth"
          items={diskBandwidthDetails}
          onClose={() => setDetailType(null)}
        />
      )}
      {detailType === "network" && (
        <DetailModal
          title="Network Speed"
          items={networkDetails}
          onClose={() => setDetailType(null)}
        />
      )}
    </>
  );
}
