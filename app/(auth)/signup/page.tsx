import { CircleUserRound } from "lucide-react";
import { SignupForm } from "./Form";
import Header from "../Header";

export default function SignupPage() {
  return (
    <>
      <Header
        title='Create new account'
        description='Create an account to get started'
        icon={<CircleUserRound size={32} />}
      />
      <SignupForm className='container' />
    </>
  );
}
