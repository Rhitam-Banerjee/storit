/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useSignIn } from "@clerk/nextjs"
import { z } from "zod"
import { signInSchema } from "@/schemas/signInSchema"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

export default function SignInFrom() {
  const router = useRouter()
  const [isSubmiting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const { signIn, isLoaded, setActive } = useSignIn()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const onSubmitForm = async (data: z.infer<typeof signInSchema>) => {
    if (!isLoaded) return
    setIsSubmitting(true)
    setAuthError(null)
    try {
      await signIn.create({
        identifier: data.email,
        password: data.password
      })
    } catch (error) {

    }
  }
  return (
    <h1>Hello world</h1>
  )
}