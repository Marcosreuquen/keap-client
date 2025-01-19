import { Api } from "../utils/api";
import { Paginator } from "../utils/paginator";
import { createParams } from "../utils/queryParams";

export class Users {
  private api: Api;

  /**
   * Creates a new Users model.
   * @param api - The API client to use for making requests.
   */
  constructor(api: Api) {
    this.api = api;
  }

  async listUsers(options?: {
    include_inactive?: boolean;
    include_partners?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Paginator<IUser> | undefined> {
    const params = options
      ? createParams(options, [
          "limit",
          "offset",
          "include_inactive",
          "include_partners",
        ])
      : undefined;
    const r = await this.api.get("v1/users?" + params?.toString());
    if (!r) return undefined;
    return Paginator.wrap(this.api, r, "users");
  }

  async createUser(data: UserCreateRequest): Promise<IUser | undefined> {
    const r = await this.api.post("v1/users", data);
    if (!r) return undefined;
    return r as IUser;
  }
}
