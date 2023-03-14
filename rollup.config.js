import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import tsTransformPaths from "@zerollup/ts-transform-paths";
import path from "path";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const config = defineConfig({
  input: path.resolve(process.cwd(), "./views/react-stream/index.tsx"),
  output: {
    file: path.resolve(process.cwd(), "./views/react-stream/dist.js"),
    format: "esm",
    exports: "named",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve(),
    commonjs(),
    postcss({
      plugins: [],
      minimize: true,
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"],
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      compilerOptions: {
        sourceMap: false,
      },
      transformers: {
        afterDeclarations: [
          {
            type: "program",
            factory: (program) => {
              const transformer = tsTransformPaths(program);
              return transformer.afterDeclarations;
            },
          },
        ],
      },
    }),
    terser(),
  ],
});

export default config;
