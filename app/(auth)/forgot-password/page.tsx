import { KeyRound } from "lucide-react";
import Header from "../Header";
import { ForgotPasswordForm } from "./Form";

export default function ForgotPasswordPage() {
  return (
    <div className='max-w-sm w-full'>
      <Header
        title='Forgot password'
        description='Confirm your email address'
        icon={<KeyRound />}
      />
      <ForgotPasswordForm />
    </div>
  );
}
