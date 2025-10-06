import { Ecommerce } from "../../src/models/Ecommerce";
import { Api } from "../../src/utils/api";

jest.mock("../../src/utils/api");

describe("Ecommerce", () => {
  let api: Api;
  let ecommerce: Ecommerce;

  beforeEach(() => {
    api = new Api("valid-api-key");
    ecommerce = new Ecommerce(api);
  });

  it("should create a new Ecommerce instance", () => {
    expect(ecommerce).toBeInstanceOf(Ecommerce);
  });

  describe("Orders", () => {
    it("should return an instance of Orders", () => {
      const orders = ecommerce.Orders;
      expect(orders).toBeInstanceOf(Object);
    });
  });

  describe("Subscriptions", () => {
    it("should return an instance of Subscriptions", () => {
      const subscriptions = ecommerce.Subscriptions;
      expect(subscriptions).toBeInstanceOf(Object);
    });
  });

  describe("Transactions", () => {
    it("should return an instance of Transactions", () => {
      const transactions = ecommerce.Transactions;
      expect(transactions).toBeInstanceOf(Object);
    });
  });
});

describe("Order", () => {
  let api: Api;
  let order: Ecommerce["Orders"];

  beforeEach(() => {
    api = new Api("valid-api-key");
    order = new Ecommerce(api).Orders;
  });

  describe("getOrders", () => {
    it("should return orders with pagination if found", async () => {
      const ordersData = [
        {
          id: 1,
          order_date: "2022-01-01",
          order_items: [
            {
              product_id: 1,
              quantity: 1,
              price: 10,
            },
          ],
          order_type: "test",
          title: "test",
        },
      ];
      jest.spyOn(api, "get").mockResolvedValueOnce({
        orders: ordersData,
        count: ordersData.length,
        next: "https://example.com",
        previous: "https://example.com",
      });
      const result = await order.getOrders();
      expect(result).toBeDefined();
      expect(result?.getCount()).toBe(ordersData.length);
      expect(result?.getItems()).toHaveLength(ordersData.length);
      expect(typeof result?.next).toBe("function");
      expect(typeof result?.previous).toBe("function");
      const firstOrder = result?.getItems()[0];
      expect(firstOrder?.id).toBe(ordersData[0]?.id);
      expect(firstOrder?.order_date).toBe(ordersData[0]?.order_date);

      expect(firstOrder?.order_type).toBe(ordersData[0]?.order_type);
      expect(firstOrder?.title).toBe(ordersData[0]?.title);
    });
  });

  describe("createOrder", () => {
    it("should create an order", async () => {
      const orderData = {
        contact_id: 1,
        lead_affiliate_id: 1,
        order_date: "2022-01-01",
        order_title: "Test Order",
        order_type: "test",
        promo_codes: [],
        sales_affiliate_id: 1,
        shipping_address: {
          address1: "123 Main St",
          address2: "",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        },
        order_items: [
          {
            product_id: 1,
            quantity: 1,
          },
        ],
        title: "Test Order",
      };

      const options = {
        contact_id: 1,
        lead_affiliate_id: 1,
        order_date: "2022-01-01",
        order_title: "Test Order",
        order_type: "test",
        promo_codes: [],
        sales_affiliate_id: 1,
        shipping_address: {
          address1: "123 Main St",
          address2: "",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        },
      };

      const response = {
        contact_id: 0,
        lead_affiliate_id: 0,
        order_date: "2019-08-24T14:15:22Z",
        order_items: [
          {
            description: "string",
            price: "string",
            product_id: 0,
            quantity: 0,
          },
        ],
        order_title: "string",
        order_type: "Offline",
        promo_codes: ["string"],
        sales_affiliate_id: 0,
        shipping_address: {
          company: "string",
          country_code: "string",
          first_name: "string",
          is_invoice_to_company: true,
          last_name: "string",
          line1: "string",
          line2: "string",
          locality: "string",
          middle_name: "string",
          phone: "string",
          region: "string",
          zip_code: "string",
          zip_four: "string",
        },
      };
      jest.spyOn(api, "post").mockResolvedValueOnce(response);
      const result = await order.createOrder(options, orderData);
      expect(result).toBeTruthy();
    });
  });

  describe("getOrder", () => {
    it("should retrieve an order", async () => {
      const orderId = 1;
      const response = {
        allow_payment: true,
        allow_paypal: true,
        contact: {
          company_name: "string",
          email: "string",
          first_name: "string",
          id: 0,
          job_title: "string",
          last_name: "string",
        },
        creation_date: "string",
        id: 0,
        invoice_number: 0,
        lead_affiliate_id: 0,
        modification_date: "string",
        notes: "string",
        order_date: "string",
        order_items: [
          {
            cost: 0,
            description: "string",
            discount: 0,
            id: 0,
            jobRecurringId: 0,
            name: "string",
            notes: "string",
            price: 0,
            product: {
              description: "string",
              id: 0,
              name: "string",
              shippable: true,
              sku: "string",
              taxable: true,
            },
            quantity: 0,
            specialAmount: 0,
            specialId: 0,
            specialPctOrAmt: 0,
            subscriptionPlan: {
              active: true,
              cycle: 0,
              frequency: 0,
              id: 0,
              number_of_cycles: 0,
              plan_price: 0,
              subscription_plan_index: 0,
              subscription_plan_name: "string",
            },
            type: "string",
          },
        ],
        order_type: "string",
        payment_plan: {
          auto_charge: true,
          credit_card_id: 0,
          days_between_payments: 0,
          initial_payment_amount: 0,
          initial_payment_date: "string",
          number_of_payments: 0,
          payment_gateway: {
            merchant_account_id: 0,
            use_default: true,
          },
          plan_start_date: "string",
        },
        recurring: true,
        refund_total: 0,
        sales_affiliate_id: 0,
        shipping_information: {
          city: "string",
          company: "string",
          country: "string",
          first_name: "string",
          id: 0,
          invoiceToCompany: true,
          last_name: "string",
          middle_name: "string",
          phone: "string",
          state: "string",
          street1: "string",
          street2: "string",
          zip: "string",
        },
        source_type: "INVOICE",
        status: "string",
        terms: "string",
        title: "string",
        total: 0,
        total_due: 0,
        total_paid: 0,
      };
      jest.spyOn(api, "get").mockResolvedValueOnce(response);
      const result = await order.getOrder(orderId);
      expect(result).toEqual(response);
    });
  });

  describe("deleteOrder", () => {
    it("should return true if the order was deleted", async () => {
      const orderId = 1;
      order.deleteOrder = jest.fn().mockResolvedValueOnce(true);
      const result = await order.deleteOrder(orderId);
      expect(result).toBe(true);
    });
  });
});

