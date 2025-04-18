import React from "react";
import { resendSignUpCode } from "aws-amplify/auth";
import { useSearchParams } from "next/navigation";

type Props = {
  className?: string;
};
const ResendCodeButton = ({ className }: Props) => {
  const params = useSearchParams();
  const username = params.get("email") || null;

  const handleResendCode = () => {
    if (username) {
      resendSignUpCode({ username });
    } else {
      console.error("Username is null");
    }
  };

  return (
    <button type="button" onClick={handleResendCode} className={className}>
      Resend Code
    </button>
  );
};

export default ResendCodeButton;
