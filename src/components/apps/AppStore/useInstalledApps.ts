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

const FLAKE_TEMPLATE = `{
  inputs = {
    app.url = "github:Openmesh-Network/xnode-apps?dir={{APP_ID}}";
    nixpkgs.follows = "app/nixpkgs";
  };

  outputs = inputs: {
    nixosConfigurations.xnode = inputs.nixpkgs.lib.nixosSystem {
      modules = [
        inputs.app.nixosModules.default
        (
          { pkgs, ... }@args:
          {
            xnode.xnode-config = ./xnode-config;

            # START USER CONFIG

            # END USER CONFIG
          }
        )
      ];
    };
  };
}`;

function getAppConfig(appId: string): string {
  return FLAKE_TEMPLATE.replace("{{APP_ID}}", appId);
}

function textEncoder(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

export function useInstalledApps() {
  const client = useXNodeClient();
  const listQuery = useHostListContainer({ client });
  const createMutation = useContainerCreate();
  const setMutation = useContainerConfigSet();
  const buildMutation = useContainerConfigBuild();
  const applyMutation = useContainerConfigApply();
  const removeMutation = useContainerRemove();

  const installedAppIds = listQuery.data ?? [];

  const installApp = useCallback(
    async (appId: string) => {
      const config = getAppConfig(appId);
      await createMutation.mutateAsync({
        client,
        path: { container: appId },
      });
      await new Promise((resolve) => setTimeout(resolve, 20_000)); // wait 20 seconds for container to gain connectivity
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
      await xnode.common.utils.helpers.awaitCommand({
        client,
        command: build,
        getStatus: (input) =>
          xnode.container.process.status({
            ...input,
            path: { ...input.path, container: appId },
          }),
      }); // can remove once the result symlink move is done inside of the command
      const apply = await applyMutation.mutateAsync({
        client,
        path: { container: appId },
        query: { when: "Now" },
        data: { after: { Command: { id: build.id, condition: "Always" } } }, // replace with "Success" once above comment is resolved
      });
      await xnode.common.utils.helpers.awaitCommand({
        client,
        command: apply,
        getStatus: (input) =>
          xnode.container.process.status({
            ...input,
            path: { ...input.path, container: appId },
          }),
      });
    },
    [client, setMutation, buildMutation],
  );

  const uninstallApp = useCallback(
    async (appId: string) => {
      await removeMutation.mutateAsync({
        client,
        path: { container: appId },
      });
    },
    [client, removeMutation],
  );

  return {
    installedAppIds,
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    installApp,
    uninstallApp,
    isInstalling: setMutation.isPending || buildMutation.isPending,
    isRemoving: removeMutation.isPending,
    isApplying: applyMutation.isPending,
  };
}
