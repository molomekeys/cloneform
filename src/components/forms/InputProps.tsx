"use client"

import { RefObject } from "react"
import { useState } from "react"
import { changeOptionChoice, deleteSpecifiqueOption } from "../../features/formInput/formSlice"
import { useAppDispatch } from "../../app/hook"
import {useDebounce} from "use-debounce"
import { useEffect } from "react"
import { AiOutlineDelete } from "react-icons/ai";

interface InputProps{
    isChange:boolean
    value:string
    id:string
    index:number
    refInput:RefObject<HTMLInputElement>|null
    isSelected:boolean
    saveChange:(idString:string,val:string)=>void
    deleteOption:(idStringe:string)=>void
}
export const InputProps = ({isSelected,refInput,index,isChange,id,value,saveChange,deleteOption}:InputProps) => {
    const [isInput,setIsInput]=useState(value)
    const dispatch=useAppDispatch()
    const [debounceValue]=useDebounce(isInput,500)
    const [isMouseEnter,setIsMouseEnter]=useState(false)
  return (
    <div onMouseEnter={()=>{
        setIsMouseEnter(true)
    }}
    onMouseLeave={()=>{
        setIsMouseEnter(false)
        dispatch(changeOptionChoice({id:id,indexChange:index,newOption:isInput}))
       
    }}
    
    className={`flex w-full h-full gap-4 p-2 items-center justify-center  
  
    `}>
        <div  
        className={`flex gap-2 w-full h-full items-center justify-center`}>
    <div className={`p-2 rounded-full 
    border-[2px] w-4 h-4 border-black ${isChange? "bg-white" : "bg-transparent"}
   `}>

    </div>
    <input 
 
    value={isInput}
    onChange={(e)=>{
        e.stopPropagation()
        setIsInput(e.target.value)
        


    }}
    className={`w-full p-2  ${isChange? "bg-white" : "bg-transparent"} ${isMouseEnter&&isChange&&"outline-none border-b-2 border-teal-500"}` }
     placeholder="Entrez le nom de l'option"/>
     </div>


{isMouseEnter&&isChange&&<div>
    <button onClick={(e)=>{
     
        e.stopPropagation()
       

        dispatch(deleteSpecifiqueOption({id:id,indexChange:index}))}}>

            <AiOutlineDelete size={25} className="text-slate-500"/>
        </button>
</div>}
 </div>
  )
}