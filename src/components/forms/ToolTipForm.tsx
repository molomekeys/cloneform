"use client"
import { useAppDispatch } from "@/app/hook"
import {duplicateForm,deleteForm} from "../../features/formInput/formSlice"
import {IoDuplicate} from "react-icons/io5"
import {AiOutlineDelete} from "react-icons/ai"
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"

interface ToolTipProps{
    id:string
}
const ToolTipForm = ({id}:ToolTipProps) => {
    const supabase=createClientComponentClient()
    const dispatch=useAppDispatch()
  return (
    <div className="flex   p-4 justify-end gap-2">
  
        <button 
          className="hover:bg-slate-200 p-2 rounded-lg hover:duration-200"
        onClick={(e)=>{
            e.stopPropagation()
            dispatch(duplicateForm(id))
        }}><IoDuplicate size={20}/></button>
        
        <button 
        className="hover:bg-slate-200 p-2 rounded-lg hover:duration-200"
        onClick={async(e)=>{
            e.stopPropagation()
            

           dispatch(deleteForm(id))
           const deleteInDb=await supabase.from("questiontable").delete().eq('id',id)

        }}><AiOutlineDelete
        size={20}
        /></button>
        </div>
  )
}
export default ToolTipForm