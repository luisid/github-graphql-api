import { gql } from "graphql-request";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { graphqlClient } from "../../../../../Root/graphql-client";

/**
 * @type {string}
 */
export const reposQuery = gql`
  query repos($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      nodes {
        ... on Repository {
          id
          forkCount
          nameWithOwner
          stargazers {
            totalCount
          }
        }
      }
      pageInfo {
        endCursor
      }
      repositoryCount
    }
  }
`;

/**
 * Query variables required by graphql for fetching repos
 * @type {ReposQueryVariables}
 */
export type ReposQueryVariables = {
  query: string;
  first: number;
  after?: string;
};

/**
 * @type {Stargazers}
 */
type Stargazers = {
  totalCount: number;
};

/**
 * Page info indicating next cursor for pagination
 * @type {PageInfo}
 */
type PageInfo = {
  endCursor: string;
};

/**
 * Github Search Nodes Object
 * Provides pageInfo data, nodes results and repository count
 * @type {SearchNodes}
 */
export type SearchNodes<T> = {
  nodes: T[];
  repositoryCount: number;
  pageInfo: PageInfo;
};

/**
 * Github Repo object
 * @type {RepoType}
 */
export type RepoType = {
  id: string;
  forkCount: number;
  nameWithOwner: string;
  stargazers: Stargazers;
};

/**
 * Graphql result type for Github API result
 * @type {SearchResult<T>}
 */
export type SearchResult<T> = {
  search: SearchNodes<T>;
};

/**
 * Hook to fetch repos from Github.
 *
 * @param {ReposQueryVariables}
 * @returns {UseInfiniteQueryResult<SearchNodes<RepoType>>}
 */
export function useRepos({
  query,
  after,
  first = 10,
}: ReposQueryVariables): UseInfiniteQueryResult<SearchNodes<RepoType>> {
  const result = useInfiniteQuery(
    `repos.${query}`,
    async ({ pageParam }) => {
      const { search } = await graphqlClient.request<
        SearchResult<RepoType>,
        ReposQueryVariables
      >(
        reposQuery,
        pageParam || {
          query,
          after,
          first,
        }
      );

      return search;
    },
    {
      getNextPageParam: (lastPage) => ({
        query,
        after: lastPage.pageInfo.endCursor,
        first,
      }),
      enabled: query.length > 0,
    }
  );

  return result;
}
