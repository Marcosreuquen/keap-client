import { Api } from "../utils/api";

export class AccountInfo {
  private api: Api;

  /**
   * Creates a new AccountInfo model.
   * @param api - The API client to use for making requests.
   */
  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Fetches the current account information.
   * @returns The account information if the API call was successful, undefined otherwise.
   */
  public async getAccountInfo(): Promise<IAccountInfo | undefined> {
    const r = await this.api.makeApiCall("get", "v1/account/profile");
    if (!r) return undefined;
    return r as IAccountInfo;
  }

  /**
   * Updates the current account information.
   * @returns The account information if the API call was successful, undefined otherwise.
   */
  public async updateAccountInfo(
    data: IAccountInfo
  ): Promise<IAccountInfo | undefined> {
    const r = await this.api.makeApiCall("put", "v1/account/profile", data);
    if (!r) return undefined;
    return r as IAccountInfo;
  }
}
