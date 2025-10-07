import { Api } from "../utils/api";
import { Paginator } from "../utils/paginator";
import { createParams } from "../utils/queryParams";

export class Tags {
	private api: Api;

	/**
	 * Creates a new Tags model.
	 * @param api - The API client to use for making requests.
	 */
	constructor(api: Api) {
		this.api = api;
	}

	/**
	 * Fetches all tags with optional filtering.
	 * @param options - Optional parameters for filtering tags.
	 * @returns A paginator containing the list of tags.
	 * @example
	 * const tags = await tagsInstance.listTags({ limit: 10, name: "important" });
	 */
	async listTags(options?: {
		limit?: number;
		offset?: number;
		name?: string;
		category?: string;
	}): Promise<Paginator<ITag>> {
		const params = options
			? createParams(options, ["limit", "offset", "name", "category"])
			: "";
		const response = await this.api.get(`v1/tags?${params?.toString()}`);
		return Paginator.wrap(this.api, response, "tags");
	}

	/**
	 * Creates a new tag.
	 * @param tag - The tag data to create.
	 * @returns The newly created tag.
	 * @example
	 * const newTag = await tagsInstance.createTag({ name: "VIP Customer" });
	 */
	async createTag(tag: ITag): Promise<ITag> {
		return (await this.api.post("v1/tags", tag)) as ITag;
	}

	/**
	 * Creates a new tag category.
	 * @param category - The tag category data to create.
	 * @returns The newly created tag category.
	 */
	async createTagCategory(category: TagCategory): Promise<TagCategory> {
		return (await this.api.post("v1/tag/categories", category)) as TagCategory;
	}

	/**
	 * Retrieves a specific tag by ID.
	 * @param id - The ID of the tag to retrieve.
	 * @returns The tag information.
	 * @example
	 * const tag = await tagsInstance.getTag(123);
	 */
	async getTag(id: number): Promise<ITag> {
		return (await this.api.get(`v1/tags/${id}`)) as ITag;
	}

	/**
	 * Lists companies that have been tagged with a specific tag.
	 * @param tagId - The ID of the tag.
	 * @param options - Optional pagination parameters.
	 * @returns A paginator containing the list of tagged companies.
	 */
	async listTaggedCompanies(
		tagId: number,
		options?: { limit?: number; offset?: number }
	): Promise<Paginator<TaggedCompany>> {
		const params = options ? createParams(options, ["limit", "offset"]) : "";
		const response = await this.api.get(
			`v1/tags/${tagId}/companies?${params?.toString()}`
		);
		return Paginator.wrap(this.api, response, "companies");
	}

	/**
	 * Lists contacts that have been tagged with a specific tag.
	 * @param tagId - The ID of the tag.
	 * @param options - Optional pagination parameters.
	 * @returns A paginator containing the list of tagged contacts.
	 */
	async listTaggedContacts(
		tagId: number,
		options?: { limit?: number; offset?: number }
	): Promise<Paginator<TaggedContact>> {
		const params = options ? createParams(options, ["limit", "offset"]) : "";
		const response = await this.api.get(
			`v1/tags/${tagId}/contacts?${params?.toString()}`
		);
		return Paginator.wrap(this.api, response, "contacts");
	}

	/**
	 * Applies a tag to multiple contacts.
	 * @param tagId - The ID of the tag to apply.
	 * @param contactIds - Array of contact IDs to tag.
	 * @returns The response containing information about the applied tag.
	 * @example
	 * const result = await tagsInstance.applyToContact(123, [456, 789]);
	 */
	async applyToContact(
		tagId: number,
		contactIds: number[]
	): Promise<ApplyTagResponse> {
		if (!contactIds || contactIds.length === 0) {
			throw new Error("Contact IDs array cannot be empty");
		}
		return (await this.api.post(`v1/tags/${tagId}/contacts`, {
			ids: contactIds,
		})) as ApplyTagResponse;
	}

	/**
	 * Removes a tag from multiple contacts.
	 * @param tagId - The ID of the tag to remove.
	 * @param contactIds - Array of contact IDs to remove the tag from.
	 */
	async removeTagFromContacts(
		tagId: number,
		contactIds: number[]
	): Promise<void> {
		if (!contactIds || contactIds.length === 0) {
			throw new Error("Contact IDs array cannot be empty");
		}
		await this.api.delete(`v1/tags/${tagId}/contacts`, { ids: contactIds });
	}

	/**
	 * Removes a tag from a single contact.
	 * @param tagId - The ID of the tag to remove.
	 * @param contactId - The ID of the contact to remove the tag from.
	 */
	async removeTagFromContact(tagId: number, contactId: number): Promise<void> {
		await this.api.delete(`v1/tags/${tagId}/contacts/${contactId}`);
	}
}