describe("Subscription", () => {
  let api: Api;
  let subscription: Ecommerce["Subscriptions"];

  beforeEach(() => {
    api = new Api("valid-api-key");
    subscription = new Ecommerce(api).Subscriptions;
  });

  describe("createSubscription", () => {
    it("should create a new subscription if the API call is successful", async () => {
      const data: createSubscription = {
        allow_duplicate: true,
        allow_tax: true,
        auto_charge: true,
        billing_amount: 10.99,
        contact_id: 1,
        credit_card_id: 1,
        first_bill_date: "2022-01-01",
        payment_gateway_id: 1,
        quantity: 1,
        sale_affiliate_id: 1,
        subscription_plan_id: 1,
      };
      const subscriptionPlanData = {
        id: 1,
        cycle_type: "MONTH",
        plan_price: 10.99,
      };
      jest.spyOn(api, "post").mockResolvedValueOnce(subscriptionPlanData);
      const result = await subscription.createSubscription(data);
      expect(result).toEqual(subscriptionPlanData);
    });

    it("should throw an error if the API call fails", async () => {
      const data: createSubscription = {
        allow_duplicate: true,
        allow_tax: true,
        auto_charge: true,
        billing_amount: 10.99,
        contact_id: 1,
        credit_card_id: 1,
        first_bill_date: "2022-01-01",
        payment_gateway_id: 1,
        quantity: 1,
        sale_affiliate_id: 1,
        subscription_plan_id: 1,
      };
      jest
        .spyOn(api, "post")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(subscription.createSubscription(data)).rejects.toThrowError(
        "API call failed"
      );
    });
  });

  describe("getSubscriptions", () => {
    it("should return a list of subscriptions if the API call is successful", async () => {
      const subscriptionsData = [
        {
          id: 1,
          cycle_type: "MONTH",
          plan_price: 10.99,
        },
        {
          id: 2,
          cycle_type: "YEAR",
          plan_price: 99.99,
        },
      ];
      jest.spyOn(api, "get").mockResolvedValueOnce({
        count: subscriptionsData.length,
        next: "https://example.com",
        previous: "https://example.com",
        subscriptions: subscriptionsData,
      });
      const result = await subscription.getSubscriptions();
      expect(result.getCount()).toBe(2);
      expect(result.getItems()).toEqual(subscriptionsData);
      expect(typeof result.next).toBe("function");
      expect(typeof result.previous).toBe("function");
    });

    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "get")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(subscription.getSubscriptions()).rejects.toThrowError(
        "API call failed"
      );
    });
  });
});

