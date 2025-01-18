class Api {
  private apiKey: string | null = null;
  private timeout: number | null = null;
  private retries: number | null = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Set the request timeout
   * @param ms - The number of milliseconds before the request times out
   */
  setRequestTimeout(ms: number): void {
    this.timeout = ms;
  }

  /**
   * Set the number of retries for the requests
   * @param retriesCount - The number of retries to make before giving up
   */
  setRetries(retriesCount: number): void {
    this.retries = retriesCount;
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
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    data?: object
  ): Promise<object | Array<object> | undefined> {
    if (!this.apiKey) {
      throw new Error("API key is not set");
    }

    const fetchOptions: RequestInit = {
      method,
      headers: {
        "X-Keap-API-Key": this.apiKey,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    const fetchWithRetry = async (
      url: string,
      options: RequestInit,
      retries: number
    ): Promise<Response> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          this.timeout || 5000
        );
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
      } catch (error) {
        if (retries > 0) {
          return fetchWithRetry(url, options, retries - 1);
        } else {
          throw error;
        }
      }
    };

    try {
      const response = await fetchWithRetry(
        `https://api.infusionsoft.com/crm/rest/${url}`,
        fetchOptions,
        this.retries || 1
      );
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error making ${method} request to ${url}: ${error.message}`
        );
      }
    }
  }

  public async get(url: string): Promise<object | Array<object> | undefined> {
    return this.makeApiCall("GET", url);
  }

  public async post(
    url: string,
    data: object
  ): Promise<object | Array<object> | undefined> {
    return this.makeApiCall("POST", url, data);
  }

  public async put(
    url: string,
    data: object
  ): Promise<object | Array<object> | undefined> {
    return this.makeApiCall("PUT", url, data);
  }

  public async delete(
    url: string,
    data?: object
  ): Promise<object | Array<object> | undefined> {
    return this.makeApiCall("DELETE", url, data);
  }

  public async patch(
    url: string,
    data?: object
  ): Promise<object | Array<object> | undefined> {
    return this.makeApiCall("PATCH", url, data);
  }
}

export { Api };
