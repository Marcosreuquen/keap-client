import { Emails } from "../../src/models/Email";
import { Api } from "../../src/utils/api";

jest.mock("../../src/utils/api");

describe("Email", () => {
  let api: Api;
  let emails: Emails;
  let emailMock: EmailRecord;
  let emailReqMock: SendEmailRequest;

  beforeEach(() => {
    api = new Api("valid-api-key");
    emails = new Emails(api);
    emailReqMock = { subject: "Test", user_id: 1, contacts: [1] };
    emailMock = {
      sent_to_address: "test@example.com",
      subject: "Test",
      contact_id: 1,
    };
  });

  describe("listEmails", () => {
    it("should fetch email addresses associated with a contact", async () => {
      const mockResponse = {
        emails: [emailMock],
        count: 1,
        next: "",
        previous: "",
      };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await emails.listEmails({ contact_id: 1 });

      expect(api.get).toHaveBeenCalledWith("v1/emails?contact_id=1");
      expect(result).toBeDefined();
      expect(result).toEqual(mockResponse);
      expect(result?.emails).toBeDefined();
      expect(result?.count).toEqual(1);
      expect(result?.emails[0]).toEqual(emailMock);
      expect(result?.emails[0]?.contact_id).toEqual(1);
    });

    it("should return undefined if API call fails", async () => {
      (api.get as jest.Mock).mockResolvedValue(undefined);

      const result = await emails.listEmails({ contact_id: 1 });

      expect(result).toBeUndefined();
    });
  });

  describe("createEmail", () => {
    it("should create a new email", async () => {
      const emailData = Object.assign({}, emailMock);
      delete emailData.contact_id;
      (api.post as jest.Mock).mockResolvedValue(emailMock);

      const result = await emails.createEmail(emailData);

      expect(api.post).toHaveBeenCalledWith("v1/emails", emailData);
      expect(result).toEqual(emailMock);
    });
  });

  describe("sendEmail", () => {
    it("should send an email", async () => {
      (api.post as jest.Mock).mockResolvedValue(emailReqMock);

      const result = await emails.sendEmail(emailReqMock);

      expect(api.post).toHaveBeenCalledWith("v1/emails/queue", emailReqMock);
      expect(result).toEqual(emailReqMock);
    });
  });

  describe("createASet", () => {
    it("should create a set of emails", async () => {
      const emailsList = [emailMock, { ...emailMock, contact_id: 2 }];
      const mockResponse = { emails: emailsList };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await emails.createASet(emailsList);

      expect(api.post).toHaveBeenCalledWith("v1/emails/sync", emailsList);
      expect(result).toEqual(mockResponse);
      expect(result?.emails).toEqual(emailsList);
      expect(result?.emails[0]).toEqual(emailMock);
      expect(result?.emails[1]).toEqual({ ...emailMock, contact_id: 2 });
      expect(result?.emails[0]?.contact_id).toEqual(1);
    });
  });

  describe("get", () => {
    it("should get an email by id", async () => {
      (api.get as jest.Mock).mockResolvedValue(emailMock);

      const result = await emails.get(1);

      expect(api.get).toHaveBeenCalledWith("v1/emails/1");
      expect(result).toEqual(emailMock);
      expect(result?.contact_id).toEqual(1);
    });
  });

  describe("delete", () => {
    it("should delete an email by id", async () => {
      (api.delete as jest.Mock).mockResolvedValue(true);

      const result = await emails.delete(1);

      expect(api.delete).toHaveBeenCalledWith("v1/emails/1");
      expect(result).toBe(true);
    });

    it("should return undefined if API call fails", async () => {
      (api.delete as jest.Mock).mockResolvedValue(undefined);

      const result = await emails.delete(1);

      expect(result).toBeUndefined();
    });
  });
});
