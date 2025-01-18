import { Api } from "../utils/api";
import { createParams } from "../utils/queryParams";

export class Contacts {
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
   * email:string //Optional email address to query on
   * family_name:string //Optional last name or surname to query on
   * given_name:string //Optional first name or forename to query on
   * limit:number //Sets a total of items to return
   * offset:number //Sets a beginning range of items to return
   * optional_properties:string[] //Comma-delimited list of Contact properties to include in the response. (Some fields such as lead_source_id, custom_fields, and job_title aren't included, by default.)
   * order:string //Enum: "id" "date_created" "last_updated" "name" "firstName" "email" //Attribute to order items by
   * order_direction:string //Enum: "ASCENDING" "DESCENDING" //How to order the data i.e. ascending (A-Z) or descending (Z-A)
   * since:string //Date to start searching from on LastUpdated ex. 2017-01-01T22:17:59.039Z
   * until:string //Date to search to on LastUpdated ex. 2017-01-01T22:17:59.039Z
   * @example
   * const contacts = await contacts.getContacts({ limit: 5, offset: 10 });
   * console.log(contacts);
   * @returns The list of contacts if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async getContacts(parameters?: {
    email: string;
    family_name: string;
    given_name: string;
    limit: number;
    offset: number;
    optional_properties: string[];
    order:
      | "id"
      | "date_created"
      | "last_updated"
      | "name"
      | "firstName"
      | "email";
    order_direction: "ASCENDING" | "DESCENDING";
    since: string;
    until: string;
  }): Promise<ContactsWithPagination | undefined> {
    const params = parameters
      ? createParams(parameters, [
          "email",
          "limit",
          "offset",
          "family_name",
          "given_name",
          "optional_properties",
          "order",
          "order_direction",
          "since",
          "until",
        ])
      : undefined;

    const r = await this.api.get(`v1/contacts?${params}`);

    // Add this line to assert that r is an object with a 'contacts' property
    const rObj = r as { contacts: IContact[] | null };

    if (!rObj || !Object.prototype.hasOwnProperty.call(rObj, "contacts")) {
      return undefined;
    }

    if (rObj.contacts === null) {
      throw new Error("No contacts found");
    }

    const contacts = rObj.contacts.map((c: IContact) => {
      if (c === null) {
        throw new Error("Contact is null");
      }
      return new Contact(this, c);
    });

    return {
      ...r,
      contacts,
    };
  }

  /**
   * Creates a new contact in Keap. NB: Contact must contain at least one item in email_addresses or phone_numbers and country_code is required if region is specified on the adresses.
   * @param contactData {IContact} - The data to create a contact with ContactData.
   * @returns The newly created contact if the API call was successful, undefined otherwise.
   * @example
   * const contact = await contacts.createContact(given_name: 'John',
   *  family_name: 'Doe',
   * email_addresses: [
   * {
   *   email: "string@example.com",
   *   field: "EMAIL1"
   * }
   * ],);
   * console.log(contact);
   * @throws Will throw an error if the API call fails.
   */
  async createContact(contactData: IContact): Promise<Contact | undefined> {
    if (!contactData.email_addresses && !contactData.phone_numbers) {
      throw new Error(
        "Contact must contain at least one item in email_addresses or phone_numbers."
      );
    }
    const addressesWithRegionAndNoCountryCode = contactData.addresses?.filter(
      (address) => address.region && !address.country_code
    );

    if (
      addressesWithRegionAndNoCountryCode &&
      addressesWithRegionAndNoCountryCode.length > 0
    ) {
      throw new Error(
        "Contact must contain a country code if a region is provided."
      );
    }
    const r = await this.api.post("v1/contacts", contactData as IContact);
    if (!r) return undefined;
    return new Contact(this, r as IContact);
  }

  /**
   * Updates an existing contact.
   * @param contactId - The ID of the contact to update.
   * @param contactData {IContact} - The data to update the contact with.
   * @returns The updated contact if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   * @example
   * const contact = await contacts
   *  .updateContact(123, {
   *    given_name: "Jane",
   *    family_name: "Doe"
   * });
   */
  async updateContact(
    contactId: number,
    contactData: IContact
  ): Promise<Contact | undefined> {
    const r = await this.api.patch(`v1/contacts/${contactId}`, contactData);
    if (!r) return undefined;
    return new Contact(this, r as IContact);
  }

