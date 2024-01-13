"use client"

import { RefObject } from "react"
import { useState } from "react"
import { changeOptionChoice, deleteSpecifiqueOption } from "../features/formInput/formSlice"
import { useAppDispatch } from "../hook"
import {useDebounce} from "use-debounce"
import { useEffect } from "react"
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
  return (
    <div
    
    className={`flex w-full h-full gap-2 p-2 items-center justify-center  
  
    `}>
        <div 
        onMouseLeave={()=>{
            dispatch(changeOptionChoice({id:id,indexChange:index,newOption:isInput}))

        }}
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
    className={`w-full p-2  ${isChange? "bg-white" : "bg-transparent"}`}
     placeholder="Entrez le nom de l'option"/>
     </div>


{isChange&&<div>
    <button onClick={(e)=>{
     
        e.stopPropagation()
       

        dispatch(deleteSpecifiqueOption({id:id,indexChange:index}))}}>Delete</button>
</div>}
 </div>
  )
}