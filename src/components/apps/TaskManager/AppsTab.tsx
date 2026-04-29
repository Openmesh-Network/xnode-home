import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";
import { useXNodeClient } from "../../../providers";
import { useContainer } from "../../../../sdk/react/src";

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

export function AppsTab() {
  const client = useXNodeClient();
  const { data: containers, isLoading, error } = useContainer({ client });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={String(error)} />;
  if (!containers || containers.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <Text color="muted">No containers found</Text>
      </div>
    );
  }

  return (
    <Card padding="none">
      <div className="divide-y divide-[var(--color-border)]">
        {containers?.map((container) => (
          <div
            key={container.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Text size="xl">📦</Text>
              <Text size="sm" color="primary" className="font-mono">
                {container.id}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
