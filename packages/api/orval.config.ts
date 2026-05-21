// orval.config.ts
export default {
  api: {
    input: "./openapi.json",
    output: {
      target: "./client.ts",
      client: "fetch",
      mode: "single",
    },
  },
};
