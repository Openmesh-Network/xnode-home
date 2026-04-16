import { xnode } from "@openmesh-network/xnode-manager-sdk";
import {
  useMutation,
  type UseMutationInput,
  type UseMutationOutput,
} from "../utils.js";

export * from "./config.js";
export * from "./file.js";
export * from "./info.js";
export * from "./list.js";
export * from "./process.js";

export function useContainerRemove(
  input: UseMutationInput<
    xnode.container.remove_input,
    xnode.container.remove_output
  > = {}
): UseMutationOutput<
  xnode.container.remove_input,
  xnode.container.remove_output
> {
  return useMutation(
    {
      mutationFn: xnode.container.remove,
      onSuccess: (
        _data,
        { client, path: { container } },
        _onMutateResult,
        { client: queryClient }
      ) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [client.baseUrl, "container", container],
          }),
        ]);
      },
    },
    input?.overrides
  );
}
