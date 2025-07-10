"use client";
import { cn } from "@/lib/utils";
// hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// validators
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileSchema } from "@/schemas/profileSchema";

export function ProfileUpdateForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { user, isLoaded } = useUser();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      imageurl: "",
      email: "",
    },
  });
  useEffect(() => {
    if (isLoaded && user) {
      form.reset({
        username: user.username || "",
        imageurl: user.imageUrl || "",
        email: user.emailAddresses?.[0]?.emailAddress || "",
      });
    }
  }, [isLoaded, user, form]);
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  const onSubmit = () => {};
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6 w-full", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input
                  id="username"
                  type="text"
                  placeholder="something@example.com"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="something@example.com"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageurl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="imageurl">Profile Image</FormLabel>
              <FormControl>
                <Input
                  id="imageurl"
                  type="text"
                  placeholder="something@example.com"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
