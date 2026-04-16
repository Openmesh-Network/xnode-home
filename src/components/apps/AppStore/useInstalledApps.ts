import { useCallback } from "react";
import { useXNodeClient } from "../../../providers";
import {
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
  const setMutation = useContainerConfigSet();
  const buildMutation = useContainerConfigBuild();
  const applyMutation = useContainerConfigApply();
  const removeMutation = useContainerRemove();

  const installedAppIds = listQuery.data ?? [];

  const installApp = useCallback(
    async (appId: string) => {
      const config = getAppConfig(appId);
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
      const apply = await applyMutation.mutateAsync({
        client,
        path: { container: appId },
        query: { when: "NextBoot" },
        data: { after: { Command: { id: build.id, condition: "Success" } } },
      });
      await xnode.common.utils.helpers.awaitCommand({ client, command: apply });
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
