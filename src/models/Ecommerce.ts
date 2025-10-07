import { Api } from "../utils/api";
import { Paginator } from "../utils/paginator";
import { createParams } from "../utils/queryParams";

export class Ecommerce {
  private api: Api;

  /**
   * Creates a new ecommerce model.
   * @param api - The API client to use for making requests.
   */
  constructor(api: Api) {
    this.api = api;
  }

  get Orders() {
    return new Order(this.api);
  }

  get Subscriptions() {
    return new Subscription(this.api);
  }

  get Transactions() {
    return new Transaction(this.api);
  }
}

class Order {
	private api: Api;

	constructor(api: Api) {
		this.api = api;
	}

	/**
	 * Fetches a list of orders with optional filtering.
	 * @param params - Optional parameters for filtering orders.
	 * @returns A paginator containing the list of orders.
	 * @example
	 * const orders = await ecommerce.Orders.getOrders({
	 *   limit: 10,
	 *   paid: true
	 * });
	 */
	async getOrders(params?: {
		limit?: number;
		offset?: number;
		since?: string;
		until?: string;
		paid?: boolean;
		order?: "order_date" | "update_date";
		contact_id?: number;
	}): Promise<Paginator<IOrder>> {
		const queryParams = params
			? createParams(params, [
					"limit",
					"offset",
					"since",
					"until",
					"paid",
					"order",
					"contact_id",
			  ]).toString()
			: "";
		const response = await this.api.get(`v1/orders?${queryParams}`);
		return Paginator.wrap(this.api, response, "orders");
	}

	/**
	 * Creates a new order.
	 * @param options - Required order configuration.
	 * @param data - Additional order data.
	 * @returns The newly created order.
	 * @example
	 * const order = await ecommerce.Orders.createOrder(
	 *   {
	 *     contact_id: 123,
	 *     order_date: "2023-01-01T00:00:00Z",
	 *     order_title: "New Order",
	 *     order_type: "Online"
	 *   },
	 *   orderData
	 * );
	 */
	async createOrder(
		options: {
			contact_id: number;
			lead_affiliate_id?: number;
			order_date: string;
			order_title: string;
			order_type: string;
			promo_codes?: string[];
			sales_affiliate_id?: number;
			shipping_address?: ShippingInformation;
		},
		data: IOrder
	): Promise<IOrder> {
		const response = await this.api.post("v1/orders", {
			...options,
			...data,
		});
		return response as IOrder;
	}

	/**
	 * Retrieves a specific order by ID.
	 * @param id - The ID of the order to retrieve.
	 * @returns The order.
	 * @example
	 * const order = await ecommerce.Orders.getOrder(123);
	 */
	async getOrder(id: number): Promise<IOrder> {
		const response = await this.api.get(`v1/orders/${id}`);
		return response as IOrder;
	}

	/**
	 * Deletes an order by ID.
	 * @param id - The ID of the order to delete.
	 * @returns True if the order was successfully deleted.
	 * @example
	 * const deleted = await ecommerce.Orders.deleteOrder(123);
	 * if (deleted) console.log("Order deleted successfully");
	 */
	async deleteOrder(id: number): Promise<boolean> {
		await this.api.delete(`v1/orders/${id}`);
		return true;
	}

	async createItem(
		orderId: number,
		data: {
			description?: string;
			price?: number;
			product_id: number;
			quantity?: number;
		}
	): Promise<IOrderItem | undefined> {
		const r = await this.api.post(`v1/orders/${orderId}/items`, data);
		if (!r) return undefined;
		return r as IOrderItem;
	}

	async deleteItem(
		orderId: number,
		itemId: number
	): Promise<boolean | undefined> {
		const r = await this.api.delete(`v1/orders/${orderId}/items/${itemId}`);
		if (!r) return undefined;
		return true;
	}

	async getOrderPayments(orderId: number): Promise<object | undefined> {
		const r = await this.api.get(`v1/orders/${orderId}/payments`);
		if (!r) return undefined;
		return r;
	}

	async createOrderPayment(
		orderId: number,
		data: createOrderPayment
	): Promise<object | undefined> {
		const r = await this.api.post(`v1/orders/${orderId}/payments`, data);
		if (!r) return undefined;
		return r;
	}

	async getOrderTransactions(
		orderId: number,
		options?: {
			contact_id?: number;
			limit?: number;
			offset?: number;
			since?: string;
			until?: string;
		}
	): Promise<Paginator<ITransaction> | undefined> {
		const queryParams = options
			? createParams(options, [
					"contact_id",
					"limit",
					"offset",
					"since",
					"until",
			  ])
			: "";

		const r = await this.api.get(
			`v1/orders/${orderId}/transactions?${queryParams.toString()}`
		);

		if (!r) return undefined;
		return Paginator.wrap(this.api, r, "transactions");
	}
}

class Subscription {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getSubscriptions(): Promise<Paginator<ISubscription>> {
    const r = await this.api.get("v1/subscriptions");
    return Paginator.wrap(this.api, r, "subscriptions");
  }

  async createSubscription(
    data: createSubscription
  ): Promise<ISubscription | undefined> {
    const r = await this.api.post("v1/subscriptions", data);
    if (!r) return undefined;
    return r as ISubscription;
  }
}

class Transaction {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getTransactions(options?: {
    contact_id?: number;
    limit?: number;
    offset?: number;
    since?: string;
    until?: string;
  }): Promise<Paginator<ITransaction> | undefined> {
    const queryParams = options
      ? createParams(options, [
          "contact_id",
          "limit",
          "offset",
          "since",
          "until",
        ])
      : "";

    const r = await this.api.get(`v1/transactions?${queryParams.toString()}`);
    if (!r) return undefined;
    return Paginator.wrap(this.api, r, "transactions");
  }

  async getTransaction(id: number): Promise<ITransaction | undefined> {
    const r = await this.api.get(`v1/transactions/${id}`);
    if (!r) return undefined;
    return r as ITransaction;
  }
}
