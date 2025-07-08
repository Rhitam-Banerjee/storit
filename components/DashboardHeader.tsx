"use client"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { TbFileUpload } from "react-icons/tb";
export default function DashboardHeader() {
  const router = useRouter()
  const { isSignedIn, user, isLoaded } = useUser()
  if (!isSignedIn) {
    router.push("/")
  }
  if (!isLoaded) {
    return <h1>Loading...</h1>
  }
  return (
    <section className='w-full flex flex-col justify-center items-start bg-secondary p-4 rounded-md '>
      <h1 className='w-full text-heading4 text-chart-3 font-bold capitalize'>Hello! {user?.username}</h1>
      <span className='text-small-text'>Upload your files, folders and assets with ease</span>
      <div className='mt-[20px] flex flex-col justify-center items-center h-[150px] opacity-50 w-full border-dashed border-[2px] border-primary/5 rounded-md'>
        <TbFileUpload className='text-heading3 text-chart-3 max-md:text-center' />
        <span className='text-small-text'><b>Click to upload</b> or drag and drop</span>
        <span className='text-small-text'>PNG / PDF</span>
      </div>
    </section>
  )
}