import { Api } from "../utils/api";
import { Paginator } from "../utils/paginator";
import { createParams } from "../utils/queryParams";

export class Emails {
	private api: Api;

	/**
	 * Creates a new Email model.
	 * @param api - The API client to use for making requests.
	 */
	constructor(api: Api) {
		this.api = api;
	}

	/**
	 * Lists emails with optional filtering options.
	 * @param options - The filtering options.
	 * @returns A paginator containing the list of emails.
	 * @example
	 * const emails = await emailsInstance.listEmails({
	 *   contact_id: 123,
	 *   limit: 10,
	 *   since_sent_date: "2023-01-01T00:00:00Z"
	 * });
	 */
	async listEmails(options?: {
		email?: string;
		contact_id?: number;
		ordered?: boolean;
		since_sent_date?: string;
		until_sent_date?: string;
		limit?: number;
		offset?: number;
	}): Promise<Paginator<EmailRecord>> {
		const params = options
			? createParams(options, [
					"email",
					"contact_id",
					"ordered",
					"since_sent_date",
					"until_sent_date",
					"limit",
					"offset",
			  ])
			: "";
		const response = await this.api.get(`v1/emails?${params?.toString()}`);
		return Paginator.wrap(this.api, response, "emails");
	}

	/**
	 * Creates a new email record.
	 * @param emailData - The email data to create.
	 * @returns The created email record.
	 * @example
	 * const email = await emailsInstance.createEmail({
	 *   contact_id: 123,
	 *   subject: "Welcome!",
	 *   html_content: "<h1>Hello World</h1>"
	 * });
	 */
	async createEmail(emailData: EmailRecord): Promise<EmailRecord> {
		return (await this.api.post(`v1/emails`, emailData)) as EmailRecord;
	}

	/**
	 * Sends an email.
	 * @param request - The email send request data.
	 * @returns The send email request response.
	 * @example
	 * const result = await emailsInstance.sendEmail({
	 *   email_id: 123,
	 *   contact_id: 456
	 * });
	 */
	async sendEmail(request: SendEmailRequest): Promise<SendEmailRequest> {
		return (await this.api.post(
			`v1/emails/queue`,
			request
		)) as SendEmailRequest;
	}

	/**
	 * Creates a set of email records in batch.
	 * @param emails - The email records to create.
	 * @returns The batch creation response containing the created emails.
	 * @example
	 * const result = await emailsInstance.createASet([email1, email2, email3]);
	 */
	async createASet(emails: EmailRecord[]): Promise<{ emails: EmailRecord[] }> {
		if (!emails || emails.length === 0) {
			throw new Error("Emails array cannot be empty");
		}
		return (await this.api.post(`v1/emails/sync`, emails)) as {
			emails: EmailRecord[];
		};
	}

	/**
	 * Retrieves an email record by ID.
	 * @param id - The ID of the email record to retrieve.
	 * @returns The email record.
	 * @example
	 * const email = await emailsInstance.get(123);
	 */
	async get(id: number): Promise<EmailRecord> {
		return (await this.api.get(`v1/emails/${id}`)) as EmailRecord;
	}

	/**
	 * Deletes an email record by ID.
	 * @param id - The ID of the email record to delete.
	 * @returns True if the email was successfully deleted.
	 * @example
	 * const deleted = await emailsInstance.delete(123);
	 * if (deleted) console.log("Email deleted successfully");
	 */
	async delete(id: number): Promise<boolean> {
		await this.api.delete(`v1/emails/${id}`);
		return true;
	}
}
