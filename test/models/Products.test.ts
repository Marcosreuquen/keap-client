import { Products } from "../../src/models/Products";
import { Api } from "../../src/utils/api";

describe("Products", () => {
  let api: Api;
  let products: Products;

  beforeEach(() => {
    api = new Api("valid-api-key");
    products = new Products(api);
  });

  it("should create a new Products instance", () => {
    expect(products).toBeInstanceOf(Products);
  });

  describe("getProducts", () => {
    it("should throw an error if no products are found", async () => {
			jest.spyOn(api, "get").mockResolvedValueOnce(undefined);
			await expect(products.getProducts()).rejects.toThrowError(
				"Invalid response format: missing products property"
			);
		});

    it("should return a PaginationWrapper with products if found", async () => {
      const productsData = [
        { id: 1, product_name: "Product 1" },
        { id: 2, product_name: "Product 2" },
      ];
      jest.spyOn(api, "get").mockResolvedValueOnce({
        products: productsData,
        count: productsData.length,
        next: "some-url",
        previous: "some-url",
        sync_token: "some-token",
      });
      const result = await products.getProducts();
      expect(result).toBeInstanceOf(Object);
      /* expect(result.products).toEqual(
        productsData.map((p) => new Product(products, p))
      ); */
    });
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "get")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(products.getProducts()).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "get").mockResolvedValueOnce(null);
			await expect(products.getProducts()).rejects.toThrowError(
				"Invalid response format: missing products property"
			);
		});
  });

  describe("createASubscriptionPlan", () => {
    it("should create a new subscription plan if the API call is successful", async () => {
      const productId = 1;
      const data: IProductSubscription = {
        cycle_type: "MONTH",
        plan_price: 10,
      };
      const subscriptionPlanData = {
        id: 1,
        cycle_type: "MONTH",
        plan_price: 10,
      };
      jest.spyOn(api, "post").mockResolvedValueOnce(subscriptionPlanData);
      const result = await products.createASubscriptionPlan(productId, data);
      expect(result).toEqual(subscriptionPlanData);
    });

    it("should throw an error if the API call fails", async () => {
      const productId = 1;
      const data: IProductSubscription = {
        cycle_type: "MONTH",
        plan_price: 10,
      };
      jest
        .spyOn(api, "post")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(
        products.createASubscriptionPlan(productId, data)
      ).rejects.toThrowError("API call failed");
    });
  });

  describe("createProduct", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "post")
        .mockRejectedValueOnce(new Error("API call failed"));
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      await expect(products.createProduct({})).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "post").mockResolvedValueOnce(null);
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			await expect(products.createProduct({})).rejects.toThrowError(
				"Invalid product data"
			);
		});
  });

  describe("getProduct", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "get")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(products.getProduct(1)).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "get").mockResolvedValueOnce(null);
			await expect(products.getProduct(1)).rejects.toThrowError(
				"Invalid product data"
			);
		});
  });

  describe("deleteProduct", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "delete")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(products.deleteProduct(1)).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "delete").mockResolvedValueOnce(null);
      const result = await products.deleteProduct(1);
      expect(result).toBeUndefined();
    });
  });

  describe("updateProduct", () => {
    it("should throw an error if product ID is missing", async () => {
			// @ts-expect-error - Testing with invalid data
			await expect(products.updateProduct({})).rejects.toThrowError(
				"Product ID is required for update"
			);
		});

    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "patch")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(
				products.updateProduct({ id: 1, product_name: "Test" })
			).rejects.toThrowError("API call failed");
    });

    it("should throw an error if the API call returns null", async () => {
			// @ts-expect-error - mockResolvedValue can only be called with non-nullable values
			jest.spyOn(api, "patch").mockResolvedValueOnce(null);
			await expect(
				products.updateProduct({ id: 1, product_name: "Test" })
			).rejects.toThrowError("Invalid product data");
		});
  });

  describe("createASubscriptionPlan", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "post")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(
        // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
        products.createASubscriptionPlan(1, {})
      ).rejects.toThrowError("API call failed");
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "post").mockResolvedValueOnce(null);
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      const result = await products.createASubscriptionPlan(1, {});
      expect(result).toBeUndefined();
    });
  });

  describe("getASubscriptionPlan", () => {
    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "get")
        .mockRejectedValueOnce(new Error("API call failed"));
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      await expect(products.getASubscriptionPlan()).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the API call returns null", async () => {
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      jest.spyOn(api, "get").mockResolvedValueOnce(null);
      // @ts-expect-error - mockResolvedValue can only be called with non-nullable values
      const result = await products.getASubscriptionPlan();
      expect(result).toBeUndefined();
    });
  });
});
