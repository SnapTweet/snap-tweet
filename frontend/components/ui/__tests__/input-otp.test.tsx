import { render, screen } from "@testing-library/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../input-otp";

describe("InputOTP", () => {
  const InputOTPTest = () => (
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSeparator />
        <InputOTPSlot index={1} />
        <InputOTPSeparator />
        <InputOTPSlot index={2} />
        <InputOTPSeparator />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );

  it("handles disabled state", () => {
    render(
      <InputOTP disabled maxLength={1}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
      </InputOTP>
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
