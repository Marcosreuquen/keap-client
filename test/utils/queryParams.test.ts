import { createParams } from "../../src/utils/queryParams";

describe("createParams", () => {
  it("should create params with valid options and no keysToValidate", () => {
    const options = { foo: "bar", baz: "qux" };
    const params = createParams(options);
    expect(params.toString()).toBe("foo=bar&baz=qux");
  });

  it("should create params with valid options and keysToValidate", () => {
    const options = { foo: "bar", baz: "qux" };
    const keysToValidate = ["foo"];
    const params = createParams(options, keysToValidate);
    expect(params.toString()).toBe("foo=bar");
  });

  it("should ignore undefined values in options", () => {
    const options = { foo: "bar", baz: undefined };
    const params = createParams(options);
    expect(params.toString()).toBe("foo=bar");
  });

  it("should return empty params with empty options", () => {
    const options = {};
    const params = createParams(options);
    expect(params.toString()).toBe("");
  });
});
