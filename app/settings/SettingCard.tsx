"use client";
import { resendVerificationEmail } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { BadgeCheck, BadgeX } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/providers/UserProvider";

export default function SettingCard() {
  const [countdown, setCountdown] = useState<number>(0);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    }
  }, [countdown]);

  const handleVerifyEmail = async () => {
    const res = await resendVerificationEmail(user.email);
    toast({
      title: res,
    });
    setCountdown(60);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>This is your account settings</CardDescription>
        </div>
        <Button variant="link" className="text-red-500" asChild>
          <Link href="/settings/edit-account">Edit Account</Link>
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="mt-6 flex items-center gap-8">
        <div className="space-y-2">
          <p className="font-semibold">First Name</p>
          <p className="font-semibold">Last Name</p>
          <p className="font-semibold">Email</p>
          <p className="font-semibold">Email Verified</p>
        </div>
        <div className="space-y-2">
          <p>: {user.first_name}</p>
          <p>: {user.last_name}</p>
          <p>: {user.email}</p>
          <p className="flex items-center gap-2">
            :{" "}
            {user.is_verified ? (
              <BadgeCheck size={20} className="text-green-500" />
            ) : (
              <BadgeX size={20} className="text-red-500" />
            )}
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="mt-6 flex items-center justify-end gap-4">
        <Button
          variant="outline"
          disabled={user.is_verified || countdown > 0}
          onClick={handleVerifyEmail}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : "Verify Email"}
        </Button>
        <Button asChild>
          <Link href="/settings/change-password">Change Password</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
