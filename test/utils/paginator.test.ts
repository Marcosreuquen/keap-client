import { Paginator } from "../../src/utils/paginator";
import { Api } from "../../src/utils/api";
jest.mock("../../src/utils/api");

describe("Paginator", () => {
  let api: Api;

  beforeEach(() => {
    api = new Api("valid-api-key");
  });

  it("should initialize with given parameters", () => {
    const items = [1, 2, 3];
    const nextUrl = "http://example.com/next";
    const previousUrl = "http://example.com/previous";
    const count = 3;

    const paginator = new Paginator(api, items, nextUrl, previousUrl, count);

    expect(paginator.getItems()).toEqual(items);
    expect(paginator.getCount()).toBe(count);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    expect((paginator as any).nextUrl).toBe(nextUrl);
    expect((paginator as any).previousUrl).toBe(previousUrl);
    expect((paginator as any).api).toBe(api);
    /* eslint-enable @typescript-eslint/no-explicit-any */
  });

  it("should initialize with null nextUrl and previousUrl", () => {
    const items = [1, 2, 3];
    const nextUrl = null;
    const previousUrl = null;
    const count = 3;

    const paginator = new Paginator(api, items, nextUrl, previousUrl, count);

    expect(paginator.getItems()).toEqual(items);
    expect(paginator.getCount()).toBe(count);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    expect((paginator as any).nextUrl).toBeNull();
    expect((paginator as any).previousUrl).toBeNull();
    expect((paginator as any).api).toBe(api);
    /* eslint-enable @typescript-eslint/no-explicit-any */
  });
});

describe("Wrapper", () => {
  let api: Api;

  beforeEach(() => {
    api = new Api("valid-api-key");
  });
  it("should create a new Paginator instance from the API response", () => {
    const response = {
      items: [1, 2, 3],
      next: "http://example.com/next",
      previous: "http://example.com/previous",
      count: 3,
    };

    const paginator = Paginator.wrap(api, response, "items");

    expect(paginator.getItems()).toEqual(response.items);
    expect(paginator.getCount()).toBe(response.count);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    expect((paginator as any).nextUrl).toBe(response.next);
    expect((paginator as any).previousUrl).toBe(response.previous);
    expect((paginator as any).api).toBe(api);
    /* eslint-enable @typescript-eslint/no-explicit-any */
  });

  it("should throw an error if the item key is not found in the response", () => {
    const response = {
      next: "http://example.com/next",
      previous: "http://example.com/previous",
      count: 3,
    };
    expect(() => {
      Paginator.wrap(api, response, "items");
    }).toThrow("Invalid API response");
  });

  it("next and previous should be functions", () => {
    const response = {
      items: [1, 2, 3],
      next: "http://example.com/next",
      previous: "http://example.com/previous",
      count: 3,
    };
    const paginator = Paginator.wrap(api, response, "items");
    expect(typeof paginator.next).toBe("function");
    expect(typeof paginator.previous).toBe("function");
  });

  it("next and previous should return a new Paginator instance", async () => {
    const response = {
      items: [1, 2, 3],
      next: "http://example.com/next",
      previous: "http://example.com/previous",
      count: 3,
    };

    (api.get as jest.Mock).mockResolvedValue(response);

    const paginator = Paginator.wrap(api, response, "items");
    const next = await paginator.next();
    const previous = await paginator.previous();
    expect(next).not.toBe(paginator);
    expect(previous).not.toBe(paginator);
  });
});
