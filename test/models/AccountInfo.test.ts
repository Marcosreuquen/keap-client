import { Api } from "../../src/utils/api";
import { AccountInfo } from "../../src/models/AccountInfo";

describe("AccountInfo", () => {
  let api: Api;
  let accountInfo: AccountInfo;

  beforeEach(() => {
    api = new Api("valid-api-key");
    accountInfo = new AccountInfo(api);
  });

  it("should create a new AccountInfo instance", () => {
    expect(accountInfo).toBeInstanceOf(AccountInfo);
  });

  describe("getAccountInfo", () => {
    it("should return undefined if no account info is found", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await accountInfo.getAccountInfo();
      expect(result).toBeUndefined();
    });

    it("should return account info if found", async () => {
      const accountInfoData = {
        email: "1L4XH@example.com",
        name: "John Doe",
      };
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(accountInfoData);
      const result = await accountInfo.getAccountInfo();
      expect(result).toBeInstanceOf(Object);
      expect(result).toBeDefined();
      expect(result).toEqual(accountInfoData);
    });
  });

  describe("updateAccountInfo", () => {
    it("should return undefined if no account info is found", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await accountInfo.updateAccountInfo({});
      expect(result).toBeUndefined();
    });

    it("should return the correct change if found", async () => {
      const accountInfoData = {
        email: "1L4XH@example.com",
        name: "John Doe",
      };
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(accountInfoData);
      const firstResult = await accountInfo.getAccountInfo();
      expect(firstResult).toBeInstanceOf(Object);
      expect(firstResult).toBeDefined();
      expect(firstResult).toEqual(accountInfoData);
      const secondResult = { ...firstResult, name: "Jane Doe" };
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(secondResult);
      const result = await accountInfo.updateAccountInfo(secondResult);
      expect(result).toBeInstanceOf(Object);
      expect(result).toBeDefined();
      expect(result).toEqual(secondResult);
    });
  });
});
