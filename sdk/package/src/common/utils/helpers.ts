import type { usage_output } from "../../host/hardware/cpu/index.js";
import {
  status,
  type status_input,
  type status_output,
} from "../../host/process/handlers.js";
import type { ResponseCommand } from "../command.js";
import type { Status } from "../process.js";
import type { Client } from "./client.js";

/// Returns 1 for 100%
export function cpuUsagePercentage({
  previous,
  current,
}: {
  previous: usage_output;
  current: usage_output;
}): number {
  // Idle = idle + iowait
  const previousIdle = previous.idle + previous.iowait;
  const currentIdle = current.idle + current.iowait;

  // Busy = user + nice + system + irq + softirq + steal
  const previousBusy =
    previous.user +
    previous.nice +
    previous.system +
    previous.irq +
    previous.softirq +
    previous.steal;
  const currentBusy =
    current.user +
    current.nice +
    current.system +
    current.irq +
    current.softirq +
    current.steal;

  const previousTotal = previousIdle + previousBusy;
  const currentTotal = currentIdle + currentBusy;

  const totalDelta = currentTotal - previousTotal;
  const busyDelta = currentBusy - previousBusy;

  if (totalDelta <= 0) return 0;

  return busyDelta / totalDelta;
}

export async function awaitCommand({
  client,
  command,
  getStatus,
  pollInterval,
}: {
  client: Client;
  command: ResponseCommand;
  getStatus?: (input: status_input) => Promise<status_output>;
  /// In milliseconds, default 1000 (1 second)
  pollInterval?: number;
}) {
  let _status: Status | undefined;
  while (!_status || _status.running) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval ?? 1000));
    _status = await (getStatus ?? status)({
      client,
      path: { process: command.id },
    }).catch(() => undefined);
  }
}
