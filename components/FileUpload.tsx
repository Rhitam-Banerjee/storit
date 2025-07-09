import { TbFileUpload } from "react-icons/tb";

export default function FileUpload() {
  return (
    <div className='mt-[20px] flex flex-col justify-center items-center h-[150px] bg-secondary/30 w-full border-dashed border-[2px] border-primary/5 rounded-md'>
      <TbFileUpload className='text-heading3 text-chart-3 max-md:text-center' />
      <span className='text-small-text'><b>Click to upload</b> or drag and drop assets</span>
    </div>
  )
}