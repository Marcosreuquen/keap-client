import { Api } from "../../src/utils/api";

jest.mock("../../src/utils/api", () => {
  return {
    Api: jest.fn().mockImplementation(() => {
      return {
        makeApiCall: jest.fn(),
        setRequestTimeout: jest.fn().mockImplementation(() => {}),
        setRetries: jest.fn(),
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        patch: jest.fn(),
      };
    }),
  };
});

describe("Api", () => {
  let api: Api;

  beforeEach(() => {
    api = new Api("valid-api-key");
  });

  it("should make a successful API call with valid API key and method", async () => {
    const response = { data: "Mock API response" };
    (api.makeApiCall as jest.Mock).mockResolvedValue(response);
    const result = await api.makeApiCall("GET", "endpoint");
    expect(result).toEqual(response);
  });

  it("should return an error if the server returns an error response", async () => {
    (api.makeApiCall as jest.Mock).mockRejectedValueOnce(
      new Error("errorMessage")
    );

    expect(
      async () => await api.makeApiCall("GET", "endpoint")
    ).rejects.toThrow("errorMessage");
  });

  it("should set the request timeout", () => {
    const timeout = 5000;
    (api.setRequestTimeout as jest.Mock).mockImplementation(() => {
      api["timeout"] = timeout;
    });
    api.setRequestTimeout(timeout);
    expect(api["timeout"]).toEqual(timeout);
  });

  it("should set the number of retries", () => {
    api["retries"] = 0;
    const retries = 3;
    (api.setRetries as jest.Mock).mockImplementation(() => {
      api["retries"] = retries;
    });
    api.setRetries(retries);
    expect(api["retries"]).toEqual(retries);
  });

  it("should make a GET request", async () => {
    const response = { data: "Mock GET response" };
    (api.get as jest.Mock).mockResolvedValue(response);
    const result = await api.get("endpoint");
    expect(result).toEqual(response);
  });

  it("should make a POST request", async () => {
    const response = { data: "Mock POST response" };
    const postData = { key: "value" };
    (api.post as jest.Mock).mockResolvedValue(response);
    const result = await api.post("endpoint", postData);
    expect(result).toEqual(response);
  });

  it("should make a PUT request", async () => {
    const response = { data: "Mock PUT response" };
    const putData = { key: "value" };
    (api.put as jest.Mock).mockResolvedValue(response);
    const result = await api.put("endpoint", putData);
    expect(result).toEqual(response);
  });

  it("should make a DELETE request", async () => {
    const response = { data: "Mock DELETE response" };
    (api.delete as jest.Mock).mockResolvedValue(response);
    const result = await api.delete("endpoint");
    expect(result).toEqual(response);
  });

  it("should make a PATCH request", async () => {
    const response = { data: "Mock PATCH response" };
    const patchData = { key: "value" };
    (api.patch as jest.Mock).mockResolvedValue(response);
    const result = await api.patch("endpoint", patchData);
    expect(result).toEqual(response);
  });
});
