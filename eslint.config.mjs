import nextConfig from "eslint-config-next"

const config = [
  {
    ignores: ["node_modules", ".next", "dist", "out", "tmp_*"],
  },
  ...nextConfig,
]

export default config
