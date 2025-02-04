import { Files } from "../../src/models/File";
import { Api } from "../../src/utils/api";

jest.mock("../../src/utils/api");

describe("Files", () => {
  let api: Api;
  let files: Files;
  let fileMock: IFile;
  let fileUploadRequestMock: FileUploadRequest;
  let fileResponseMock: FileResponse;

  beforeEach(() => {
    api = new Api("valid-api-key");
    files = new Files(api);
    fileMock = {
      contact_id: 1,
      file_name: "testFile",
      file_size: 100,
      id: 1,
      public: true,
      last_updated: "2021-01-01T00:00:00.000Z",
    };
    fileUploadRequestMock = {
      file_name: "testFile",
      file_data: "testData",
      is_public: true,
      file_association: "USER" as const,
    };
    fileResponseMock = {
      file_data: "testData",
      file_descriptor: fileMock,
    };
  });

  describe("listFiles", () => {
    it("should list files with given options", async () => {
      const mockResponse = {
        count: 1,
        files: [fileMock],
        next: "http://example.com/next",
        previous: "http://example.com/previous",
      };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const options = { contact_id: 1, name: "testFile" };
      const result = await files.listFiles(options);

      expect(api.get).toHaveBeenCalledWith(
        "v1/files?contact_id=1&name=testFile"
      );
      expect(result?.getItems()).toEqual(mockResponse.files);
      expect(result?.getItems()[0]).toEqual(fileMock);
      expect(result?.getCount()).toEqual(mockResponse.count);
    });

    it("should return undefined if API call fails", async () => {
      (api.get as jest.Mock).mockResolvedValue(undefined);

      const result = await files.listFiles();

      expect(result).toBeUndefined();
    });
  });

  describe("uploadFile", () => {
    it("should upload a file", async () => {
      (api.post as jest.Mock).mockResolvedValue(fileResponseMock);

      const result = await files.uploadFile(fileUploadRequestMock);

      expect(api.post).toHaveBeenCalledWith("v1/files", fileUploadRequestMock);
      expect(result).toEqual(fileResponseMock);
    });

    it("should return undefined if API call fails", async () => {
      (api.post as jest.Mock).mockResolvedValue(undefined);

      const result = await files.uploadFile(fileUploadRequestMock);

      expect(result).toBeUndefined();
    });
  });

  describe("getFile", () => {
    it("should retrieve a file by ID", async () => {
      (api.get as jest.Mock).mockResolvedValue(fileResponseMock);

      const result = await files.getFile(1);

      expect(api.get).toHaveBeenCalledWith("v1/files/1");
      expect(result).toEqual(fileResponseMock);
    });

    it("should return undefined if API call fails", async () => {
      (api.get as jest.Mock).mockResolvedValue(undefined);

      const result = await files.getFile(1);

      expect(result).toBeUndefined();
    });
  });

  describe("replaceFile", () => {
    it("should replace a file by ID", async () => {
      (api.put as jest.Mock).mockResolvedValue(fileResponseMock);

      const result = await files.replaceFile(1, fileUploadRequestMock);

      expect(api.put).toHaveBeenCalledWith("v1/files/1", fileUploadRequestMock);
      expect(result).toEqual(fileResponseMock);
    });

    it("should return undefined if API call fails", async () => {
      (api.put as jest.Mock).mockResolvedValue(undefined);

      const result = await files.replaceFile(1, fileUploadRequestMock);

      expect(result).toBeUndefined();
    });
  });

  describe("deleteFile", () => {
    it("should delete a file by ID", async () => {
      (api.delete as jest.Mock).mockResolvedValue(true);

      const result = await files.deleteFile(1);

      expect(api.delete).toHaveBeenCalledWith("v1/files/1");
      expect(result).toBe(true);
    });

    it("should return undefined if API call fails", async () => {
      (api.delete as jest.Mock).mockResolvedValue(undefined);

      const result = await files.deleteFile(1);

      expect(result).toBeUndefined();
    });
  });
});
