import { rollup, watch, OutputOptions } from "rollup";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import tsTransformPaths from "@zerollup/ts-transform-paths";
import path from "path";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import external from "rollup-plugin-peer-deps-external";
import colors from "colors";
import yargs from "yargs";

const r = (subPath: string) => {
  return path.resolve(process.cwd(), subPath);
};

const plugins = [
  resolve(),
  commonjs(),
  json(),
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
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
      sourceMap: true,
    },
    transformers: {
      afterDeclarations: [
        {
          // @ts-ignore
          type: "program",
          // @ts-ignore
          factory: (program) => {
            const transformer = tsTransformPaths(program);
            return transformer.afterDeclarations;
          },
        },
      ],
    },
  }),
];

const resolveOptions = () => {
  return [
    defineConfig({
      input: r("./views/react-stream/index.tsx"),
      output: {
        file: r("./views/react-stream/dist.js"),
        format: "esm",
        exports: "named",
        sourcemap: "inline",
      },
      plugins,
    }),
    defineConfig({
      input: r("./views/sockets/index.tsx"),
      output: {
        file: r("./views/sockets/dist.js"),
        format: "esm",
        exports: "named",
        sourcemap: "inline",
      },
      plugins,
    }),
  ];
};

const build = async () => {
  try {
    const options = resolveOptions();
    await Promise.all(
      options.map(async (option) => {
        let bundle = await rollup(option);
        await bundle.write(option.output as OutputOptions);
        bundle && (await bundle.close());
      })
    );
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
};

const dev = async () => {
  try {
    const watcher = watch(resolveOptions());
    let color = "blue";
    console.log(colors[color].bold(`[Views] Watching...`));
    watcher.on("event", (e) => {
      if (e.code === "BUNDLE_START") {
        console.log(colors[color].bold(`[Views] Bundling...`));
      }
      if (e.code === "ERROR") {
        e.result?.close();
        console.log(colors.red.bold(`something wrong when bundling`));
        console.error("e", e.error);
      }
      if (e.code === "BUNDLE_END") {
        e.result?.close();
      }
      if (e.code === "END") {
        console.log(colors[color].bold(`[Views] Done!`));
      }
    });
  } catch (e) {
    process.exit(1);
  }
};

yargs
  .scriptName("bundler")
  .command("build", "build", build)
  .command("dev", "dev", dev)
  .help().argv;
