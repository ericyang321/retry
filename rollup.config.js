import rollupTypescript from "rollup-plugin-typescript2"
import del from "rollup-plugin-delete"
import typescript from "typescript"
import babel from "rollup-plugin-babel"

import p from "./package.json"

export default {
  input: "src/index.ts",
  output: [
    {
      file: p.main,
      format: "cjs",
    },
    {
      file: p.module,
      format: "es",
    },
  ],
  external: [...Object.keys(p.dependencies || {}), ...Object.keys(p.peerDependencies || {})],
  plugins: [
    del({
      targets: "dist",
    }),
    rollupTypescript({
      typescript,
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".ts"],
    }),
  ],
}
