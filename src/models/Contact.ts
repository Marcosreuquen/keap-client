import { Api } from "../utils/api";

export class Contact {
  private api: Api;
  /**
   * Creates a new Contact model.
   * @param api - The API client to use for making requests.
   */
  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Fetches a list of contacts.
   * @param parameters - Options for fetching contacts, like page size and page number.
   */
  getContacts(parameters?: object): Promise<object | undefined> {
    return this.api.makeApiCall("get", "v1/contacts", parameters);
  }

  /**
   * Creates a new contact in Keap.
   * @param contactData - The data to create a contact with.
   */
  createContact(contactData: object): Promise<object | undefined> {
    return this.api.makeApiCall("post", "v1/contacts", contactData);
  }

  /**
   * Updates an existing contact.
   * @param contactId - The ID of the contact to update.
   * @param contactData - The data to update the contact with.
   */
  updateContact(
    contactId: number,
    contactData: object
  ): Promise<object | undefined> {
    return this.api.makeApiCall(
      "patch",
      `v1/contacts/${contactId}`,
      contactData
    );
  }

  /**
   * Deletes a contact by ID.
   * @param contactId - The ID of the contact to delete.
   */
  deleteContact(contactId: number): Promise<object | undefined> {
    return this.api.makeApiCall("delete", `v1/contacts/${contactId}`);
  }

  /**
   * Fetches a single contact by ID.
   * @param contactId - The ID of the contact to fetch.
   */
  getContact(contactId: number): Promise<object | undefined> {
    return this.api.makeApiCall("get", `v1/contacts/${contactId}`);
  }

  /**
   * Fetches the contact model.
   * @returns The contact model if the API call was successful, undefined otherwise.
   */
  getContactModel(): Promise<object | undefined> {
    return this.api.makeApiCall("get", "v1/contacts/model");
  }

  /**
   * Creates a new custom contact field.
   * @param customFieldData - The data to create a custom field with.
   * @returns The newly created custom field if the API call was successful, undefined otherwise.
   */
  createCustomField(customFieldData: object): Promise<object | undefined> {
    return this.api.makeApiCall(
      "post",
      "v1/contacts/customFields",
      customFieldData
    );
  }

  /**
   * Creates a new contact if the contact does not exist, or updates the contact if it does.
   * @param contactData - The data to create or update a contact with.
   * @returns The newly created or updated contact if the API call was successful, undefined otherwise.
   */
  createOrUpdate(contactData: object): Promise<object | undefined> {
    return this.api.makeApiCall("put", "v1/contacts", contactData);
  }

  /**
   * Fetches the credit cards associated with a contact.
   * @param contactId - The ID of the contact to fetch credit cards for.
   * @returns The credit cards associated with the contact if the API call was successful, undefined otherwise.
   */
  getCreditCards(contactId: number): Promise<object | undefined> {
    return this.api.makeApiCall("get", `v1/contacts/${contactId}/creditCards`);
  }

  /**
   * Creates a new credit card for a contact.
   * @param contactId - The ID of the contact to add the credit card to.
   * @param creditCardData - The data to create the credit card with.
   * @returns The newly created credit card if the API call was successful, undefined otherwise.
   */
  createCreditCard(
    contactId: number,
    creditCardData: object
  ): Promise<object | undefined> {
    return this.api.makeApiCall(
      "post",
      `v1/contacts/${contactId}/creditCards`,
      creditCardData
    );
  }

  /**
   * Fetches the email addresses associated with a contact.
   * @param contactId - The ID of the contact to fetch email addresses for.
   * @returns The email addresses associated with the contact if the API call was successful, undefined otherwise.
   */
  listEmails(contactId: number): Promise<object | undefined> {
    return this.api.makeApiCall("get", `v1/contacts/${contactId}/emails`);
  }

  /**
   * Creates a new email address for a contact.
   * @param contactId - The ID of the contact to add the email address to.
   * @param emailData - The data to create the email address with.
   * @returns The newly created email address if the API call was successful, undefined otherwise.
   */
  createEmail(
    contactId: number,
    emailData: object
  ): Promise<object | undefined> {
    return this.api.makeApiCall(
      "post",
      `v1/contacts/${contactId}/emails`,
      emailData
    );
  }

  /**
   * Fetches the tags applied to a contact.
   * @param contactId - The ID of the contact to fetch tags for.
   * @returns The tags applied to the contact if the API call was successful, undefined otherwise.
   */
  listAppliedTags(contactId: number): Promise<object | undefined> {
    return this.api.makeApiCall("get", `v1/contacts/${contactId}/tags`);
  }

  /**
   * Applies a tag to a contact.
   * @param contactId - The ID of the contact to apply the tag to.
   * @param tagId - The ID of the tag to apply.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  applyTag(contactId: number, tagId: number): Promise<object | undefined> {
    return this.api.makeApiCall(
      "post",
      `v1/contacts/${contactId}/tags/${tagId}`
    );
  }

  /**
   * Removes a tag from a contact.
   * @param contactId - The ID of the contact to remove the tag from.
   * @param tagId - The ID of the tag to remove.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  removeTag(contactId: number, tagId: number): Promise<object | undefined> {
    return this.api.makeApiCall(
      "delete",
      `v1/contacts/${contactId}/tags/${tagId}`
    );
  }

  /**
   * Removes multiple tags from a contact.
   * @param contactId - The ID of the contact to remove the tags from.
   * @param tagIds - The IDs of the tags to remove.
   * @param data - Data to be sent with the request.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  removeTags(
    contactId: number,
    tagIds: number[],
    data: object
  ): Promise<object | undefined> {
    return this.api.makeApiCall(
      "delete",
      `v1/contacts/${contactId}/tags?tagIds=${tagIds.join(",")}`,
      data
    );
  }

  /**
   * Adds UTM tracking data to a contact.
   * @param contactId - The ID of the contact to add the UTM data to.
   * @param utmData - The UTM data to add.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  addUTM(contactId: number, utmData: object): Promise<object | undefined> {
    return this.api.makeApiCall(
      "post",
      `v1/contacts/${contactId}/utms`,
      utmData
    );
  }
}
