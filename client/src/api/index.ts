import { ApiService, WebrpcError, type Fetch } from "./api.gen";

const hostname = "http://localhost:8080";
const fetcher: Fetch = (input, init) => {
  return fetch(input, init);
};
export const api = new ApiService(hostname, fetcher);

async function safeFetch<T>(
  fetchMethod: () => Promise<T>
): Promise<FetchResult<T>> {
  try {
    return { data: await fetchMethod() };
  } catch (e) {
    if (e instanceof WebrpcError) {
      const { message, name, cause, status, code } = e;
      console.log(message, name, cause, status, code);
      return { error: e, cause: cause ? cause : message };
    } else {
      console.error(e);
      throw e;
    }
  }
}

type FetchResult<T> = { data: T } | { error: WebrpcError; cause: string };
