import { Result, fromPromise } from "neverthrow";
import { ApiService, WebrpcError, type Fetch } from "./api.gen";

const hostname = import.meta.env.VITE_API_URL;
const fetcher: Fetch = (input, init) => {
  return fetch(input, init);
};
export const api = new ApiService(hostname, fetcher);

export async function safeFetch<T>(
  fetchMethod: () => Promise<T>
): Promise<Result<T, FetchError>> {
  return fromPromise(fetchMethod(), (e) => {
    const error = e as WebrpcError;
    let { message, cause, status } = error;
    if (!cause) cause = message;
    return { error, cause: status !== 500 ? cause : message };
  });
}
type FetchError = { error: WebrpcError; cause: string };
