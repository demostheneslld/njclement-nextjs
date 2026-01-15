import nextConfig from "eslint-config-next";

const config = [...nextConfig];

config.push({
  name: "local-overrides",
  files: ["**/*.{ts,tsx}"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
});

export default config;
