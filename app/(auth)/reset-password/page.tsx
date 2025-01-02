import { KeyRound } from "lucide-react";
import Header from "../Header";
import { ResetPasswordForm } from "./Form";

export default function ResetPasswordPage() {
  return (
    <div className='max-w-sm w-full'>
      <Header
        title='Reset password'
        description='Enter your new password'
        icon={<KeyRound />}
      />
      <ResetPasswordForm />
    </div>
  );
}
