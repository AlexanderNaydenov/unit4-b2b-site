import { GraphQLClient } from "graphql-request";
import { DEFAULT_HYGRAPH_ENDPOINT } from "./constants";

export function getHygraphClient() {
  const endpoint =
    process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ?? DEFAULT_HYGRAPH_ENDPOINT;
  return new GraphQLClient(endpoint, {
    headers: {
      ...(process.env.HYGRAPH_API_TOKEN && {
        Authorization: `Bearer ${process.env.HYGRAPH_API_TOKEN}`,
      }),
    },
  });
}
