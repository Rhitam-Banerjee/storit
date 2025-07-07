import * as z from "zod";
export const signUpSchema = z.object({
  username: z.string().min(4, { message: "Minimum 4 characters are required" }).max(20, { message: "Maximum of 20 characters can be allowed" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password should be atleast 8 characters" }),
  passwordConfirmation: z.string().min(1, { message: "Conform password" })
})
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"]
  })