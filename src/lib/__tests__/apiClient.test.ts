import { apiFetch } from "../apiClient";

function mockResponse(status: number, body: string, contentType = "application/json") {
  global.fetch = jest.fn().mockResolvedValue({
    status,
    ok: status >= 200 && status < 300,
    text: () => Promise.resolve(body),
    headers: { get: () => contentType },
  } as unknown as Response);
}

afterEach(() => jest.restoreAllMocks());

describe("apiFetch", () => {
  it("returns parsed JSON on success", async () => {
    mockResponse(200, JSON.stringify({ id: 1 }));
    await expect(apiFetch("/test")).resolves.toEqual({ id: 1 });
  });

  it("returns undefined for 204", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 204,
      ok: true,
      text: () => Promise.resolve(""),
    } as unknown as Response);
    await expect(apiFetch("/test")).resolves.toBeUndefined();
  });

  it("throws with message from JSON error body", async () => {
    mockResponse(400, JSON.stringify({ error: "bad_request", message: "Invalid input" }));
    await expect(apiFetch("/test")).rejects.toThrow("Invalid input");
  });

  it("throws HTTP status when error body is empty", async () => {
    mockResponse(500, "");
    await expect(apiFetch("/test")).rejects.toThrow("HTTP 500");
  });

  it("throws HTTP status when error body is non-JSON", async () => {
    mockResponse(503, "Service Unavailable", "text/plain");
    await expect(apiFetch("/test")).rejects.toThrow("HTTP 503");
  });

  it("throws on non-JSON success body", async () => {
    mockResponse(200, "not json");
    await expect(apiFetch("/test")).rejects.toThrow("Invalid JSON response");
  });
});
