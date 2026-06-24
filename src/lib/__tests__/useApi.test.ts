import { renderHook, waitFor } from "@testing-library/react";
import { useApi } from "../useApi";
import * as apiClient from "../apiClient";

jest.mock("../apiClient");
const mockApiGet = apiClient.apiGet as jest.MockedFunction<typeof apiClient.apiGet>;

describe("useApi", () => {
  afterEach(() => jest.resetAllMocks());

  it("returns loading state initially", () => {
    mockApiGet.mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useApi("/test"));
    expect(result.current.status).toBe("loading");
  });

  it("returns ok state with data on success", async () => {
    const data = { value: 42 };
    mockApiGet.mockResolvedValue(data);
    const { result } = renderHook(() => useApi<typeof data>("/test"));
    await waitFor(() => expect(result.current.status).toBe("ok"));
    expect((result.current as { status: "ok"; data: typeof data }).data).toEqual(data);
  });

  it("returns error state on fetch failure", async () => {
    mockApiGet.mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useApi("/test"));
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect((result.current as { status: "error"; error: string }).error).toBe("network error");
  });

  it("stays loading and does not call apiGet when path is null", () => {
    const { result } = renderHook(() => useApi(null));
    expect(result.current.status).toBe("loading");
    expect(mockApiGet).not.toHaveBeenCalled();
  });
});
