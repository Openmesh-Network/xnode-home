import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { Text } from "./Text";
import { IconButton } from "./IconButton";
import { useXNodeClient } from "../../providers";
import { useContainerProcessLogs } from "../../../sdk/react/src/container/process";

export type ToastType = "installing" | "updating" | "uninstalling" | "info";
export type ToastStep =
  | "create"
  | "waiting"
  | "build"
  | "apply"
  | "complete"
  | "failed";

interface ToastData {
  id: string;
  type: ToastType;
  appName: string;
  appId: string;
  currentStep: ToastStep;
  commandId?: string;
  completedSteps?: ToastStep[];
}

interface ToastContextValue {
  toasts: ToastData[];
  pendingInstalls: Set<string>;
  addToast: (toast: Omit<ToastData, "id" | "completedSteps">) => string;
  updateToast: (id: string, updates: Partial<ToastData>) => void;
  markStepComplete: (id: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_STORAGE_KEY = "xnode-pending-toasts";
const COMPLETED_STEPS: Record<ToastStep, ToastStep> = {
  create: "waiting",
  waiting: "build",
  build: "apply",
  apply: "complete",
  complete: "complete",
  failed: "failed",
};

function saveToastsToStorage(toasts: ToastData[]) {
  try {
    localStorage.setItem(TOAST_STORAGE_KEY, JSON.stringify(toasts));
  } catch {}
}

function loadToastsFromStorage(): ToastData[] {
  try {
    const saved = localStorage.getItem(TOAST_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return [];
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [pendingInstalls, setPendingInstalls] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const saved = loadToastsFromStorage();
    if (saved.length > 0) {
      const pendingSet = new Set<string>();
      saved.forEach((t) => {
        if (t.type === "installing" || t.type === "updating") {
          if (t.currentStep !== "complete" && t.currentStep !== "failed") {
            pendingSet.add(t.appId);
          }
        }
      });
      setToasts(saved);
      setPendingInstalls(pendingSet);
    }
  }, []);

  useEffect(() => {
    saveToastsToStorage(toasts);
  }, [toasts]);

  const addToast = useCallback(
    (toast: Omit<ToastData, "id" | "completedSteps">) => {
      const id = `${toast.appId}-${Date.now()}`;
      const newToast: ToastData = {
        ...toast,
        id,
        completedSteps: [],
      };
      setToasts((prev) => [...prev, newToast]);
      if (toast.type === "installing" || toast.type === "updating") {
        setPendingInstalls((prev) => new Set([...prev, toast.appId]));
      }
      return id;
    },
    [],
  );

  const updateToast = useCallback((id: string, updates: Partial<ToastData>) => {
    setToasts((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newStep = updates.currentStep;
          if (
            newStep &&
            newStep !== t.currentStep &&
            (t.type === "installing" || t.type === "updating")
          ) {
            const completedSteps = [...(t.completedSteps || []), t.currentStep];
            return { ...t, ...updates, completedSteps };
          }
          return { ...t, ...updates };
        }
        return t;
      }),
    );
  }, []);

  const markStepComplete = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStep = COMPLETED_STEPS[t.currentStep];
          if (nextStep && nextStep !== t.currentStep) {
            const completedSteps = [...(t.completedSteps || []), t.currentStep];
            const updates: Partial<ToastData> = {
              currentStep: nextStep,
              completedSteps,
            };
            if (nextStep === "complete" || nextStep === "failed") {
              setPendingInstalls((prev) => {
                const next = new Set(prev);
                next.delete(t.appId);
                return next;
              });
            }
            return { ...t, ...updates };
          }
        }
        return t;
      }),
    );
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => {
      const toast = prev.find((t) => t.id === id);
      if (toast && (toast.type === "installing" || toast.type === "updating")) {
        setPendingInstalls((prev) => {
          const next = new Set(prev);
          next.delete(toast.appId);
          return next;
        });
      }
      const remaining = prev.filter((t) => t.id !== id);
      saveToastsToStorage(remaining);
      return remaining;
    });
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        pendingInstalls,
        addToast,
        updateToast,
        markStepComplete,
        removeToast,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}

function getStepLabel(step: ToastStep): string {
  const labels: Record<ToastStep, string> = {
    create: "Creating",
    waiting: "Waiting for connectivity",
    build: "Building",
    apply: "Applying",
    complete: "Complete",
    failed: "Failed",
  };
  return labels[step];
}

function getStepIcon(step: ToastStep): string {
  const icons: Record<ToastStep, string> = {
    create: "⚙️",
    waiting: "📡",
    build: "🔨",
    apply: "✅",
    complete: "🎉",
    failed: "❌",
  };
  return icons[step];
}

function LogsModal({
  toast,
  onClose,
}: {
  toast: ToastData;
  onClose: () => void;
}) {
  const { appId, currentStep, commandId } = toast;
  const client = useXNodeClient();

  const { data: logs } = useContainerProcessLogs({
    client,
    container: appId,
    process: commandId ?? "",
  });

  const logsArray = logs ?? [];
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logsArray]);

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
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-2xl w-full max-w-2xl mx-4 h-[60vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div>
            <Text weight="semibold">Logs: {toast.appName}</Text>
            <Text size="sm" color="muted">
              {getStepIcon(currentStep)} {getStepLabel(currentStep)}
              {commandId && <span className="ml-2 text-xs">({commandId})</span>}
            </Text>
          </div>
          <IconButton icon="✕" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-auto p-4">
          {logsArray.length === 0 ? (
            <Text color="muted">No logs available</Text>
          ) : (
            <div className="font-mono text-xs space-y-1">
              {logsArray.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap break-words">
                  <span className="text-gray-500">
                    [{formatTime(log.timestamp)}]
                  </span>
                  <span className={`ml-2 ${getLogLevelColor(log.level)}`}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastData;
  onRemove: () => void;
}) {
  const [showLogs, setShowLogs] = useState(false);
  const { currentStep } = toast;
  const isComplete = currentStep === "complete";
  const isFailed = currentStep === "failed";
  const isActionable = currentStep === "build" || currentStep === "apply";

  const typeLabel =
    toast.type === "installing"
      ? "Installing"
      : toast.type === "updating"
        ? "Updating"
        : toast.type === "uninstalling"
          ? "Uninstalling"
          : "Info";

  return (
    <>
      <div
        className={`bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-2xl overflow-hidden cursor-pointer ${
          isComplete
            ? "border-green-500/30"
            : isFailed
              ? "border-red-500/30"
              : ""
        }`}
        onClick={() => isActionable && setShowLogs(true)}
      >
        <div className="flex items-center gap-3 p-3">
          {isComplete || isFailed ? (
            <span className="text-xl">{getStepIcon(currentStep)}</span>
          ) : (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Text size="sm" weight="medium">
                {typeLabel}:
              </Text>
              <Text size="sm" color="muted">
                {toast.appName}
              </Text>
            </div>
            {!isComplete && !isFailed && (
              <Text
                size="xs"
                color="muted"
                className="flex items-center gap-1 mt-0.5"
              >
                <span>{getStepIcon(currentStep)}</span>
                <span>{getStepLabel(currentStep)}</span>
              </Text>
            )}
          </div>
          <button
            className="p-1.5 rounded-md transition-colors hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-white"
            onClick={onRemove}
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
      {showLogs && (
        <LogsModal toast={toast} onClose={() => setShowLogs(false)} />
      )}
    </>
  );
}
