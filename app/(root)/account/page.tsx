/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useUser } from "@clerk/nextjs"

export default function DashboardAccount() {
  const { isSignedIn, user, isLoaded } = useUser()
  return (
    <h1>Account</h1>
  )
}