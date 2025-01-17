import { Api } from "../../src/utils/api";
import { Users } from "../../src/models/User";

jest.mock("../../src/utils/api");

describe("Users", () => {
  let api: Api;
  let users: Users;
  let mockUser: IUser;
  let mockUserCreateRequest: UserCreateRequest;

  beforeEach(() => {
    api = new Api("valid-api-key");
    users = new Users(api);
    mockUser = {
      id: 1,
      company_name: "Test Company",
      given_name: "John",
      family_name: "Doe",
      email_address: "8tE0I@example.com",
      partner: true,
    };
    mockUserCreateRequest = {
      partner: true,
      email: "8tE0I@example.com",
      given_name: "John",
    };
  });

  it("should create a new Users instance", () => {
    expect(users).toBeInstanceOf(Users);
  });

  describe("listUsers", () => {
    it("should call api.makeApiCall with correct parameters", async () => {
      const mockResponse = {
        users: [mockUser],
        count: 1,
        next: "",
        previous: "",
      };
      (api.makeApiCall as jest.Mock).mockResolvedValue(mockResponse);

      const options = { include_inactive: true, limit: 10, offset: 0 };
      const result = await users.listUsers(options);

      expect(api.makeApiCall).toHaveBeenCalledWith(
        "get",
        "v1/users?include_inactive=true&limit=10&offset=0"
      );
      expect(result).toBe(mockResponse);
    });

    it("should return undefined if api.makeApiCall returns undefined", async () => {
      (api.makeApiCall as jest.Mock).mockResolvedValue(undefined);

      const result = await users.listUsers();

      expect(result).toBeUndefined();
    });
  });

  describe("createUser", () => {
    it("should call api.makeApiCall with correct parameters", async () => {
      (api.makeApiCall as jest.Mock).mockResolvedValue(mockUser);
      const result = await users.createUser(mockUserCreateRequest);

      expect(api.makeApiCall).toHaveBeenCalledWith(
        "post",
        "v1/users",
        mockUserCreateRequest
      );
      expect(result).toBe(mockUser);
    });

    it("should return undefined if api.makeApiCall returns undefined", async () => {
      (api.makeApiCall as jest.Mock).mockResolvedValue(undefined);

      const result = await users.createUser(mockUserCreateRequest);

      expect(result).toBeUndefined();
    });
  });
});
