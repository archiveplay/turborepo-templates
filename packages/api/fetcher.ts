export type ApiClientConfig = {
  baseUrl: string;
  fetch?: typeof fetch;
};

let config: ApiClientConfig = {
  baseUrl: "",
  fetch: globalThis.fetch.bind(globalThis),
};

export function configureClient(next: ApiClientConfig) {
  config = {
    ...config,
    ...next,
  };
}

export async function customFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const url = typeof input === "string" ? `${config.baseUrl}${input}` : input;

  const res = await config.fetch!(url, init);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
