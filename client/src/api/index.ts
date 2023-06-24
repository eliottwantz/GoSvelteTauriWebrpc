import { ApiService, type Fetch } from "./api.gen";

const hostname = "http://localhost:8080";
const fetcher: Fetch = (input, init) => {
  return fetch(input, init);
};
export const api = new ApiService(hostname, fetcher);
