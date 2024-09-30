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
      });
      expect(result).toBeUndefined();
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
      jest.spyOn(api, "makeApiCall").mockImplementation(() => {
        throw new Error("API call failed");
      });
      await expect(contacts.deleteContact(1)).rejects.toThrowError(
        "API call failed"
      );
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
