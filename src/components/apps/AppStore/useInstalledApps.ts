import { useCallback } from "react";
import { useXNodeClient } from "../../../providers";
import {
  useContainerCreate,
  useContainerConfigSet,
  useContainerConfigBuild,
  useContainerConfigApply,
  useContainerRemove,
} from "../../../../sdk/react/src/container";
import { useHostListContainer } from "../../../../sdk/react/src/host/list";
import { xnode } from "@openmesh-network/xnode-manager-sdk";
import { useToast, type ToastStep, type ToastType } from "../../ui/Toast";

export type { ToastStep, ToastType } from "../../ui/Toast";

function getFlakeTemplate(appId: string, userConfig: string): string {
  return `{
  inputs = {
    app.url = "github:Openmesh-Network/xnode-apps?dir=${appId}";
    nixpkgs.follows = "app/nixpkgs";
  };

  outputs = inputs: {
    nixosConfigurations.xnode = inputs.nixpkgs.lib.nixosSystem {
      modules = [
        inputs.app.nixosModules.default
        (
          { pkgs, ... }@args: {
            xnode.xnode-config = ./xnode-config;

            # START USER CONFIG
${userConfig ? userConfig.split('\n').map(line => '            ' + line).join('\n') : ''}
            # END USER CONFIG
          }
        )
      ];
    };
  };
}`;
}

function textEncoder(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

async function fetchUserConfig(appId: string): Promise<string | null> {
  try {
    const url = `https://raw.githubusercontent.com/Openmesh-Network/xnode-apps/refs/heads/main/${appId}/user-config`;
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`No user-config found for ${appId}`);
      return null;
    }
    const text = await response.text();
    return text.trim() || null;
  } catch (error) {
    console.warn(`Failed to fetch user-config for ${appId}:`, error);
    return null;
  }
}

