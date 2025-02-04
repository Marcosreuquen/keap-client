import { Api } from "../utils/api";
import { Paginator } from "../utils/paginator";
import { createParams } from "../utils/queryParams";

export class Files {
  private api: Api;

  /**
   * Creates a new Files model.
   * @param api - The API client to use for making requests.
   */
  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Lists files with optional filtering options.
   * @param options - The filtering options.
   * @returns A promise that resolves to a list of files with pagination.
   */
  async listFiles(options?: {
    contact_id?: number;
    name?: string;
    permission?: FileAssociation;
    type?: FileBoxType | FileCategory;
    viewable?: "PUBLIC" | "PRIVATE" | "BOTH";
    limit?: number;
    offset?: number;
  }): Promise<Paginator<File> | undefined> {
    const params = options
      ? createParams(options, [
          "contact_id",
          "name",
          "permission",
          "type",
          "viewable",
          "limit",
          "offset",
        ])
      : "";
    const r = await this.api.get(`v1/files?${params?.toString()}`);
    if (!r) return undefined;
    return Paginator.wrap(this.api, r, "files");
  }

  /**
   * Uploads a new file.
   * @param file - The file upload request data.
   * @returns A promise that resolves to the uploaded file response.
   */
  async uploadFile(file: FileUploadRequest): Promise<FileResponse | undefined> {
    const r = await this.api.post("v1/files", file);
    if (!r) return undefined;
    return r as FileResponse;
  }

  /**
   * Retrieves a file by ID.
   * @param id - The ID of the file to retrieve.
   * @returns A promise that resolves to the file response.
   */
  async getFile(id: number): Promise<FileResponse | undefined> {
    const r = await this.api.get(`v1/files/${id}`);
    if (!r) return undefined;
    return r as FileResponse;
  }

  /**
   * Replaces an existing file by ID.
   * @param id - The ID of the file to replace.
   * @param file - The file upload request data.
   * @returns A promise that resolves to the replaced file response.
   */
  async replaceFile(
    id: number,
    file: FileUploadRequest
  ): Promise<FileResponse | undefined> {
    const r = await this.api.put(`v1/files/${id}`, file);
    if (!r) return undefined;
    return r as FileResponse;
  }

  /**
   * Deletes a file by ID.
   * @param id - The ID of the file to delete.
   * @returns A promise that resolves to true if the file was deleted, otherwise undefined.
   */
  async deleteFile(id: number): Promise<boolean | undefined> {
    const r = await this.api.delete(`v1/files/${id}`);
    if (!r) return undefined;
    return true;
  }
}
