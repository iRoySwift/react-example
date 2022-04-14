const path = require("path");
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
const pkg = require("./package.json");
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

const extensions = [".js", ".ts"];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

// ts
const tsPlugin = typescript({
  tsconfig: resolve("./tsconfig.json"), // 本地ts配置
  extensions,
});

module.exports = {
  input: resolve("./src/index.ts"),
  output: {
    file: resolve("./", pkg.main), // 为了项目的统一性，这里读取 package.json 中的配置项
    format: "esm",
  },
  plugins: [
    postcss({
      extract: true,
      // Or with custom file name
      extract: path.resolve("lib/graphin.css"),
    }),
    tsPlugin,
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
};