export function useInstalledApps() {
  const client = useXNodeClient();
  const listQuery = useHostListContainer({ client });
  const createMutation = useContainerCreate();
  const setMutation = useContainerConfigSet();
  const buildMutation = useContainerConfigBuild();
  const applyMutation = useContainerConfigApply();
  const removeMutation = useContainerRemove();
  const toastCtx = useToast();

  const installedAppIds = listQuery.data ?? [];

  const installApp = useCallback(
    async (appId: string, appName: string, appFlake?: string) => {
      const type: ToastType = "installing";
      const toastId = toastCtx.addToast({
        type,
        appName,
        appId,
        currentStep: "create",
      });

      try {
        // Step 1: Create
        toastCtx.updateToast(toastId, { currentStep: "create" });
        await createMutation.mutateAsync({
          client,
          path: { container: appId },
        });

        // Step 2: Wait for connectivity
        toastCtx.updateToast(toastId, { currentStep: "waiting" });
        await new Promise((resolve) => setTimeout(resolve, 10_000));

        // Step 3: Fetch user config and set flake
        toastCtx.updateToast(toastId, { currentStep: "build" });
        
        let config: string;
        if (appFlake) {
          config = appFlake;
        } else {
          const userConfig = await fetchUserConfig(appId) ?? "";
          config = getFlakeTemplate(appId, userConfig);
        }
        
        await setMutation.mutateAsync({
          client,
          path: { container: appId },
          data: textEncoder(config) as any,
        });

        // Step 4: Build
        const build = await buildMutation.mutateAsync({
          client,
          path: { container: appId },
          data: { after: null },
        });
        
        toastCtx.updateToast(toastId, { commandId: build.id });
        
        await xnode.common.utils.helpers.awaitCommand({
          client,
          command: build,
          getStatus: (input) =>
            xnode.container.process.status({
              ...input,
              path: { ...input.path, container: appId },
            }),
        });

        // Step 5: Apply
        toastCtx.updateToast(toastId, { currentStep: "apply" });
        const apply = await applyMutation.mutateAsync({
          client,
          path: { container: appId },
          query: { when: "Now" },
          data: { after: { Command: { id: build.id, condition: "Always" } } },
        });
        
        toastCtx.updateToast(toastId, { commandId: apply.id });
        
        await xnode.common.utils.helpers.awaitCommand({
          client,
          command: apply,
          getStatus: (input) =>
            xnode.container.process.status({
              ...input,
              path: { ...input.path, container: appId },
            }),
        });

        // Complete
        toastCtx.updateToast(toastId, { currentStep: "complete" });
        
        setTimeout(() => toastCtx.removeToast(toastId), 5000);
      } catch (error) {
        toastCtx.updateToast(toastId, { currentStep: "failed" });
        
        try {
          await removeMutation.mutateAsync({
            client,
            path: { container: appId },
          });
        } catch {}
        
        setTimeout(() => toastCtx.removeToast(toastId), 5000);
        throw error;
      }
    },
    [client, createMutation, setMutation, buildMutation, applyMutation, removeMutation, toastCtx]
  );

  const updateApp = useCallback(
    async (appId: string, appName: string, flakeTemplate?: string, isCustomApp?: boolean) => {
      const toastId = toastCtx.addToast({
        type: "updating",
        appName,
        appId,
        currentStep: "create",
      });

      try {
        toastCtx.updateToast(toastId, { currentStep: "build" });
        
        let config: string;
        if (isCustomApp && flakeTemplate) {
          config = flakeTemplate;
        } else {
          const userConfig = await fetchUserConfig(appId) ?? "";
          config = typeof flakeTemplate === "string" 
            ? getFlakeTemplate(appId, userConfig).replace(/# START USER CONFIG[\s\S]*# END USER CONFIG/, `# START USER CONFIG\n${flakeTemplate.split('\n').map(line => '            ' + line).join('\n')}\n            # END USER CONFIG`) 
            : getFlakeTemplate(appId, userConfig);
        }
        
        await setMutation.mutateAsync({
          client,
          path: { container: appId },
          data: textEncoder(config) as any,
        });

        const build = await buildMutation.mutateAsync({
          client,
          path: { container: appId },
          data: { after: null },
        });
        
        toastCtx.updateToast(toastId, { commandId: build.id });
        
        await xnode.common.utils.helpers.awaitCommand({
          client,
          command: build,
          getStatus: (input) =>
            xnode.container.process.status({
              ...input,
              path: { ...input.path, container: appId },
            }),
        });

        toastCtx.updateToast(toastId, { currentStep: "apply" });
        const apply = await applyMutation.mutateAsync({
          client,
          path: { container: appId },
          query: { when: "Now" },
          data: { after: { Command: { id: build.id, condition: "Always" } } },
        });
        
        toastCtx.updateToast(toastId, { commandId: apply.id });
        
        await xnode.common.utils.helpers.awaitCommand({
          client,
          command: apply,
          getStatus: (input) =>
            xnode.container.process.status({
              ...input,
              path: { ...input.path, container: appId },
            }),
        });

        toastCtx.updateToast(toastId, { currentStep: "complete" });
        setTimeout(() => toastCtx.removeToast(toastId), 5000);
      } catch (error) {
        toastCtx.updateToast(toastId, { currentStep: "failed" });
        setTimeout(() => toastCtx.removeToast(toastId), 5000);
        throw error;
      }
    },
    [client, setMutation, buildMutation, applyMutation, toastCtx]
  );

  const uninstallApp = useCallback(
    async (appId: string, appName: string) => {
      const toastId = toastCtx.addToast({
        type: "uninstalling",
        appName,
        appId,
        currentStep: "create",
      });

      try {
        await removeMutation.mutateAsync({
          client,
          path: { container: appId },
        });

        toastCtx.updateToast(toastId, { currentStep: "complete" });
        setTimeout(() => toastCtx.removeToast(toastId), 5000);
      } catch (error) {
        toastCtx.updateToast(toastId, { currentStep: "failed" });
        setTimeout(() => toastCtx.removeToast(toastId), 5000);
        throw error;
      }
    },
    [client, removeMutation, toastCtx]
  );

  return {
    installedAppIds,
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    installApp,
    updateApp,
    uninstallApp,
    isInstalling: setMutation.isPending || buildMutation.isPending,
    isRemoving: removeMutation.isPending,
    isApplying: applyMutation.isPending,
  };
}