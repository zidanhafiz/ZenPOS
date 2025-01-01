import { LogIn } from "lucide-react";
import Header from "../Header";
import { LoginForm } from "./Form";

export default function LoginPage() {
  return (
    <div className='max-w-sm w-full'>
      <Header
        title='Welcome back'
        description='Login to your account'
        icon={<LogIn size={32} />}
      />
      <LoginForm />
    </div>
  );
}
