import * as z from "zod"
export const profileSchema = z.object({
  username: z.string().min(4, { message: "Minimum 4 characters are required" }).max(20, { message: "Maximum of 20 characters can be allowed" }),
  email: z.string().min(1, { message: "Enter email address" }).email({ message: "Please enter a valid email" }),
  imageurl:z.string(),
})