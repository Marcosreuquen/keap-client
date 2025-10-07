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
    it("should call api.get with correct parameters", async () => {
      const mockResponse = {
        users: [mockUser],
        count: 1,
        next: "http://example.com/next",
        previous: "http://example.com/previous",
      };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const options = { include_inactive: true, limit: 10, offset: 0 };
      const result = await users.listUsers(options);

      expect(api.get).toHaveBeenCalledWith(
        "v1/users?include_inactive=true&limit=10&offset=0"
      );
      expect(result?.getItems()).toBe(mockResponse.users);
      expect(result?.getCount()).toBe(mockResponse.count);
    });

    it("should throw an error if api.get fails", async () => {
			(api.get as jest.Mock).mockRejectedValue(new Error("API Error"));

			await expect(users.listUsers()).rejects.toThrow("API Error");
		});
  });

  describe("createUser", () => {
    it("should call api.post with correct parameters", async () => {
      (api.post as jest.Mock).mockResolvedValue(mockUser);
      const result = await users.createUser(mockUserCreateRequest);

      expect(api.post).toHaveBeenCalledWith("v1/users", mockUserCreateRequest);
      expect(result).toBe(mockUser);
    });

    it("should throw an error if api.post fails", async () => {
			(api.post as jest.Mock).mockRejectedValue(new Error("API Error"));

			await expect(users.createUser(mockUserCreateRequest)).rejects.toThrow(
				"API Error"
			);
		});
  });
});
