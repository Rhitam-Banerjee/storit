/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useUser } from '@clerk/nextjs'
import FileUpload from './FileUpload';

export default function DashboardHeader() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <h1>Loading...</h1>
  }
  return (
    <section className='w-full flex flex-col justify-center items-start p-4 rounded-md shadow-custom-light shadow-primary/20'>
      <h1 className='w-full text-heading4 text-chart-3 font-bold capitalize'>Hello! {user?.username}</h1>
      <span className='text-small-text'>Upload your files, folders and assets with ease</span>
      <FileUpload />
    </section>
  )
}