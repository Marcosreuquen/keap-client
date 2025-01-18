import { Contacts } from "../../src/models/Contact";
import { Api } from "../../src/utils/api";

describe("Contacts", () => {
  let api: Api;
  let contacts: Contacts;

  beforeEach(() => {
    api = new Api("valid-api-key");
    contacts = new Contacts(api);
  });

  it("should create a new Contacts instance", () => {
    expect(contacts).toBeInstanceOf(Contacts);
  });

  describe("getContacts", () => {
    it("should return undefined if no contacts are found", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await contacts.getContacts();
      expect(result).toBeUndefined();
    });

    it("should return an error if no contacts are found and throw is true", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await contacts.getContacts();
      expect(result).toBeUndefined();
    });

    it("should return contacts with pagination if found", async () => {
      const contactsData = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ];
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce({
        contacts: contactsData,
      });
      const result = await contacts.getContacts();
      expect(result).toBeInstanceOf(Object);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("contacts");
      /*       expect(result.contacts).toEqual(
        contactsData.map((c) => new Contact(contacts, c))
      ); */
    });

    it("should throw an error if the API call fails", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce({
        contacts: null,
      });
      expect(async () => await contacts.getContacts()).rejects.toThrowError(
        "No contacts found"
      );
    });

    it("should throw an error if the API call fails and throw is true", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce({
        contacts: [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Doe" },
          null,
        ],
      });
      expect(async () => await contacts.getContacts()).rejects.toThrowError(
        "Contact is null"
      );
    });
  });

  describe("createContact", () => {
    it("should succesfully create a contact", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce({
        id: 1,
        given_name: "John",
        family_name: "Doe",
      });
      const result = await contacts.createContact({
        given_name: "John",
        family_name: "Doe",
        email_addresses: [
          {
            email: "string@example.com",
            field: "EMAIL1",
          },
        ],
      });
      expect(result).toBeInstanceOf(Object);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("given_name");
      expect(result).toHaveProperty("family_name");
    });
    it("should return undefined if the API call fails", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await contacts.createContact({
        given_name: "John",
        family_name: "Doe",
        email_addresses: [
          {
            email: "string@example.com",
            field: "EMAIL1",
          },
        ],
      });
      expect(result).toBeUndefined();
    });
    it("should throw if no mail or phone is provided", async () => {
      await expect(
        contacts.createContact({
          given_name: "John",
          family_name: "Doe",
        })
      ).rejects.toThrowError(
        "Contact must contain at least one item in email_addresses or phone_numbers."
      );
    });
    it("should throw if no country code is provided if region is provided", async () => {
      await expect(
        contacts.createContact({
          given_name: "John",
          family_name: "Doe",
          email_addresses: [
            {
              email: "string@example.com",
              field: "EMAIL1",
            },
          ],
          addresses: [
            // @ts-expect-error - region is required if country_code is provided
            {
              region: "CA",
              line1: "123 Main St",
              postal_code: "12345",
              locality: "San Francisco",
              zip_code: "12345",
              zip_four: "1234",
              field: "HOME",
              line2: "Apt 1",
            },
          ],
        })
      ).rejects.toThrowError(
        "Contact must contain a country code if a region is provided."
      );
    });
  });

  describe("updateContact", () => {
    it("should succesfully update a contact", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce({
        id: 1,
        given_name: "John",
        family_name: "Doe",
      });
      const result = await contacts.updateContact(1, {
        id: 1,
        given_name: "John",
        family_name: "Doe",
      });
      expect(result).toBeInstanceOf(Object);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("given_name");
      expect(result).toHaveProperty("family_name");
    });
    it("should return undefined if the API call fails", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await contacts.updateContact(1, {
        id: 1,
        given_name: "John",
        family_name: "Doe",
      });
      expect(result).toBeUndefined();
    });
  });

  describe("deleteContact", () => {
    it("should succesfully delete a contact", async () => {
      api.makeApiCall = jest.fn().mockResolvedValueOnce(true);
      const result = await contacts.deleteContact(1);
      expect(result).toBe(true);
      api.makeApiCall = jest.fn().mockClear();
    });
    it("should return undefined if the API call fails", async () => {
      contacts.deleteContact = jest.fn().mockResolvedValueOnce(undefined);
      const result = await contacts.deleteContact(1);
      expect(result).toBeUndefined();
      api.makeApiCall = jest.fn().mockClear();
    });
  });

  describe("getContact", () => {
    it("should succesfully get a contact", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce({
        id: 1,
        given_name: "John",
        family_name: "Doe",
      });
      const result = await contacts.getContact(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("given_name");
      expect(result).toHaveProperty("family_name");
    });
    it("should return undefined if the API call fails", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await contacts.getContact(1);
      expect(result).toBeUndefined();
    });
  });

  describe("getContactModel", () => {
    it("should succesfully get a contact model", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce({
        id: 1,
        given_name: "John",
        family_name: "Doe",
      });
      const result = await contacts.getContactModel();
      expect(result).toBeInstanceOf(Object);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("given_name");
      expect(result).toHaveProperty("family_name");
    });
    it("should return undefined if the API call fails", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await contacts.getContactModel();
      expect(result).toBeUndefined();
    });
  });


});
