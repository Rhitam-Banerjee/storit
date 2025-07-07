/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link"
import z from "zod"
import { signUpSchema } from "@/schemas/signUpSchema"
// hooks
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
// components
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
// assets
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await signUp.create({
        username: data.username,
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (error: any) {
      console.error("Sign-up error:", error);
      setAuthError(
        error.errors?.[0]?.message ||
        "An error occurred during sign-up. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setIsSubmitting(true);
    setVerificationError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Verification incomplete:", result);
        setVerificationError(
          "Verification could not be completed. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setVerificationError(
        error.errors?.[0]?.message ||
        "An error occurred during verification. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  if (verifying) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Enter The OTP</CardTitle>
          <CardDescription>
            OTP was sent to your sign-up mailID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerificationSubmit}>
            <div className="space-y-2">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={(value) => setVerificationCode(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={async () => {
            if (signUp) {
              await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
              });
            }
          }}>
            Verify
          </Button>
          <div id="clerk-captcha"></div>
        </CardFooter>
      </Card>
    )
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
        </div>
        {authError && <p className="text-muted-foreground">{authError}</p>}
        {verificationError && <p className="text-muted-foreground">{verificationError}</p>}
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <FormControl>
                    <Input id="username" type="text" className="bg-secondary" placeholder="your username" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" className="bg-secondary" placeholder="something@example.com" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                  </FormLabel>
                  <div className="flex items-center gap-[10px]">
                    <FormControl>
                      <Input id="password" type={showPassword ? "text" : "password"} className="bg-secondary" placeholder="your password" required {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
          <div className="grid gap-3">
            <FormField control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                  </FormLabel>
                  <div className="flex items-center gap-[10px]">
                    <FormControl>
                      <Input id="passwordConfirmation" type={showConfirmPassword ? "text" : "password"} className="bg-secondary" placeholder="confirm your password" required {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
          <Button type="submit" className="w-full">
            {isSubmitting ? "Verifying..." : "Sign up"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          Have an account?
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  )
}
