import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

// Test component to simulate form usage
function TestForm() {
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input {...field} data-testid="username-input" />
              </FormControl>
              <FormDescription>Enter your username</FormDescription>
              <FormMessage>This is a required field</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

describe("Form", () => {
  it("renders form components correctly", () => {
    render(<TestForm />);

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
    expect(screen.getByText("This is a required field")).toBeInTheDocument();
  });
});
