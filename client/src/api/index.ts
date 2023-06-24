import { ApiService, WebrpcError, type Fetch } from "./api.gen";

const hostname = "http://localhost:8080";
const fetcher: Fetch = (input, init) => {
  return fetch(input, init);
};
export const api = new ApiService(hostname, fetcher);

async function safeFetch<T>(
  fetchMethod: () => Promise<T>
): Promise<Result<T, WebrpcError>> {
  try {
    return { data: await fetchMethod() };
  } catch (e) {
    if (e instanceof WebrpcError) {
      const { message, name, cause, status, code } = e;
      console.log(message, name, cause, status, code);
      const err = { error: e, cause: cause ? cause : message };
      return err;
    } else {
      console.error(e);
    }
  }
}

export type Result<T, E extends Error> = Ok<T> | Err<E>;
export type Ok<T> = { data: T };
export type Err<E> = { error: E; cause: string };
