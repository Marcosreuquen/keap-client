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
    it("should throw an error if no opportunities are found", async () => {
			jest.spyOn(api, "get").mockResolvedValueOnce(undefined);
			await expect(opportunities.getOpportunities()).rejects.toThrowError(
				"Invalid response format: missing opportunities property"
			);
		});

    it("should throw an error if no opportunities are found and throw is true", async () => {
			jest.spyOn(api, "get").mockResolvedValueOnce(undefined);
			await expect(opportunities.getOpportunities()).rejects.toThrowError(
				"Invalid response format: missing opportunities property"
			);
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

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "get").mockResolvedValueOnce(null);
			await expect(opportunities.getOpportunities()).rejects.toThrowError(
				"Invalid response format: missing opportunities property"
			);
		});
  });

  describe("createOpportunity", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "post")
        .mockRejectedValueOnce(new Error("API call failed"));
      const validOpportunity = {
				contact: { id: 1 },
				stage: { id: 1 },
				opportunity_title: "Test",
			} as IOpportunity;
			await expect(
				opportunities.createOpportunity(validOpportunity)
			).rejects.toThrowError("API call failed");
    });

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "post").mockResolvedValueOnce(null);
			const validOpportunity = {
				contact: { id: 1 },
				stage: { id: 1 },
				opportunity_title: "Test",
			} as IOpportunity;
			await expect(
				opportunities.createOpportunity(validOpportunity)
			).rejects.toThrowError("Cannot read properties of null");
		});
  });

  describe("replaceOpportunity", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "put")
        .mockRejectedValueOnce(new Error("API call failed"));
      const validOpportunity = {
				id: 1,
				contact: { id: 1 },
				stage: { id: 1 },
				opportunity_title: "Test",
			} as IOpportunity;
			await expect(
				opportunities.replaceOpportunity(validOpportunity)
			).rejects.toThrowError("API call failed");
    });

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "put").mockResolvedValueOnce(null);
			const validOpportunity = {
				id: 1,
				contact: { id: 1 },
				stage: { id: 1 },
				opportunity_title: "Test",
			} as IOpportunity;
			await expect(
				opportunities.replaceOpportunity(validOpportunity)
			).rejects.toThrowError("Cannot read properties of null");
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

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "get").mockResolvedValueOnce(null);
			await expect(opportunities.getOpportunity(1)).rejects.toThrowError(
				"Cannot read properties of null"
			);
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

    it("should return true if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "delete").mockResolvedValueOnce(null);
			const result = await opportunities.deleteOpportunity(1);
			expect(result).toBe(true);
		});
  });

  describe("updateOpportunity", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "patch")
        .mockRejectedValueOnce(new Error("API call failed"));
      const validOpportunity = {
				id: 1,
				opportunity_title: "Test",
			} as IOpportunity;
			await expect(
				opportunities.updateOpportunity(validOpportunity)
			).rejects.toThrowError("API call failed");
    });

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "patch").mockResolvedValueOnce(null);
			const validOpportunity = {
				id: 1,
				opportunity_title: "Test",
			} as IOpportunity;
			await expect(
				opportunities.updateOpportunity(validOpportunity)
			).rejects.toThrowError("Cannot read properties of null");
		});
  });
});
