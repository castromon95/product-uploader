import { Fetcher } from "swr";
import { HTTPMethod } from "../enums/common";

type FetcherProps<B = unknown> = {
  method?: HTTPMethod;
  body?: B;
  formData?: boolean;
};

const fetcher = <T = unknown, B = BodyInit>({
  method,
  body,
  formData,
}: FetcherProps<B> = {}): Fetcher<T, string> => {
  return (endpoint: string) => {
    return fetch(
      `${process.env.BACKEND_URL || "http://localhost:3000"}${endpoint}`,
      {
        method: method || HTTPMethod.GET,
        headers: formData ? {} : { "Content-Type": "application/json" },
        body: method === HTTPMethod.POST && body ? body : undefined,
      }
    ).then((res) => {
      if (res.status >= 400) {
        throw Error(`Simple request error ${res.status}`);
      }

      return !formData ? res.json() : null;
    });
  };
};

export { fetcher };
