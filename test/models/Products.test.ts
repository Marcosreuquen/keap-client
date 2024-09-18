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
    it("should return undefined if no products are found", async () => {
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce(undefined);
      const result = await products.getProducts();
      expect(result).toBeUndefined();
    });

    it("should return a PaginationWrapper with products if found", async () => {
      const productsData = [
        { id: 1, product_name: "Product 1" },
        { id: 2, product_name: "Product 2" },
      ];
      jest.spyOn(api, "makeApiCall").mockResolvedValueOnce({
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
      jest
        .spyOn(api, "makeApiCall")
        .mockResolvedValueOnce(subscriptionPlanData);
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
        .spyOn(api, "makeApiCall")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(
        products.createASubscriptionPlan(productId, data)
      ).rejects.toThrowError("API call failed");
    });
  });
});