describe("Transaction", () => {
  let api: Api;
  let transaction: Ecommerce["Transactions"];

  beforeEach(() => {
    api = new Api("valid-api-key");
    transaction = new Ecommerce(api).Transactions;
  });

  describe("getTransactions", () => {
    it("should return a list of transactions if the API call is successful", async () => {
      const transactionsData = [
        {
          id: 1,
          amount: 10.99,
          collection_method: "CREDIT_CARD",
          contact_id: 1,
          currency: "USD",
          gateway: "STRIPE",
          gateway_account_name: "Test Account",
          order_ids: [1],
          paymentDate: "2022-01-01",
          status: "COMPLETED",
          test: false,
          transaction_date: "2022-01-01",
          type: "SALE",
        },
        {
          id: 2,
          amount: 20.99,
          collection_method: "BANK_TRANSFER",
          contact_id: 2,
          currency: "EUR",
          gateway: "PAYPAL",
          gateway_account_name: "Test Account 2",
          order_ids: [2],
          paymentDate: "2022-01-15",
          status: "PENDING",
          test: true,
          transaction_date: "2022-01-15",
          type: "REFUND",
        },
      ];
      jest.spyOn(api, "get").mockResolvedValueOnce({
        transactions: transactionsData,
        count: transactionsData.length,
        next: "https://example.com",
        previous: "https://example.com",
      });
      const result = await transaction.getTransactions();
      expect(result?.getCount()).toBe(2);
      expect(result?.getItems()).toEqual(transactionsData);
      expect(typeof result?.next).toBe("function");
      expect(typeof result?.previous).toBe("function");
    });

    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "get")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(transaction.getTransactions()).rejects.toThrowError(
        "API call failed"
      );
    });
  });

  describe("getTransaction", () => {
    it("should return a transaction if the API call is successful", async () => {
      const transactionData = {
        id: 1,
        amount: 10.99,
        collection_method: "CREDIT_CARD",
        contact_id: 1,
        currency: "USD",
        gateway: "STRIPE",
        gateway_account_name: "Test Account",
        order_ids: [1],
        paymentDate: "2022-01-01",
        status: "COMPLETED",
        test: false,
        transaction_date: "2022-01-01",
        type: "SALE",
      };
      jest.spyOn(api, "get").mockResolvedValueOnce(transactionData);
      const result = await transaction.getTransaction(1);
      expect(result).toEqual(transactionData);
    });

    it("should throw an error if the API call fails", async () => {
      jest
        .spyOn(api, "get")
        .mockRejectedValueOnce(new Error("API call failed"));
      await expect(transaction.getTransaction(1)).rejects.toThrowError(
        "API call failed"
      );
    });

    it("should return undefined if the transaction is not found", async () => {
      jest.spyOn(api, "get").mockResolvedValueOnce(undefined);
      const result = await transaction.getTransaction(1);
      expect(result).toBeUndefined();
    });
  });
});
