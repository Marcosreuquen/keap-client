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
   * Fetches all tags.
   * @returns The tags if the API call was successful, undefined otherwise.
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
    const r = await this.api.get(`v1/tags?${params?.toString()}`);
    return Paginator.wrap(this.api, r, "tags");
  }

  async createTag(tag: ITag): Promise<ITag> {
    return (await this.api.post("v1/tags", tag)) as ITag;
  }

  async createTagCategory(category: TagCategory): Promise<TagCategory> {
    return (await this.api.post("v1/tag/categories", category)) as TagCategory;
  }

  async getTag(id: number): Promise<ITag> {
    return (await this.api.get(`v1/tags/${id}`)) as ITag;
  }

  async listTaggedCompanies(
    tagId: number,
    options?: { limit?: number; offset?: number }
  ): Promise<Paginator<TaggedCompany>> {
    const params = options ? createParams(options, ["limit", "offset"]) : "";
    const r = await this.api.get(
      `v1/tags/${tagId}/companies?${params?.toString()}`
    );
    return Paginator.wrap(this.api, r, "companies");
  }

  async listTaggedContacts(
    tagId: number,
    options?: { limit?: number; offset?: number }
  ): Promise<Paginator<TaggedContact>> {
    const params = options ? createParams(options, ["limit", "offset"]) : "";
    const r = await this.api.get(
      `v1/tags/${tagId}/contacts?${params?.toString()}`
    );
    return Paginator.wrap(this.api, r, "contacts");
  }

  async applyToContact(
    tagId: number,
    contactIds: number[]
  ): Promise<ApplyTagResponse> {
    return (await this.api.post(`v1/tags/${tagId}/contacts`, {
      ids: contactIds,
    })) as ApplyTagResponse;
  }

  async removeTagFromContacts(
    tagId: number,
    contactIds: number[]
  ): Promise<void> {
    await this.api.delete(`v1/tags/${tagId}/contacts`, { ids: contactIds });
  }

  async removeTagFromContact(tagId: number, contactId: number): Promise<void> {
    await this.api.delete(`v1/tags/${tagId}/contacts/${contactId}`);
  }
}