  /**
   * Deletes a contact by ID.
   * @param contactId - The ID of the contact to delete.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   * @example
   * const result = await contacts.deleteContact(123);
   * console.log(result); // true
   * if (result) {
   *   console.log("Contact deleted successfully");
   * }else{
   *   console.log("Failed to delete contact");
   * }
   */
  async deleteContact(contactId: number): Promise<boolean | undefined> {
    const r = this.api.delete(`v1/contacts/${contactId}`);
    if (!r) return undefined;
    return true;
  }

  /**
   * Fetches a single contact by ID.
   * @param contactId - The ID of the contact to fetch.
   * @returns The contact if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   * @example
   * const contact = await contacts.getContact(123);
   * console.log(contact.given_name); // "Jane"
   * console.log(contact.family_name); // "Doe"
   */
  async getContact(contactId: number): Promise<Contact | undefined> {
    const r = await this.api.get(`v1/contacts/${contactId}`);
    if (!r) return undefined;
    return new Contact(this, r as IContact);
  }

  /**
   * Fetches the contact model.
   * @returns The contact model if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   * @example
   * const contactModel = await contacts.getContactModel();
   * console.log(contactModel);
   */
  async getContactModel(): Promise<ContactModel | undefined> {
    const r = await this.api.get("v1/contacts/model");
    if (!r) return undefined;
    return r as Promise<ContactModel>;
  }

  /**
   * Creates a new custom contact field.
   * @param customFieldData{CustomField} - The data to create a custom field with.
   * @returns The newly created custom field if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async createCustomField(
    customFieldData: CustomField
  ): Promise<CustomField | undefined> {
    const r = await this.api.post("v1/contacts/customFields", customFieldData);
    if (!r) return undefined;
    return r as Promise<CustomField>;
  }

  /**
   * Creates a new contact if the contact does not exist, or updates the contact if it does.
   * @param contactData {IContact} - The data to create or update a contact with.
   * @returns The newly created or updated contact if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   * @example
   * const contact = await contacts.createOrUpdate({
   *    given_name: "Jane",
   *    family_name: "Doe"
   * })
   *
   * console.log(contact); // {given_name: "Jane", family_name: "Doe", id: 123}
   *
   *
   * const contact = await contacts.createOrUpdate({
   *    given_name: "John",
   *    family_name: "Doe"
   *    id: 123
   * })
   *
   * console.log(contact); // {given_name: "John", family_name: "Doe", id: 123}
   */
  async createOrUpdate(contactData: IContact): Promise<Contact | undefined> {
    const r = await this.api.put("v1/contacts", contactData);
    if (!r) return undefined;
    return new Contact(this, r as IContact);
  }

  /**
   * Fetches the credit cards associated with a contact.
   * @param contactId - The ID of the contact to fetch credit cards for.
   * @returns The credit cards associated with the contact if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  getCreditCards(contactId: number): Promise<object | undefined> {
    return this.api.get(`v1/contacts/${contactId}/creditCards`);
  }

  /**
   * Creates a new credit card for a contact.
   * @param contactId - The ID of the contact to add the credit card to.
   * @param creditCardData - The data to create the credit card with.
   * @returns {Promise<CreditCard>} - The newly created credit card if the API call was successful, undefined otherwise.
   */
  createCreditCard(
    contactId: number,
    creditCardData: object
  ): Promise<CreditCard | undefined> {
    return this.api.post(
      `v1/contacts/${contactId}/creditCards`,
      creditCardData
    ) as Promise<CreditCard>;
  }

