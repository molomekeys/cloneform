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
    className="w-full h-full bg-slate-200 relative z-50 cursor-pointer"
    onClick={()=>{
        console.log("slt")
       router.push('/pages/designpage/'+urlId)
    }}>
        
        <h2>{title}</h2>
    </div>
  )
}
export default FormMiniatureComponent