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

const resolveOptions = (command: "server" | "client") => {
  if (command === "client") {
    return defineConfig({
      input: path.resolve(process.cwd(), "./views/react-stream/index.tsx"),
      output: {
        file: path.resolve(process.cwd(), "./views/react-stream/dist.js"),
        format: "esm",
        exports: "named",
        sourcemap: "inline",
      },
      plugins,
    });
  } else {
    return defineConfig({
      input: path.resolve(process.cwd(), "./app/index.ts"),
      output: {
        file: path.resolve(process.cwd(), "./dist/index.mjs"),
        format: "esm",
        exports: "named",
        sourcemap: "inline",
      },
      plugins: [
        ...plugins,
        external({
          includeDependencies: true,
        }),
      ],
    });
  }
};

const build = async () => {
  const exe = async (command: "server" | "client") => {
    let bundle = await rollup(resolveOptions(command));
    await bundle.write(resolveOptions(command).output as OutputOptions);
    bundle && (await bundle.close());
  };

  try {
    await exe("server");
    await exe("client");
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
};

const dev = async () => {
  const exe = async (command: "server" | "client") => {
    const watcher = watch(resolveOptions(command));
    let color = command === "server" ? "yellow" : "blue";
    console.log(colors[color].bold(`[${command.toUpperCase()}] Watching...`));
    watcher.on("event", (e) => {
      if (e.code === "BUNDLE_START") {
        console.log(
          colors[color].bold(`[${command.toUpperCase()}] Bundling...`)
        );
      }
      if (e.code === "ERROR") {
        e.result?.close();
        console.log(
          colors.red.bold(`something wrong when bundling ${command} build`)
        );
        console.error("e", e.error);
      }
      if (e.code === "BUNDLE_END") {
        e.result?.close();
      }
      if (e.code === "END") {
        console.log(colors[color].bold(`[${command.toUpperCase()}] Done!`));
      }
    });
  };

  exe("server");
  exe("client");
};

yargs
  .scriptName("bundler")
  .command("build [name]", "build", build)
  .command("dev [name]", "dev", dev)
  .help().argv;
