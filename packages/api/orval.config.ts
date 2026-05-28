// orval.config.ts
export default {
  api: {
    input: "./openapi.json",
    output: {
      target: "./client.ts",
      client: "vue-query",
      mode: "single",

      override: {
        mutator: {
          path: "./fetcher.ts",
          name: "customFetch",
        },

        query: {
          useQuery: true,
          useInfinite: true,
        },
      },
    },
  },
};