  /**
   * Fetches the email addresses associated with a contact.
   * @param contactId - The ID of the contact to fetch email addresses for.
   * @returns The email addresses associated with the contact if the API call was successful, undefined otherwise.
   */
  async listEmails(
    contactId: number,
    options?: { email?: string; limit?: number; offset?: number }
  ): Promise<EmailsWithPagination | undefined> {
    const params = options
      ? createParams(options, ["email", "limit", "offset"])
      : undefined;
    const r = await this.api.get(
      `v1/contacts/${contactId}/emails?${params?.toString()}`
    );
    if (!r) return undefined;
    return r as EmailsWithPagination;
  }

  /**
   * Creates a new email address for a contact.
   * @param contactId - The ID of the contact to add the email address to.
   * @param emailData {EmailRecord} - The data to create the email address with.
   * @returns The newly created email address if the API call was successful, undefined otherwise.
   */
  createEmail(
    contactId: number,
    emailData: EmailRecord
  ): Promise<EmailRecord | undefined> {
    return this.api.post(
      `v1/contacts/${contactId}/emails`,
      emailData
    ) as Promise<EmailRecord>;
  }

  /**
   * Fetches the tags applied to a contact.
   * @param contactId - The ID of the contact to fetch tags for.
   * @param options - The options to use when fetching tags.
   * @returns The tags applied to the contact if the API call was successful, undefined otherwise.
   */
  async listAppliedTags(
    contactId: number,
    options?: { limit?: number; offset?: number }
  ): Promise<TagWithPagination | undefined> {
    const params = options
      ? createParams(options, ["limit", "offset"])
      : undefined;
    const r = await this.api.get(
      `v1/contacts/${contactId}/tags?${params?.toString()}`
    );
    if (!r) return undefined;
    return r as TagWithPagination;
  }

  /**
   * Applies a tag to a contact.
   * @param contactId {number} - The ID of the contact to apply the tag to.
   * @param tagIds {number[]} - The ID of the tag to apply.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  applyTags(contactId: number, tagIds: number[]): Promise<object | undefined> {
    return this.api.post(`v1/contacts/${contactId}/tags`, {
      tagIds,
    });
  }

  /**
   * Removes a tag from a contact.
   * @param contactId - The ID of the contact to remove the tag from.
   * @param tagId - The ID of the tag to remove.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  removeTag(contactId: number, tagId: number): Promise<object | undefined> {
    return this.api.delete(`v1/contacts/${contactId}/tags/${tagId}`);
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
    return this.api.delete(
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
  addUTM(contactId: number, utmData: UTM): Promise<UTM | undefined> {
    return this.api.post(
      `v1/contacts/${contactId}/utms`,
      utmData
    ) as Promise<UTM>;
  }
}

class Contact {
  ScoreValue: string | null = null;
  addresses: Array<{
    country_code: string;
    field: string;
    line1: string;
    line2: string;
    locality: string;
    postal_code: string;
    region: string;
    zip_code: string;
    zip_four: string;
  }> | null = null;
  anniversary: Date | null = null;
  birthday: Date | null = null;
  company: {
    company_name: string;
    id: number;
  } | null = null;
  company_name: string | null = null;
  contact_type: string | null = null;
  custom_fields: Array<{
    content: object;
    id: number;
  }> | null = null;
  date_created: Date | null = null;
  email_addresses: Array<{
    email: string;
    field: string;
  }> | null = null;
  email_opted_in: boolean | null = null;
  email_status: string | null = null;
  family_name: string | null = null;
  fax_numbers: Array<{
    field: string;
    number: string;
    type: string;
  }> | null = null;
  given_name: string | null = null;
  id: number;
  job_title: string | null = null;
  last_updated: Date | null = null;
  lead_source_id: number | null = null;
  middle_name: string | null = null;
  opt_in_reason: string | null = null;
  origin: {
    date: Date;
    ip_address: string;
  } | null = null;
  owner_id: number | null = null;
  phone_numbers: Array<{
    extension: string;
    field: string;
    number: string;
    type: string;
  }> | null = null;
  preferred_locale: string | null = null;
  preferred_name: string | null = null;
  prefix: string | null = null;
  relationships: Array<{
    id: number;
    linked_contact_id: number;
    relationship_type_id: number;
  }> | null = null;
  social_accounts: Array<{
    name: string;
    type: string;
  }> | null = null;
  source_type: string | null = null;
  spouse_name: string | null = null;
  suffix: string | null = null;
  tag_ids: Array<number> | null = null;
  time_zone: string | null = null;
  website: string | null = null;
  private contacts: Contacts;

  /**
   * Creates a new Contact instance from the given data and API client.
   * @param api - The API client to use for making requests.
   * @param data - The data to use to populate the Contact instance.
   */
  constructor(contacts: Contacts, data: IContact) {
    this.contacts = contacts;
    Object.assign(this, data);
    if (!data.id) throw new Error("Contact ID is required");
    this.id = data.id;
  }

