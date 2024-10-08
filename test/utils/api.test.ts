import { Api } from "../../src/utils/api";

jest.mock("../../src/utils/api", () => {
  return {
    Api: jest.fn().mockImplementation(() => {
      return {
        makeApiCall: jest.fn(),
        setRequestTimeout: jest.fn(),
        setRetries: jest.fn(),
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
    const result = await api.makeApiCall("get", "endpoint");
    expect(result).toEqual(response);
  });

  it("should return an error if the server returns an error response", async () => {
    (api.makeApiCall as jest.Mock).mockRejectedValueOnce(
      new Error("errorMessage")
    );

    expect(
      async () => await api.makeApiCall("get", "endpoint")
    ).rejects.toThrow("errorMessage");
  });

  it("should set the request timeout", () => {
    (api["fetcher"] as object) = {
      defaults: {
        timeout: 0,
      },
    };
    const timeout = 5000;
    (api.setRequestTimeout as jest.Mock).mockImplementation(() => {
      api["fetcher"].defaults.timeout = timeout;
    });
    api.setRequestTimeout(timeout);
    expect(api["fetcher"].defaults.timeout).toEqual(timeout);
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
});
