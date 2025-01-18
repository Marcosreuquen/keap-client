import { Api } from "../utils/api";
import { createParams } from "../utils/queryParams";

export class Opportunities {
  private api: Api;

  /**
   * Creates a model.
   * @param api - The API client to use for making requests.
   */
  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Fetches a list of opportunities.
   * @param parameters - Options for fetching opportunities, like page size and page number.
   * @example
   * const opportunities = await opportunities.getopportunities({ limit: 5, offset: 10 });
   * // parameters
   * //limit:number //Sets a total of items to return
   * //offset:number //Sets a beginning range of items to return
   * //order:"next_action" | "opportunity_name" | "contact_name" | "date_created", //Attribute to order items by
   * //search_term:string //Returns opportunities that match any of the contact's given_name, family_name, company_name, and email_addresses (searches EMAIL1 only) fields as well as opportunity_title
   * //stage_id:number <int64> //Returns opportunities for the provided stage id
   * //user_id:number <int64> //Returns opportunities for the provided user id
   * console.log(opportunities);
   * @returns The list of opportunities if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async getOpportunities(parameters?: {
    limit: number;
    offset: number;
    order: "next_action" | "opportunity_name" | "contact_name" | "date_created";
    search_term: string;
    stage_id: number;
    user_id: number;
  }): Promise<OpportunitiesWithPagination | undefined> {
    let queryParams;
    if (parameters) {
      queryParams = createParams(parameters, [
        "user_id",
        "stage_id",
        "limit",
        "offset",
        "order",
        "search_term",
      ]);
    }
    const r = await this.api.get(`v1/opportinities?${queryParams}`);

    // Add this line to assert that r is an object with a 'opportunities' property
    const rObj = r as { opportunities: IOpportunity[] | null };

    if (!rObj || !Object.prototype.hasOwnProperty.call(rObj, "opportunities")) {
      return undefined;
    }

    if (rObj.opportunities === null) {
      throw new Error("No opportunities found");
    }

    const opportunities = rObj.opportunities.map((opp: IOpportunity) => {
      if (opp === null) {
        throw new Error("Opportunities is null");
      }
      return new Opportunity(this, opp);
    });

    return {
      ...r,
      opportunities,
    };
  }

  /**
   * Creates a new opportunity.
   * @param data - The data to create the opportunity with.
   * @returns The newly created opportunity if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   * @example
   * const opportunity = await opportunities.createOpportunity({
   *    contact_id: 1,
   *    opportunity_title: "New Opportunity",
   *    stage_id: 1
   * });
   * console.log(opportunity);
   */
  async createOpportunity(
    data: IOpportunity
  ): Promise<Opportunity | undefined> {
    const r = await this.api.post("v1/opportunities", data);
    if (!r) return undefined;
    return new Opportunity(this, r as IOpportunity);
  }

  /**
   * Replaces an existing opportunity.
   * @param data - The data to replace the opportunity with.
   * @returns The replaced opportunity if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async replaceOpportunity(
    data: IOpportunity
  ): Promise<Opportunity | undefined> {
    const r = await this.api.put(`v1/opportunities/${data.id}`, data);
    if (!r) return undefined;
    return new Opportunity(this, r as IOpportunity);
  }

  /**
   * Retrieves an opportunity by ID.
   * @param id - The ID of the opportunity to fetch.
   * @returns The opportunity if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async getOpportunity(id: number): Promise<Opportunity | undefined> {
    const r = await this.api.get(`v1/opportunities/${id}`);
    if (!r) return undefined;
    return new Opportunity(this, r as IOpportunity);
  }

  /**
   * Deletes an opportunity by ID.
   * @param id - The ID of the opportunity to delete.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async deleteOpportunity(id: number): Promise<boolean | undefined> {
    const r = await this.api.delete(`v1/opportunities/${id}`);
    if (!r) return undefined;
    return true;
  }

  /**
   * Updates an existing opportunity.
   * @param data - The data to update the opportunity with.
   * @returns The updated opportunity if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails.
   */
  async updateOpportunity(
    data: IOpportunity
  ): Promise<Opportunity | undefined> {
    const r = await this.api.patch(`v1/opportunities/${data.id}`, data);
    if (!r) return undefined;
    return new Opportunity(this, r as IOpportunity);
  }
}

class Opportunity {
  affiliate_id?: number;
  contact: ReferenceContact;
  custom_fields?: Array<{
    content: object;
    id: number;
  }>;
  date_created?: string;
  estimated_close_date?: string;
  id?: number;
  include_in_forecast?: number;
  last_updated?: string;
  next_action_date?: string;
  next_action_notes?: string;
  opportunity_notes?: string;
  opportunity_title: string;
  projected_revenue_high?: number;
  projected_revenue_low?: number;
  stage: OpportunityStage;
  user?: {
    first_name: string;
    id: number;
    last_name: string;
  };
  private opportunities: Opportunities;

  /**
   * Creates a new Opportunity instance from the given data and Opportunities model.
   * @param opps - The Opportunities model to use for making requests.
   * @param data - The data to use to populate the Opportunity instance.
   * @throws Will throw an error if any of the required fields are missing.
   */
  constructor(opps: Opportunities, data: IOpportunity) {
    if (!data.contact || !data.stage || !data.opportunity_title) {
      throw new Error("Invalid data");
    }
    this.opportunities = opps;
    this.contact = data.contact;
    this.opportunity_title = data.opportunity_title;
    this.stage = data.stage;
    Object.assign(this, data);
  }

  /**
   * Deletes this opportunity.
   * @returns The result of the API call if it was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails or if this opportunity does not have an ID.
   */
  async delete(): Promise<boolean | undefined> {
    if (!this.id) throw new Error("Invalid ID");
    const r = await this.opportunities.deleteOpportunity(this.id);
    if (!r) return undefined;
    return true;
  }

  /**
   * Updates this opportunity.
   * @param data - The data to update this opportunity with.
   * @returns The updated opportunity if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails or if this opportunity does not have an ID.
   */
  async update(data: IOpportunity): Promise<Opportunity | undefined> {
    if (!this.id) throw new Error("Invalid ID");
    const r = await this.opportunities.updateOpportunity(data);
    if (!r) return undefined;
    return new Opportunity(this.opportunities, r);
  }

  /**
   * Refreshes the opportunity data from the API.
   * @returns The updated opportunity if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails or if this opportunity does not have an ID.
   */
  async refresh(): Promise<Opportunity | undefined> {
    if (!this.id) throw new Error("Invalid ID");
    const r = await this.opportunities.getOpportunity(this.id);
    if (!r) return undefined;
    return new Opportunity(this.opportunities, r);
  }

  /**
   * Replaces this opportunity.
   * @param data - The data to replace this opportunity with.
   * @returns The replaced opportunity if the API call was successful, undefined otherwise.
   * @throws Will throw an error if the API call fails or if this opportunity does not have an ID.
   */
  async replace(data: IOpportunity): Promise<Opportunity | undefined> {
    if (!this.id) throw new Error("Invalid ID");
    const r = await this.opportunities.replaceOpportunity(data);
    if (!r) return undefined;
    return new Opportunity(this.opportunities, r);
  }
}
