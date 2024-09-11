import { KeapClient } from "../src/index";

describe("KeapClient", () => {
  let keapClient: KeapClient;

  beforeEach(() => {
    keapClient = new KeapClient({ apiKey: "valid-api-key" });
  });

  it("should have a Contact property", () => {
    expect(keapClient.Contact).toBeDefined();
  });

  it("should create a new Contact instance", () => {
    const contact = keapClient.Contact;
    expect(contact).toBeInstanceOf(Object);
  });
});
