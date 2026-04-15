import type { rust_types } from "./utils/index.js";

export type ResponseCommand = {
  id: rust_types.String;
};

export type CommandAfterCondition = "Always" | "Success";

export type CommandAfter =
  | {
      Command: {
        id: rust_types.String;
        condition: rust_types.Option<CommandAfterCondition>;
      };
    }
  | {
      Date: {
        /// Epoch time in seconds
        date: rust_types.u64;
      };
    };

export type CommandOptions = {
  after: rust_types.Option<CommandAfter>;
};
