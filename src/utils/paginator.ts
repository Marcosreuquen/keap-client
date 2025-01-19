import { Api } from "./api";

class Paginator<T> {
  private api: Api;
  private nextUrl: string | null = null;
  private previousUrl: string | null = null;
  private count: number;
  private items: T[];

  constructor(
    api: Api,
    items: T[],
    nextUrl: string | null,
    previousUrl: string | null,
    count: number
  ) {
    this.api = api;
    this.items = items;
    this.nextUrl = nextUrl?.replace(this.api.baseUrl, "") || null;
    this.previousUrl = previousUrl?.replace(this.api.baseUrl, "") || null;
    this.count = count;
  }

  /**
   * Fetches the next page of results.
   * @returns A new Paginator instance with the next page of results.
   */
  async next(): Promise<Paginator<T> | null> {
    if (this.nextUrl) {
      const response = await this.api.get(this.nextUrl);
      return Paginator.wrap<T>(this.api, response, this.getItemKey(response));
    }
    return null;
  }

  /**
   * Fetches the previous page of results.
   * @returns A new Paginator instance with the previous page of results.
   */
  async previous(): Promise<Paginator<T> | null> {
    if (this.previousUrl) {
      const response = await this.api.get(this.previousUrl);
      return Paginator.wrap<T>(this.api, response, this.getItemKey(response));
    }
    return null;
  }

  /**
   * Creates a new Paginator instance from the API response.
   * @param api - The API instance.
   * @param response - The API response.
   * @param itemKey - The key of the items in the response.
   * @returns A new Paginator instance.
   * @example
   * function handleResponse(response: any): Paginator<ItemsType> {
   *   return Paginator.wrap(api, response, 'items');
   *   }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static wrap<T>(api: Api, response: any, itemKey: string): Paginator<T> {
    const { next, previous, count } = response;
    if (!next || !previous || !count || !itemKey) {
      throw new Error("Invalid API response");
    }
    const items = response[itemKey];
    if (!items || !Array.isArray(items)) {
      throw new Error("Invalid API response");
    }
    return new Paginator<T>(api, items, next, previous, count);
  }

  /**
   * Gets the key of the items in the response.
   * @param response - The API response.
   * @returns The key of the items in the response.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getItemKey(response: any): string {
    const keys = Object.keys(response);
    return (keys.find((key) => Array.isArray(response[key])) ?? keys[0]) || "";
  }

  /**
   * Gets the items of the current page.
   * @returns The items of the current page.
   */
  getItems(): T[] {
    return this.items;
  }

  /**
   * Gets the total count of items.
   * @returns The total count of items.
   */
  getCount(): number {
    return this.count;
  }
}

export { Paginator };
