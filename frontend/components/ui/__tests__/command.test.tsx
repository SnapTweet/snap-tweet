import { fireEvent, render, screen } from "@testing-library/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";

describe("Command", () => {
  it("renders command with input and items", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
            <CommandSeparator />
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const onValueChange = jest.fn();

    render(
      <Command>
        <CommandInput placeholder="Search..." onValueChange={onValueChange} />
      </Command>
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onValueChange).toHaveBeenCalledWith("test");
  });

  it("shows empty state when no results", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "nonexistent" } });
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("handles item selection", () => {
    const onSelect = jest.fn();

    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem onSelect={onSelect} value="test">
              Test Item
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    fireEvent.click(screen.getByText("Test Item"));
    expect(onSelect).toHaveBeenCalledWith("test");
  });
});
