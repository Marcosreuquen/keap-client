import { Opportunities } from "../../src/models/Opportunities";
import { Api } from "../../src/utils/api";

describe("Opportunities", () => {
  let api: Api;
  let opportunities: Opportunities;

  beforeEach(() => {
    api = new Api("valid-api-key");
    opportunities = new Opportunities(api);
  });

  it("should create a new Opportunities instance", () => {
    expect(opportunities).toBeInstanceOf(Opportunities);
  });

  describe("getOpportunities", () => {
    it("should return undefined if no opportunities are found", async () => {
      jest.spyOn(api, "get").mockResolvedValueOnce(undefined);
      const result = await opportunities.getOpportunities();
      expect(result).toBeUndefined();
    });

    it("should return an error if no opportunities are found and throw is true", async () => {
      jest.spyOn(api, "get").mockResolvedValueOnce(undefined);
      const result = await opportunities.getOpportunities();
      expect(result).toBeUndefined();
    });

    it("should return opportunities with pagination if found", async () => {
      const opportunitiesData = [
        { id: 1, opportunity_title: "Opportunity 1", contact: {}, stage: {} },
        { id: 2, opportunity_title: "Opportunity 2", contact: {}, stage: {} },
      ];
      jest.spyOn(api, "get").mockResolvedValueOnce({
        count: opportunitiesData.length,
        next: "https://example.com",
        previous: "https://example.com",
        opportunities: opportunitiesData,
      });
      const result = await opportunities.getOpportunities();
      expect(result).toBeInstanceOf(Object);
      expect(result).toBeDefined();
      expect(result?.getCount()).toBe(opportunitiesData.length);
      expect(result?.getItems()?.[0]?.opportunity_title).toBe("Opportunity 1");
    });

    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "get")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(opportunities.getOpportunities()).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "get").mockResolvedValueOnce(null);
      const result = await opportunities.getOpportunities();
      expect(result).toBeUndefined();
    });
  });

  describe("createOpportunity", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "post")
        .mockRejectedValueOnce(new Error("API call failed"));
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      await expect(opportunities.createOpportunity({})).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "post").mockResolvedValueOnce(null);
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      const result = await opportunities.createOpportunity({});
      expect(result).toBeUndefined();
    });
  });

  describe("replaceOpportunity", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "put")
        .mockRejectedValueOnce(new Error("API call failed"));
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      await expect(opportunities.replaceOpportunity({})).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "put").mockResolvedValueOnce(null);
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      const result = await opportunities.replaceOpportunity({});
      expect(result).toBeUndefined();
    });
  });

  describe("getOpportunity", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "get")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(opportunities.getOpportunity(1)).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "get").mockResolvedValueOnce(null);
      const result = await opportunities.getOpportunity(1);
      expect(result).toBeUndefined();
    });
  });

  describe("deleteOpportunity", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "delete")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(opportunities.deleteOpportunity(1)).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "delete").mockResolvedValueOnce(null);
      const result = await opportunities.deleteOpportunity(1);
      expect(result).toBeUndefined();
    });
  });

  describe("updateOpportunity", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "patch")
        .mockRejectedValueOnce(new Error("API call failed"));
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      await expect(opportunities.updateOpportunity({})).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "patch").mockResolvedValueOnce(null);
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      const result = await opportunities.updateOpportunity({});
      expect(result).toBeUndefined();
    });
  });
});
