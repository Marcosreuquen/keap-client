import { KeapClient } from "../src/index";
import { AccountInfo } from "../src/models/AccountInfo";
import { Contacts } from "../src/models/Contact";
import { Opportunities } from "../src/models/Opportunities";
import { Products } from "../src/models/Products";

describe("KeapClient", () => {
  let keapClient: KeapClient;

  beforeEach(() => {
    keapClient = new KeapClient({ apiKey: "valid-api-key" });
  });

  it("should have a Contact property", () => {
    expect(keapClient.Contacts).toBeDefined();
  });

  it("should create a new Contact instance", () => {
    const contact = keapClient.Contacts;
    expect(contact).toBeInstanceOf(Contacts);
  });

  it("should create a new AccountInfo instance", () => {
    const accountInfo = keapClient.AccountInfo;
    expect(accountInfo).toBeInstanceOf(AccountInfo);
  });

  it("should create a new Opportunities instance", () => {
    const opportunities = keapClient.Opportunities;
    expect(opportunities).toBeInstanceOf(Opportunities);
  });

  it("should create a new Products instance", () => {
    const products = keapClient.Products;
    expect(products).toBeInstanceOf(Products);
  });
});
