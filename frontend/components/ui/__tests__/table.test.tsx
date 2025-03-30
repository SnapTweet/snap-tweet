import { render, screen } from "@testing-library/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

describe("Table", () => {
  it("renders table with all components", () => {
    render(
      <Table>
        <TableCaption>Test Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByText("Test Caption")).toBeInTheDocument();
    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Footer 1")).toBeInTheDocument();
  });

  it("applies custom className to table components", () => {
    render(
      <Table className="test-table">
        <TableHeader className="test-header">
          <TableRow className="test-row">
            <TableHead className="test-head">Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    expect(screen.getByRole("table")).toHaveClass("test-table");
    expect(screen.getByRole("rowgroup")).toHaveClass("test-header");
    expect(screen.getByRole("row")).toHaveClass("test-row");
    expect(screen.getByRole("columnheader")).toHaveClass("test-head");
  });
});
