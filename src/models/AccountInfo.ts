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
	 * @returns The account information if the API call was successful.
	 */
	public async getAccountInfo(): Promise<IAccountInfo> {
		return (await this.api.get("v1/account/profile")) as IAccountInfo;
	}

	/**
	 * Updates the current account information.
	 * @returns The account information if the API call was successful.
	 */
	public async updateAccountInfo(data: IAccountInfo): Promise<IAccountInfo> {
		return (await this.api.put("v1/account/profile", data)) as IAccountInfo;
	}
}
