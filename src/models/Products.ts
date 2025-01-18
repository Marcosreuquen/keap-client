import { Api } from "../utils/api";
import { createParams } from "../utils/queryParams";

export class Products {
  private api: Api;

  /**
   * Creates a model.
   * @param api - The API client to use for making requests.
   */
  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Fetches a list of products.
   * @param options - Options for fetching products, like page size and page number.
   * @returns The list of products if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async getProducts(options?: {
    active?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<ProductsWithPagination | undefined> {
    let queryParams;
    if (options) {
      queryParams = createParams(options, ["active", "limit", "offset"]);
    }
    const r = await this.api.get(`v1/products?${queryParams}`);

    const rObj = r as { products: IProduct[] | null };

    if (!rObj || !Object.prototype.hasOwnProperty.call(rObj, "products")) {
      return undefined;
    }
    if (!rObj.products) {
      return undefined;
    }

    const products = rObj.products.map((product) => {
      if (product === null) {
        throw new Error("Product is null");
      }
      return new Product(this, product);
    });

    return {
      ...r,
      products,
    } as ProductsWithPagination;
  }

  /**
   * Creates a new product.
   * @param data - The data to create a product with.
   * @returns The newly created product if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async createProduct(data: IProduct): Promise<Product | undefined> {
    const r = await this.api.post("v1/products", data);
    if (!r) {
      return undefined;
    }
    return new Product(this, r as IProduct);
  }

  /**
   * Fetches a single product by ID.
   * @param productId - The ID of the product to fetch.
   * @returns The product if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async getProduct(productId: number): Promise<Product | undefined> {
    const r = await this.api.get(`v1/products/${productId}`);
    if (!r) {
      return undefined;
    }
    return new Product(this, r as IProduct);
  }

  /**
   * Updates a product.
   * @param data - The data to update the product with.
   * @returns The updated product if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async updateProduct(data: IProduct): Promise<Product | undefined> {
    const r = await this.api.patch(`v1/products/${data.id}`, data);
    if (!r) {
      return undefined;
    }
    return new Product(this, r as IProduct);
  }

  /**
   * Deletes a product.
   * @param productId - The ID of the product to delete.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async deleteProduct(productId: number): Promise<boolean | undefined> {
    const r = await this.api.delete(`v1/products/${productId}`);
    if (!r) {
      return undefined;
    }
    return true;
  }

  /**
   * Uploads a product image.
   * @param productId - The ID of the product to upload the image to.
   * @param fileData - The base64 encoded image data.
   * @param fileName - The name of the image.
   * @param checksum - The checksum of the image.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async uploadProductImage(
    productId: number,
    fileData: Base64Image,
    fileName: ImageName,
    checksum?: string
  ): Promise<boolean | undefined> {
    //Max payload 3 megabytes, the file_data is base64 encoded.
    const r = await this.api.post(`v1/products/${productId}/image`, {
      checksum,
      file_data: fileData,
      file_name: fileName,
    });
    if (!r) {
      return undefined;
    }
    return true;
  }

  /**
   * Deletes the product image associated with the given product id.
   * @param productId - The ID of the product to delete the image from.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async deleteProductImage(productId: number): Promise<boolean | undefined> {
    const r = await this.api.delete(`v1/products/${productId}/image`);
    if (!r) {
      return undefined;
    }
    return true;
  }

  /**
   * Creates a new subscription plan associated with the given product id.
   * @param productId - The ID of the product to create the subscription plan for.
   * @param data - The data to create the subscription plan with.
   * @returns The newly created subscription plan if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async createASubscriptionPlan(
    productId: number,
    data: IProductSubscription
  ): Promise<IProductSubscription | undefined> {
    const r = await this.api.post(
      `v1/products/${productId}/subscriptions`,
      data
    );
    if (!r) {
      return undefined;
    }
    return r as IProductSubscription;
  }
  /**
   * Fetches a single subscription plan associated with the given product id.
   * @param productId - The ID of the product to fetch the subscription plan from.
   * @param subscriptionId - The ID of the subscription plan to fetch.
   * @returns The subscription plan if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async getASubscriptionPlan(
    productId: number,
    subscriptionId: number
  ): Promise<IProductSubscription | undefined> {
    const r = await this.api.get(
      `v1/products/${productId}/subscriptions/${subscriptionId}`
    );
    if (!r) {
      return undefined;
    }
    return r as IProductSubscription;
  }

  /**
   * Deletes a subscription plan associated with the given product id.
   * @param productId - The ID of the product to delete the subscription plan from.
   * @param subscriptionId - The ID of the subscription plan to delete.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async deleteASubscriptionPlan(
    productId: number,
    subscriptionId: number
  ): Promise<boolean | undefined> {
    const r = await this.api.delete(
      `v1/products/${productId}/subscriptions/${subscriptionId}`
    );
    if (!r) {
      return undefined;
    }
    return true;
  }
}

class Product {
  private products: Products;
  active?: boolean;
  id: number;
  product_desc?: string;
  product_name: string;
  product_price?: number;
  product_short_desc?: string;
  sku?: string;
  subscription_only?: boolean;
  subscription_plans?: Array<IProductSubscription>;
  url?: string;

  /**
   * Creates a new Product instance from the given data and Products model.
   * @param products - The Products model to use for making requests.
   * @param data - The data to use to populate the Product instance.
   * @throws Will throw an error if any of the required fields are missing.
   */
  constructor(products: Products, data: IProduct) {
    if (!data || !data.id || !data.product_name) {
      throw new Error("Invalid product data");
    }
    this.id = data.id;
    this.product_name = data.product_name;
    Object.assign(this, data);
    this.products = products;
  }

  /**
   * Updates this product with the given data.
   * @param data - The data to update this product with.
   * @returns The updated product if the API call was successful, undefined otherwise.
   */
  update(data: IProduct) {
    Object.assign(this, data);
    return this.products.updateProduct(this);
  }

  /**
   * Deletes this product.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  delete(): Promise<boolean | undefined> {
    return this.products.deleteProduct(this.id);
  }

  /**
   * Refreshes this product from the API.
   * @returns The updated product if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  refresh(): Promise<Product | undefined> {
    return this.products.getProduct(this.id);
  }

  /**
   * Creates a new subscription plan for this product.
   * @param data - The data to create the subscription plan with.
   * @returns The newly created subscription plan if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  createSubscriptionPlan(
    data: IProductSubscription
  ): Promise<IProductSubscription | undefined> {
    return this.products.createASubscriptionPlan(this.id, data);
  }

  /**
   * Retrieves a subscription plan associated with this product.
   * @param subscriptionId - The ID of the subscription plan to retrieve.
   * @returns The subscription plan if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  getSubscriptionPlan(
    subscriptionId: number
  ): Promise<IProductSubscription | undefined> {
    return this.products.getASubscriptionPlan(this.id, subscriptionId);
  }

  /**
   * Deletes a subscription plan associated with this product.
   * @param subscriptionId - The ID of the subscription plan to delete.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  deleteSubscriptionPlan(subscriptionId: number): Promise<boolean | undefined> {
    return this.products.deleteASubscriptionPlan(this.id, subscriptionId);
  }

  /**
   * Uploads a product image associated with this product.
   * @param fileData - The base64 encoded image data.
   * @param fileName - The name of the image.
   * @param checksum - The checksum of the image.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  uploadImage(
    fileData: Base64Image,
    fileName: ImageName,
    checksum: string
  ): Promise<boolean | undefined> {
    return this.products.uploadProductImage(
      this.id,
      fileData,
      fileName,
      checksum
    );
  }

  /**
   * Deletes the product image associated with this product.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  deleteImage(): Promise<boolean | undefined> {
    return this.products.deleteProductImage(this.id);
  }
}
