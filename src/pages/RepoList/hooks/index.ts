import { ChangeEvent, useCallback, useState } from "react";

export type RepoListSearchProps = {
  query: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Repository List Page hook
 * @returns {RepoListSearchProps}
 */
export const useRepoList = (): RepoListSearchProps => {
  const [query, setQuery] = useState("");
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return {
    query,
    handleChange,
  };
};
