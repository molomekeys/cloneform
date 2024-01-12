"use client"

import { useState } from "react"
import { changeOptionChoice } from "../features/formInput/formSlice"
import { useAppDispatch } from "../hook"

interface InputProps{
    isChange:boolean
    value:string
    id:string
    index:number
  
    saveChange:(idString:string,val:string)=>void
    deleteOption:(idStringe:string)=>void
}
export const InputProps = ({index,isChange,id,value,saveChange,deleteOption}:InputProps) => {
    const [isInput,setIsInput]=useState(value)
    const dispatch=useAppDispatch()
  return (
    <div className={`flex w-full h-full gap-4 p-2 items-center justify-center  
  
    `}>
        <div className={`flex gap-2 w-full h-full items-center justify-center`}>
    <div className={`p-2 rounded-full 
    border-[2px] w-4 h-4 border-black ${isChange? "bg-white" : "bg-white"}
   `}>

    </div>
    <input  disabled={isChange? false : true}
    onBlur={()=>{
        dispatch(changeOptionChoice({id:id,indexChange:index,newOption:isInput}))
    }}
    value={isInput}
    onChange={(e)=>{
        setIsInput(e.target.value)
    }}
    className={`w-full p-2  ${isChange? "bg-white" : "bg-white"}`}
     placeholder="Entrez le nom de l'option"/>
     </div>


{isChange&&<div>
    <button onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        deleteOption(id)}}>Delete</button>
</div>}
 </div>
  )
}