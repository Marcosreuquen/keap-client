import { Tags } from "../../src/models/Tags";
import { Api } from "../../src/utils/api";
import { Paginator } from "../../src/utils/paginator";

jest.mock("../../src/utils/api");

describe("Tags", () => {
  let api: Api;
  let tags: Tags;

  beforeEach(() => {
    api = new Api("valid-api-key");
    tags = new Tags(api);
  });

  it("should fetch all tags", async () => {
    const mockResponse = { data: [{ id: 1, name: "Tag1" }] };
    api.get = jest.fn().mockResolvedValue(mockResponse);
    Paginator.wrap = jest.fn().mockReturnValue(mockResponse.data);

    const result = await tags.listTags({ limit: 10, offset: 0 });

    expect(api.get).toHaveBeenCalledWith("v1/tags?limit=10&offset=0");
    expect(Paginator.wrap).toHaveBeenCalledWith(api, mockResponse, "tags");
    expect(result).toEqual(mockResponse.data);
  });

  it("should create a new tag", async () => {
    const newTag = { id: 1, name: "New Tag" };
    api.post = jest.fn().mockResolvedValue(newTag);

    const result = await tags.createTag(newTag);

    expect(api.post).toHaveBeenCalledWith("v1/tags", newTag);
    expect(result).toEqual(newTag);
  });

  it("should create a new tag category", async () => {
    const newCategory = { id: 1, name: "New Category" };
    api.post = jest.fn().mockResolvedValue(newCategory);

    const result = await tags.createTagCategory(newCategory);

    expect(api.post).toHaveBeenCalledWith("v1/tag/categories", newCategory);
    expect(result).toEqual(newCategory);
  });

  it("should get a tag by id", async () => {
    const tag = { id: 1, name: "Tag1" };
    api.get = jest.fn().mockResolvedValue(tag);

    const result = await tags.getTag(1);

    expect(api.get).toHaveBeenCalledWith("v1/tags/1");
    expect(result).toEqual(tag);
  });

  it("should list tagged companies", async () => {
    const mockResponse = { data: [{ id: 1, name: "Company1" }] };
    api.get = jest.fn().mockResolvedValue(mockResponse);
    Paginator.wrap = jest.fn().mockReturnValue(mockResponse.data);

    const result = await tags.listTaggedCompanies(1, { limit: 10, offset: 0 });

    expect(api.get).toHaveBeenCalledWith(
      "v1/tags/1/companies?limit=10&offset=0"
    );
    expect(Paginator.wrap).toHaveBeenCalledWith(api, mockResponse, "companies");
    expect(result).toEqual(mockResponse.data);
  });

  it("should list tagged contacts", async () => {
    const mockResponse = { data: [{ id: 1, name: "Contact1" }] };
    api.get = jest.fn().mockResolvedValue(mockResponse);
    Paginator.wrap = jest.fn().mockReturnValue(mockResponse.data);

    const result = await tags.listTaggedContacts(1, { limit: 10, offset: 0 });

    expect(api.get).toHaveBeenCalledWith(
      "v1/tags/1/contacts?limit=10&offset=0"
    );
    expect(Paginator.wrap).toHaveBeenCalledWith(api, mockResponse, "contacts");
    expect(result).toEqual(mockResponse.data);
  });

  it("should apply tag to contact", async () => {
    const response = { success: true };
    api.post = jest.fn().mockResolvedValue(response);

    const result = await tags.applyToContact(1, [1, 2, 3]);

    expect(api.post).toHaveBeenCalledWith("v1/tags/1/contacts", {
      ids: [1, 2, 3],
    });
    expect(result).toEqual(response);
  });

  it("should remove tag from contacts", async () => {
    api.delete = jest.fn().mockResolvedValue(undefined);

    await tags.removeTagFromContacts(1, [1, 2, 3]);

    expect(api.delete).toHaveBeenCalledWith("v1/tags/1/contacts", {
      ids: [1, 2, 3],
    });
  });

  it("should remove tag from a contact", async () => {
    api.delete = jest.fn().mockResolvedValue(undefined);

    await tags.removeTagFromContact(1, 1);

    expect(api.delete).toHaveBeenCalledWith("v1/tags/1/contacts/1");
  });
});
