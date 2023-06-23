import { ExampleService, type Fetch } from "./example.gen";

const hostname = "http://localhost:8080";
const fetcher: Fetch = (input, init) => {
  return fetch(input, init);
};
export const api = new ExampleService(hostname, fetcher);
