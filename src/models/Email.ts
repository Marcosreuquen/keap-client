import { Api } from "../utils/api";
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
   * @returns A promise that resolves to a list of emails with pagination.
   */
  async listEmails(options?: {
    email?: string;
    contact_id?: number;
    ordered?: boolean;
    since_sent_date?: string;
    until_sent_date?: string;
    limit?: number;
    offset?: number;
  }): Promise<EmailsWithPagination | undefined> {
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
      : undefined;
    const r = await this.api.get(`v1/emails?${params?.toString()}`);
    if (!r) return undefined;
    return r as EmailsWithPagination;
  }

  /**
   * Creates a new email record.
   * @param emailData - The email data to create.
   * @returns A promise that resolves to the created email record.
   */
  async createEmail(emailData: EmailRecord): Promise<EmailRecord | undefined> {
    return (await this.api.post(
      `v1/emails`,
      emailData
    )) as Promise<EmailRecord>;
  }

  /**
   * Sends an email.
   * @param request - The email send request data.
   * @returns A promise that resolves to the send email request.
   */
  async sendEmail(
    request: SendEmailRequest
  ): Promise<SendEmailRequest | undefined> {
    return (await this.api.post(
      `v1/emails/queue`,
      request
    )) as Promise<SendEmailRequest>;
  }

  /**
   * Creates a set of email records.
   * @param emails - The email records to create.
   * @returns A promise that resolves to the created email records.
   */
  async createASet(
    emails: EmailRecord[]
  ): Promise<{ emails: EmailRecord[] } | undefined> {
    return (await this.api.post(`v1/emails/sync`, emails)) as Promise<{
      emails: EmailRecord[];
    }>;
  }

  /**
   * Retrieves an email record by ID.
   * @param id - The ID of the email record to retrieve.
   * @returns A promise that resolves to the email record.
   */
  async get(id: number): Promise<EmailRecord | undefined> {
    return (await this.api.get(`v1/emails/${id}`)) as Promise<EmailRecord>;
  }

  /**
   * Deletes an email record by ID.
   * @param id - The ID of the email record to delete.
   * @returns A promise that resolves to true if the email was deleted, otherwise undefined.
   */
  async delete(id: number): Promise<boolean | undefined> {
    const r = await this.api.delete(`v1/emails/${id}`);
    if (!r) return undefined;
    return true;
  }
}
