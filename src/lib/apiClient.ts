const API_BASE =
  process.env.NEXT_PUBLIC_STABLEROUTE_API_BASE ?? "http://localhost:3001";

export type ApiError = {
  error: string;
  message: string;
  requestId?: string;
};

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
    ...init,
  });
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  let body: T | ApiError | undefined;
  if (text) {
    try {
      body = JSON.parse(text) as T | ApiError;
    } catch {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      throw new Error("Invalid JSON response");
    }
  }
  if (!res.ok) {
    const msg = (body as ApiError | undefined)?.message ?? `HTTP ${res.status}`;
    throw Object.assign(new Error(msg), body ?? {});
  }
  return body as T;
}

export const apiGet = <T>(path: string) => apiFetch<T>(path);
export const apiPost = <T>(path: string, body: unknown) =>
  apiFetch<T>(path, { method: "POST", body: JSON.stringify(body) });
export const apiPatch = <T>(path: string, body: unknown) =>
  apiFetch<T>(path, { method: "PATCH", body: JSON.stringify(body) });
export const apiDelete = (path: string) =>
  apiFetch<void>(path, { method: "DELETE" });
