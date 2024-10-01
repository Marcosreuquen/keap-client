import axios, { AxiosInstance, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

class Api {
  private apiKey: string | null = null;
  private timeout: number | null = null;
  private retries: number | null = null;
  private fetcher: AxiosInstance;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.fetcher = axios.create({
      baseURL: "https://api.infusionsoft.com/crm/rest/",
      timeout: this.timeout || 5000,
      headers: {
        "X-Keap-API-Key": this.apiKey,
        "Content-Type": "application/json",
      },
    });

    axiosRetry(this.fetcher, {
      retries: this.retries || 1,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  /**
   * Set the request timeout
   * @param ms - The number of milliseconds before the request times out
   */
  setRequestTimeout(ms: number): void {
    this.timeout = ms;
    this.fetcher.defaults.timeout = ms;
  }

  /**
   * Set the number of retries for the requests
   * @param retriesCount - The number of retries to make before giving up
   */
  setRetries(retriesCount: number): void {
    this.retries = retriesCount;
    axiosRetry(this.fetcher, { retries: retriesCount });
  }

  /**
   * Make a request to the Infusionsoft API
   * @param method - The request method
   * @param url - The URL path of the API endpoint
   * @param data - Data to be sent with the request
   * @returns The response data
   * @throws Error if no API key has been set
   */
  public async makeApiCall(
    method: "get" | "post" | "put" | "delete" | "patch",
    url: string,
    data?: object
  ): Promise<object | Array<object> | undefined> {
    try {
      const response: AxiosResponse = await this.fetcher.request({
        method,
        url,
        data,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error making ${method} request to ${url}: ${error?.message}`
        );
      }
    }
  }
}

export { Api };
