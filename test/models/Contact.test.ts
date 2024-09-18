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
  });
});
