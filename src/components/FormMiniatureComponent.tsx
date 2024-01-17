"use client"
import {useRouter} from "next/navigation"
interface FormMiniatureProps{
    urlId:string
    title:string
}
const FormMiniatureComponent = ({title,urlId}:FormMiniatureProps) => {
   const router=useRouter()
  return (
    <div 
    className="w-full max-h-[200px] p-4 bg-slate-100 border-2 border-slate-500 rounded-xl relative z-50 cursor-pointer"
    onClick={()=>{
        console.log("slt")
       router.push('/pages/designpage/'+urlId)
    }}>
        
        <h2 className="font-semibold">{title}</h2>
    </div>
  )
}
export default FormMiniatureComponent