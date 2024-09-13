import { Api } from "./utils/api";
import { Contacts } from "./models/Contact";
import { AccountInfo } from "./models/AccountInfo";

class KeapClient {
  private api: Api;

  /**
   * Creates a new instance of KeapClient.
   * @param parameters - Options to create the client with.
   * @param parameters.apiKey - The API key to use for authentication.
   * @param [parameters.requestTimeout] - The number of milliseconds before the request times out.
   * @param [parameters.retries] - The number of retries to make before giving up.
   */
  constructor(parameters: {
    apiKey: string;
    requestTimeout?: number;
    retries?: number;
  }) {
    this.api = new Api(parameters.apiKey);
    if (parameters.requestTimeout) {
      this.api.setRequestTimeout(parameters.requestTimeout);
    }
    if (parameters.retries) {
      this.api.setRetries(parameters.retries);
    }
  }

  /**
   * Gets an instance of AccountInfo that can be used to fetch the current account information.
   * @returns An instance of AccountInfo.
   */
  get AccountInfo() {
    return new AccountInfo(this.api);
  }
  /**
   * Gets an instance of Contact that can be used to create, update, delete,
   * and fetch contacts.
   * @returns An instance of Contact.
   */
  get Contacts() {
    return new Contacts(this.api);
  }
}

export { KeapClient };