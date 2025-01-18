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

  it("should create a new Ecommerce instance", () => {
    const ecommerce = keapClient.Ecommerce;
    expect(ecommerce).toBeInstanceOf(Object);
  });

  it("should create a new Ecommerce.Orders instance", () => {
    const orders = keapClient.Ecommerce.Orders;
    expect(orders).toBeInstanceOf(Object);
  });

  it("should create a new Ecommerce.Subscriptions instance", () => {
    const subscriptions = keapClient.Ecommerce.Subscriptions;
    expect(subscriptions).toBeInstanceOf(Object);
  });

  it("should create a new Ecommerce.Transactions instance", () => {
    const transactions = keapClient.Ecommerce.Transactions;
    expect(transactions).toBeInstanceOf(Object);
  });

  it("should create a new Files instance", () => {
    const files = keapClient.Files;
    expect(files).toBeInstanceOf(Object);
  });

  it("should create a new Emails instance", () => {
    const emails = keapClient.Emails;
    expect(emails).toBeInstanceOf(Object);
  });

  it("should create a single Emails instance", () => {
    const emails = keapClient.Emails;
    const emails2 = keapClient.Emails;

    expect(emails).toBeInstanceOf(Object);
    expect(emails2).toBeInstanceOf(Object);
    expect(emails).toBe(emails2);
  });
});
