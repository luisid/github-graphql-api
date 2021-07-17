import { useCallback } from "react";
import { useRepos } from "../graphql/repos";

export const useList = (query: string, pageSize: number) => {
  const { data, error, isFetching, isFetchedAfterMount, fetchNextPage } =
    useRepos({
      query,
      first: pageSize,
    });

  const loadedPageCount = data?.pages.length || 0;
  const repositoryCount = data?.pages[0].repositoryCount || 0;
  const simulatedRepositoryCount = loadedPageCount * pageSize + 50;
  const itemCount =
    repositoryCount >= simulatedRepositoryCount
      ? simulatedRepositoryCount
      : repositoryCount;

  const isPageLoaded = useCallback(
    (page: number) => {
      if (!data) return false;

      return Boolean(data.pages[page]);
    },
    [data]
  );

  const isItemLoaded = useCallback(
    (index: number) => {
      if (!data) return false;

      const page = Math.trunc(index / pageSize);

      return isPageLoaded(page);
    },
    [data, isPageLoaded]
  );

  const nextPage = useCallback(
    (page: number) => {
      const pageData = data?.pages[page];

      return fetchNextPage({ pageParam: pageData });
    },
    [data]
  );

  return {
    data,
    itemCount,
    isFetching,
    fetchNextPage: nextPage,
    isFetchedAfterMount,
    error,
    isItemLoaded,
    isPageLoaded,
  };
};
