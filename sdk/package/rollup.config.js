import dts from "rollup-plugin-dts";

export default [
  {
    input: "build/index.js",
    output: {
      file: "dist/index.js",
    },
  },
  {
    input: "build/index.d.ts",
    output: {
      file: "dist/index.d.ts",
    },
    plugins: [dts()],
  },
  {
    input: "build/index.js",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
  },
];
