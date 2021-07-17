import { render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { RepoListPage } from "..";

const queryClient = new QueryClient();

test("renders input with label", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <RepoListPage />
    </QueryClientProvider>
  );
  const inputLabel = screen.getByText(/Search/i);
  expect(inputLabel).toBeInTheDocument();
});
