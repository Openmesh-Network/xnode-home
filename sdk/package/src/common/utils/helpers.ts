import { status } from "../../host/process/handlers.js";
import type { ResponseCommand } from "../command.js";
import type { Status } from "../process.js";
import type { Client } from "./client.js";

export async function awaitCommand({
  client,
  command,
  pollInterval,
}: {
  client: Client;
  command: ResponseCommand;
  /// In milliseconds, default 1000 (1 second)
  pollInterval?: number;
}) {
  let _status: Status | undefined;
  while (!_status || _status.running) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval ?? 1000));
    _status = await status({ client, path: { process: command.id } }).catch(
      () => undefined
    );
  }
}
