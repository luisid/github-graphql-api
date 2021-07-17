/* eslint-disable @typescript-eslint/no-unsafe-call */
import { GraphQLClient } from "graphql-request";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const graphqlClient = new GraphQLClient(
  process.env.REACT_APP_GITHUB_URL as string,
  {
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN as string}`,
    },
  }
);

/* eslint-enable @typescript-eslint/no-unsafe-call */
