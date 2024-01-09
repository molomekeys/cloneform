"use client"

import { Switch } from "@/components/ui/switch"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import {AnimatePresence, motion} from "framer-motion"
import { useAppDispatch } from "../hook"
import { useDebounce } from 'use-debounce';

import { changeOptionalField, changeSpecifiqueLabel, deleteForm, duplicateForm, reseatSelect, selectForm } from "../features/formInput/formSlice"
interface PropsInput{
number : number
id:string
isSelected:boolean
optional:boolean
inputLabel:string
}
const InputForm = ({number,id,isSelected,inputLabel,optional}:PropsInput) => {
    const [isUsingText,setIsUsingText]=useState(inputLabel)
    const [isOpenMenu,setIsOpenMenu]=useState(false)
    const [isObligatory,setIsObligatory]=useState(false)
    const refInput=useRef<HTMLInputElement>(null)
    const [value] = useDebounce(isOpenMenu, 1000);

    useEffect(()=>{
if(isSelected)
{
    refInput.current?.focus()
}
else {
   


}
    },[isSelected,value])
    const dispatch=useAppDispatch()
  return (
    <div
    onClick={(e)=>{
        e.stopPropagation()
        dispatch(selectForm(id))   
    }}
    className={`flex flex-col w-full min-h-[100px]  gap-2 p-10 hover:bg-[#F5F5F5] ${isSelected? "bg-[#F5F5F5]":""}`}>
   
   
    {isSelected&&
    <div className="flex  p-4 justify-end gap-8">
        <button onClick={(e)=>{
            e.stopPropagation()
            dispatch(duplicateForm(id))
        }}>Duplicate</button>
        
        <button onClick={(e)=>{
            e.stopPropagation()
           dispatch(deleteForm(id))
        }}>Delete</button>
        </div>}
<div className="flex w-full"
onClick={(e)=>{
    
  
    
}}
>

   <label className=" "><span className="text-sm">{number+1}.</span> {isSelected? "" : `${isUsingText}`} {isSelected===false&&optional? "*" : ""} </label>
   {isSelected&&        <input  
   onBlur={(e)=>{
    e.stopPropagation()

   }}
   value={isUsingText} ref={refInput} 
    onChange={(e)=>{
        setIsUsingText(e.target.value)
        dispatch(changeSpecifiqueLabel({id:id,inputLabel:e.target.value,optional:false}))
    }}
    className="w-full border-b-2 pb-1 border-teal-600 outline-none"
    placeholder="Entrez votre reponse"/>
}
    </div>
    <div className={`rounded-md bg-[#F5F5F5] ${isSelected? "border-2 " : ""} `}>
    <p className="text-slate-800 pl-2 py-1">Entrez votre réponse</p>
    </div>
    <AnimatePresence>    {isSelected? <motion.div 
    key={"firstparent"}
    className="flex flex-col" 
   
    layout >
    <motion.div
    className={`flex flex-row  w-fit
   `}
    >
  <motion.div
       onClick={(e)=>{
       
       
    }}
  className={`flex gap-2  `}
   layout>


    <motion.div onClick={(e)=>{
        e.stopPropagation()
       dispatch(changeOptionalField(id))
    }}
    key={"testBmomo"}
    layout transition={{duration:0.1,}}
    className={`flex w-14 rounded-full items-center p-1 ${optional? "bg-emerald-500  justify-end" : "bg-slate-200 "}`}>

    <motion.div  transition={{duration:0.1}} layout
    key={"test33momo"}
    className={`h-4 w-4 rounded-full ${optional? "bg-white" : "bg-slate-900"}`}>
 {/**ça c'est le cercle pour le toggle */}
    </motion.div>
    </motion.div>
    <p>Obligatoire</p>

    </motion.div>
   

    </motion.div>
 
    </motion.div> : <></>}
    </AnimatePresence>

    </div>
  )
}
export default InputForm