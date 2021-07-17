import { render, screen } from "@testing-library/react";
import { Root } from "..";

test("renders root with title", () => {
  render(<Root />);
  const title = screen.getByText(/Github Repos/i);
  expect(title).toBeInTheDocument();
});
