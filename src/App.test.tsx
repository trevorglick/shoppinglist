import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { ListData } from "../src/utils/ListData";

describe("Main App Page", () => {
  test("shows the header", () => {
    render(<App />);
    const linkElement = screen.getByText(/Ye ol' Goods Gatherin/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders initial data", () => {
    render(<App />);
    const listHeaders = screen.getAllByTestId(/ListHeaderTestId/i);
    expect(listHeaders).toHaveLength(3);
    listHeaders.forEach((list, index) => {
      expect(list).toHaveTextContent(ListData[index].name);
    });
    const listItems = screen.getAllByTestId(/ListItemTestId/i);
    expect(listItems).toHaveLength(17);
  });

  test("list can be added", async () => {
    render(<App />);
    const addListInput = screen.getByLabelText("add-list");
    const addListButton = screen.getByText(/Add List/i);
    // type into input
    await userEvent.type(addListInput, "Test List");
    expect(addListInput).toHaveValue("Test List");
    // click add list button
    await userEvent.click(addListButton);
    const listHeaders = screen.getAllByTestId(/ListHeaderTestId/i);
    // should have 4 lists now
    expect(listHeaders).toHaveLength(4);
    // 4th list title is test list
    expect(listHeaders[3]).toHaveTextContent(/test list/i);
  });

  test("list can be deleted", async () => {
    render(<App />);
    const deleteListButton = screen.getAllByTestId(/ListDeleteTestId/i);
    // grab first delete list button and click it
    await userEvent.click(deleteListButton[0]);
    const listHeaders = screen.getAllByTestId(/ListHeaderTestId/i);
    // only 2 lists remaining
    expect(listHeaders).toHaveLength(2);
  });
});
