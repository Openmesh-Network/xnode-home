import { useState, useRef, useEffect } from "react";

export interface DiskUsageData {
  mount_point: string;
  used: number;
  total: number;
  read: number;
  written: number;
}

export interface DiskDetail {
  mount_point: string;
  used: number;
  total: number;
  readSpeed: number;
  writeSpeed: number;
}

export interface NetworkUsageData {
  name: string;
  mac: string;
  addresses: string[];
  received: number;
  transmitted: number;
}

export interface NetworkInterfaceDetail {
  name: string;
  downloadSpeed: number;
  uploadSpeed: number;
  totalReceived: number;
  totalTransmitted: number;
  addresses: string[];
}

function useDiskSpeedCalculator(disks: DiskUsageData[], dataUpdatedAt: number) {
  const [result, setResult] = useState<{ total: { read: number; write: number }; details: DiskDetail[] }>({
    total: { read: 0, write: 0 },
    details: [],
  });
  const prevRef = useRef<DiskUsageData[]>([]);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    if (disks.length === 0) return;

    const now = dataUpdatedAt || Date.now();
    const prev = prevRef.current;

    if (prev.length === 0 || timeRef.current === 0) {
      const initialDetails: DiskDetail[] = disks.map((d) => ({
        mount_point: d.mount_point,
        used: d.used,
        total: d.total,
        readSpeed: 0,
        writeSpeed: 0,
      }));
      prevRef.current = [...disks];
      timeRef.current = now;
      setResult({ total: { read: 0, write: 0 }, details: initialDetails });
      return;
    }

    const timeDelta = (now - timeRef.current) / 1000;

    if (timeDelta > 0 && timeDelta < 60) {
      let totalRead = 0;
      let totalWrite = 0;
      const details: DiskDetail[] = [];

      for (let i = 0; i < disks.length; i++) {
        const disk = disks[i];
        const prevDisk = prev[i];
        const readSpeed = prevDisk ? Math.max(0, (disk.read - prevDisk.read) / timeDelta) : 0;
        const writeSpeed = prevDisk ? Math.max(0, (disk.written - prevDisk.written) / timeDelta) : 0;

        totalRead += readSpeed;
        totalWrite += writeSpeed;

        details.push({
          mount_point: disk.mount_point,
          used: disk.used,
          total: disk.total,
          readSpeed,
          writeSpeed,
        });
      }

      setResult({ total: { read: totalRead, write: totalWrite }, details });
    }

    prevRef.current = [...disks];
    timeRef.current = now;
  }, [disks, dataUpdatedAt]);

  return result;
}

function useNetworkSpeedCalculator(networks: NetworkUsageData[], dataUpdatedAt: number): NetworkInterfaceDetail[] {
  const [interfaces, setInterfaces] = useState<NetworkInterfaceDetail[]>([]);
  const prevRef = useRef<Map<string, NetworkUsageData>>(new Map());
  const timeRef = useRef<number>(0);

  useEffect(() => {
    if (networks.length === 0) return;

    const now = dataUpdatedAt || Date.now();
    const prev = prevRef.current;

    if (prev.size === 0 || timeRef.current === 0) {
      const initial: NetworkInterfaceDetail[] = networks.map((net, i) => ({
        name: net.name || `Interface ${i}`,
        downloadSpeed: 0,
        uploadSpeed: 0,
        totalReceived: net.received,
        totalTransmitted: net.transmitted,
        addresses: Array.isArray(net.addresses) ? net.addresses : [],
      }));
      
      const newMap = new Map<string, NetworkUsageData>();
      networks.forEach((net, i) => {
        const key = net.name || `Interface ${i}`;
        newMap.set(key, { ...net });
      });
      prevRef.current = newMap;
      timeRef.current = now;
      setInterfaces(initial);
      return;
    }

    const timeDelta = (now - timeRef.current) / 1000;

    if (timeDelta > 0 && timeDelta < 60) {
      const details: NetworkInterfaceDetail[] = [];
      const newMap = new Map<string, NetworkUsageData>();

      networks.forEach((net, i) => {
        const key = net.name || `Interface ${i}`;
        newMap.set(key, { ...net });

        const prevNet = prev.get(key);
        const downloadSpeed = prevNet
          ? Math.max(0, (net.received - prevNet.received) / timeDelta)
          : 0;
        const uploadSpeed = prevNet
          ? Math.max(0, (net.transmitted - prevNet.transmitted) / timeDelta)
          : 0;

        details.push({
          name: key,
          downloadSpeed,
          uploadSpeed,
          totalReceived: net.received,
          totalTransmitted: net.transmitted,
          addresses: Array.isArray(net.addresses) ? net.addresses : [],
        });
      });

      setInterfaces(details);
      prevRef.current = newMap;
    } else {
      const newMap = new Map<string, NetworkUsageData>();
      networks.forEach((net, i) => {
        const key = net.name || `Interface ${i}`;
        newMap.set(key, { ...net });
      });
      prevRef.current = newMap;
    }

    timeRef.current = now;
  }, [networks, dataUpdatedAt]);

  return interfaces;
}

export { useDiskSpeedCalculator, useNetworkSpeedCalculator };
