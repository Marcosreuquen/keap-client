import { Api } from "./utils/api";
import { Contacts } from "./models/Contact";
import { AccountInfo } from "./models/AccountInfo";
import { Opportunities } from "./models/Opportunities";
import { Products } from "./models/Products";
import { Ecommerce } from "./models/Ecommerce";
import { Files } from "./models/File";
import { Emails } from "./models/Email";
import { Users } from "./models/User";
import { Tags } from "./models/Tags";

class KeapClient {
  private api: Api;
  private _accountInfo?: AccountInfo;
  private _contacts?: Contacts;
  private _opportunities?: Opportunities;
  private _products?: Products;
  private _ecommerce?: Ecommerce;
  private _files?: Files;
  private _emails?: Emails;
  private _users?: Users;
  private _tags?: Tags;

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
    if (!this._accountInfo) {
      this._accountInfo = new AccountInfo(this.api);
    }
    return this._accountInfo;
  }

  /**
   * Gets an instance of Contact that can be used to create, update, delete,
   * and fetch contacts.
   * @returns An instance of Contact.
   */
  get Contacts() {
    if (!this._contacts) {
      this._contacts = new Contacts(this.api);
    }
    return this._contacts;
  }

  get Opportunities() {
    if (!this._opportunities) {
      this._opportunities = new Opportunities(this.api);
    }
    return this._opportunities;
  }

  get Products() {
    if (!this._products) {
      this._products = new Products(this.api);
    }
    return this._products;
  }

  get Ecommerce() {
    if (!this._ecommerce) {
      this._ecommerce = new Ecommerce(this.api);
    }
    return this._ecommerce;
  }

  get Emails() {
    if (!this._emails) {
      this._emails = new Emails(this.api);
    }
    return this._emails;
  }

  get Files() {
    if (!this._files) {
      this._files = new Files(this.api);
    }
    return this._files;
  }

  get Users() {
    if (!this._users) {
      this._users = new Users(this.api);
    }
    return this._users;
  }

  get Tags() {
    if (!this._tags) {
      this._tags = new Tags(this.api);
    }
    return this._tags;
  }
}

export { KeapClient };