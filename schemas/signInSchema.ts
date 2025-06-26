import * as z from "zod"
export const signInSchema = z.object({
  email: z.string().min(1, { message: "Enter email address" }).email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Please enter password" }).min(8, { message: "Password should be atleast 8 characters" })
})