  /**
   * Updates the contact with the given data.
   * @param data - The data to update the contact with.
   * @returns The updated contact if the API call was successful, undefined otherwise.
   */
  async update(data: IContact): Promise<Contact | undefined> {
    const r = await this.contacts.updateContact(this.id, data);
    if (!r) return undefined;
    return new Contact(this.contacts, r);
  }

  /**
   * Deletes the contact.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async delete(): Promise<boolean | undefined> {
    return this.contacts.deleteContact(this.id);
  }

  /**
   * Refreshes the contact data from the API.
   * @returns The updated contact if the API call was successful, undefined otherwise.
   */
  async refresh(): Promise<Contact | undefined> {
    const contact = await this.contacts.getContact(this.id);
    Object.assign(this, contact);
    return contact;
  }

  /**
   * Fetches the credit cards associated with this contact.
   * @returns The credit cards associated with this contact if the API call was successful, undefined otherwise.
   */
  getCreditCards(): Promise<object | undefined> {
    return this.contacts.getCreditCards(this.id);
  }

  /**
   * Creates a new credit card for this contact.
   * @param data - The data to create the credit card with.
   * @returns The newly created credit card if the API call was successful, undefined otherwise.
   */
  addCreditCard(data: object): Promise<CreditCard | undefined> {
    return this.contacts.createCreditCard(this.id, data);
  }

  /**
   * Fetches the email addresses associated with this contact.
   * @param options - The options to use when fetching email addresses.
   * @returns The email addresses associated with this contact if the API call was successful, undefined otherwise.
   */
  getEmails(options?: {
    email?: string;
    limit?: number;
    offset?: number;
  }): Promise<EmailsWithPagination | undefined> {
    return this.contacts.listEmails(this.id, options);
  }

  /**
   * Adds a new email address to this contact.
   * @param data - The data to create the email address with.
   * @returns The newly created email address if the API call was successful, undefined otherwise.
   */
  addEmail(data: EmailRecord): Promise<EmailRecord | undefined> {
    return this.contacts.createEmail(this.id, data);
  }

  /**
   * Fetches the tags applied to this contact.
   * @param options - The options to use when fetching tags.
   * @returns The tags applied to this contact if the API call was successful, undefined otherwise.
   */
  getAppliedTags(options?: {
    limit?: number;
    offset?: number;
  }): Promise<TagWithPagination | undefined> {
    return this.contacts.listAppliedTags(this.id, options);
  }

  /**
   * Applies the given tags to this contact.
   * @param tagIds - The IDs of the tags to apply.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  applyTags(tagIds: number[]): Promise<object | undefined> {
    return this.contacts.applyTags(this.id, tagIds);
  }

  /**
   * Removes the given tag from this contact.
   * @param tagId - The ID of the tag to remove.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  removeTag(tagId: number): Promise<object | undefined> {
    return this.contacts.removeTag(this.id, tagId);
  }

  /**
   * Removes multiple tags from this contact.
   * @param tagIds - The IDs of the tags to remove.
   * @param data - Data to be sent with the request.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  removeTags(tagIds: number[], data: object): Promise<object | undefined> {
    return this.contacts.removeTags(this.id, tagIds, data);
  }

  /**
   * Adds UTM tracking data to this contact.
   * @param utmData - The UTM data to add.
   * @returns The result of the API call if it was successful, undefined otherwise.
   */
  addUTM(utmData: UTM): Promise<UTM | undefined> {
    return this.contacts.addUTM(this.id, utmData);
  }
}
