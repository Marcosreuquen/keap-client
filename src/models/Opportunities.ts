import { Api } from "../utils/api";
import { Paginator } from "../utils/paginator";
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
	 * Fetches a list of opportunities with optional filtering.
	 * @param parameters - Options for fetching opportunities, like page size and page number.
	 * @param parameters.limit - Sets a total of items to return
	 * @param parameters.offset - Sets a beginning range of items to return
	 * @param parameters.order - Attribute to order items by
	 * @param parameters.search_term - Returns opportunities that match contact or opportunity fields
	 * @param parameters.stage_id - Returns opportunities for the provided stage id
	 * @param parameters.user_id - Returns opportunities for the provided user id
	 * @example
	 * const opportunities = await opportunitiesInstance.getOpportunities({
	 *   limit: 5,
	 *   offset: 10,
	 *   order: "date_created"
	 * });
	 * @returns A paginator containing the list of opportunities.
	 */
	async getOpportunities(parameters?: {
		limit?: number;
		offset?: number;
		order?:
			| "next_action"
			| "opportunity_name"
			| "contact_name"
			| "date_created";
		search_term?: string;
		stage_id?: number;
		user_id?: number;
	}): Promise<Paginator<IOpportunity>> {
		let queryParams = "";
		if (parameters) {
			queryParams = createParams(parameters, [
				"user_id",
				"stage_id",
				"limit",
				"offset",
				"order",
				"search_term",
			]).toString();
		}
		const response = await this.api.get(`v1/opportunities?${queryParams}`);

		const responseObj = response as { opportunities: IOpportunity[] | null };

		if (
			!responseObj ||
			!Object.prototype.hasOwnProperty.call(responseObj, "opportunities")
		) {
			throw new Error(
				"Invalid response format: missing opportunities property"
			);
		}

		if (responseObj.opportunities === null) {
			throw new Error("No opportunities found");
		}

		const opportunities = responseObj.opportunities.map((opp: IOpportunity) => {
			if (opp === null) {
				throw new Error("Opportunity data is null");
			}
			return new Opportunity(this, opp);
		});

		return Paginator.wrap(
			this.api,
			{
				...response,
				opportunities,
			},
			"opportunities"
		);
	}

	/**
	 * Creates a new opportunity.
	 * @param data - The data to create the opportunity with.
	 * @returns The newly created opportunity.
	 * @example
	 * const opportunity = await opportunitiesInstance.createOpportunity({
	 *    contact_id: 1,
	 *    opportunity_title: "New Opportunity",
	 *    stage_id: 1
	 * });
	 */
	async createOpportunity(data: IOpportunity): Promise<Opportunity> {
		const response = await this.api.post("v1/opportunities", data);
		return new Opportunity(this, response as IOpportunity);
	}

	/**
	 * Replaces an existing opportunity.
	 * @param data - The data to replace the opportunity with.
	 * @returns The replaced opportunity.
	 * @example
	 * const updatedOpportunity = await opportunitiesInstance.replaceOpportunity({
	 *   id: 123,
	 *   opportunity_title: "Updated Title",
	 *   stage_id: 2
	 * });
	 */
	async replaceOpportunity(data: IOpportunity): Promise<Opportunity> {
		if (!data.id) {
			throw new Error("Opportunity ID is required for replacement");
		}
		const response = await this.api.put(`v1/opportunities/${data.id}`, data);
		return new Opportunity(this, response as IOpportunity);
	}

	/**
	 * Retrieves an opportunity by ID.
	 * @param id - The ID of the opportunity to fetch.
	 * @returns The opportunity.
	 * @example
	 * const opportunity = await opportunitiesInstance.getOpportunity(123);
	 */
	async getOpportunity(id: number): Promise<Opportunity> {
		const response = await this.api.get(`v1/opportunities/${id}`);
		return new Opportunity(this, response as IOpportunity);
	}

	/**
	 * Deletes an opportunity by ID.
	 * @param id - The ID of the opportunity to delete.
	 * @returns True if the opportunity was successfully deleted.
	 * @example
	 * const deleted = await opportunitiesInstance.deleteOpportunity(123);
	 * if (deleted) console.log("Opportunity deleted successfully");
	 */
	async deleteOpportunity(id: number): Promise<boolean> {
		await this.api.delete(`v1/opportunities/${id}`);
		return true;
	}

	/**
	 * Updates an existing opportunity.
	 * @param data - The data to update the opportunity with.
	 * @returns The updated opportunity.
	 * @example
	 * const updatedOpportunity = await opportunitiesInstance.updateOpportunity({
	 *   id: 123,
	 *   opportunity_title: "Updated Title"
	 * });
	 */
	async updateOpportunity(data: IOpportunity): Promise<Opportunity> {
		if (!data.id) {
			throw new Error("Opportunity ID is required for update");
		}
		const response = await this.api.patch(`v1/opportunities/${data.id}`, data);
		return new Opportunity(this, response as IOpportunity);
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
