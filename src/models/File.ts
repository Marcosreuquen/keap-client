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
	 * @returns A paginator containing the list of files.
	 * @example
	 * const files = await filesInstance.listFiles({
	 *   contact_id: 123,
	 *   viewable: "PUBLIC"
	 * });
	 */
	async listFiles(options?: {
		contact_id?: number;
		name?: string;
		permission?: FileAssociation;
		type?: FileBoxType | FileCategory;
		viewable?: "PUBLIC" | "PRIVATE" | "BOTH";
		limit?: number;
		offset?: number;
	}): Promise<Paginator<File>> {
		const params = options
			? createParams(options, [
					"contact_id",
					"name",
					"permission",
					"type",
					"viewable",
					"limit",
					"offset",
			  ]).toString()
			: "";
		const response = await this.api.get(`v1/files?${params}`);
		return Paginator.wrap(this.api, response, "files");
	}

	/**
	 * Uploads a new file.
	 * @param file - The file upload request data.
	 * @returns The uploaded file response.
	 * @example
	 * const uploadedFile = await filesInstance.uploadFile({
	 *   file_data: base64Data,
	 *   file_name: "document.pdf",
	 *   contact_id: 123
	 * });
	 */
	async uploadFile(file: FileUploadRequest): Promise<FileResponse> {
		const response = await this.api.post("v1/files", file);
		return response as FileResponse;
	}

	/**
	 * Retrieves a file by ID.
	 * @param id - The ID of the file to retrieve.
	 * @returns The file response.
	 * @example
	 * const file = await filesInstance.getFile(123);
	 */
	async getFile(id: number): Promise<FileResponse> {
		const response = await this.api.get(`v1/files/${id}`);
		return response as FileResponse;
	}

	/**
	 * Replaces an existing file by ID.
	 * @param id - The ID of the file to replace.
	 * @param file - The file upload request data.
	 * @returns The replaced file response.
	 * @example
	 * const replacedFile = await filesInstance.replaceFile(123, {
	 *   file_data: newBase64Data,
	 *   file_name: "updated_document.pdf"
	 * });
	 */
	async replaceFile(
		id: number,
		file: FileUploadRequest
	): Promise<FileResponse> {
		const response = await this.api.put(`v1/files/${id}`, file);
		return response as FileResponse;
	}

	/**
	 * Deletes a file by ID.
	 * @param id - The ID of the file to delete.
	 * @returns True if the file was successfully deleted.
	 * @example
	 * const deleted = await filesInstance.deleteFile(123);
	 * if (deleted) console.log("File deleted successfully");
	 */
	async deleteFile(id: number): Promise<boolean> {
		await this.api.delete(`v1/files/${id}`);
		return true;
	}
}
