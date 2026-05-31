export type ApiClientConfig = {
  baseUrl: string;
  fetch?: typeof fetch;
};

/**
 * Default API baseUrl is "/api".
 *
 * This design assumes a reverse proxy (e.g. Vite dev proxy or production gateway)
 * that forwards "/api" requests to the backend service.
 *
 * In environments without a proxy, you must explicitly configure the client:
 *
 * @example
 * configureClient({ baseUrl: "https://your-backend.com" });
 */
let config: ApiClientConfig = {
  baseUrl: "/api",
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
