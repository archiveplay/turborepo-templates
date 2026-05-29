// orval.config.ts
export default {
  apiVue: {
    input: "./openapi.json",
    output: {
      target: "./clients/vue.ts",
      client: "vue-query",
      mode: "single",
      override: {
        mutator: {
          path: "./fetcher.ts",
          name: "customFetch",
        },
      },
    },
  },

  apiReact: {
    input: "./openapi.json",
    output: {
      target: "./clients/react.ts",
      client: "react-query",
      mode: "single",
      override: {
        mutator: {
          path: "./fetcher.ts",
          name: "customFetch",
        },
      },
    },
  },

  apiCore: {
    input: "./openapi.json",
    output: {
      target: "./clients/core.ts",
      client: "fetch",
      mode: "single",
      override: {
        mutator: {
          path: "./fetcher.ts",
          name: "customFetch",
        },
      },
    },
  },
};
