import { URLSearchParams } from "url";

export function createParams(options: object, keysToValidate?: string[]) {
  const params: URLSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(options)) {
    if (
      value !== undefined &&
      (keysToValidate ? keysToValidate.includes(key) : true)
    ) {
      params.append(key, value.toString());
    }
  }

  return params;
}
