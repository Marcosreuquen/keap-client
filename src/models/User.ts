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

	/**
	 * Lists users with optional filtering.
	 * @param options - Optional parameters for filtering users.
	 * @returns A paginator containing the list of users.
	 * @example
	 * const users = await usersInstance.listUsers({ include_inactive: true, limit: 20 });
	 */
	async listUsers(options?: {
		include_inactive?: boolean;
		include_partners?: boolean;
		limit?: number;
		offset?: number;
	}): Promise<Paginator<IUser>> {
		const params = options
			? createParams(options, [
					"limit",
					"offset",
					"include_inactive",
					"include_partners",
			  ])
			: "";
		const response = await this.api.get("v1/users?" + params?.toString());
		return Paginator.wrap(this.api, response, "users");
	}

	/**
	 * Creates a new user.
	 * @param data - The user data to create.
	 * @returns The newly created user.
	 * @example
	 * const newUser = await usersInstance.createUser({
	 *   given_name: "John",
	 *   family_name: "Doe",
	 *   email_address: "john.doe@example.com"
	 * });
	 */
	async createUser(data: UserCreateRequest): Promise<IUser> {
		return (await this.api.post("v1/users", data)) as IUser;
	}
}
