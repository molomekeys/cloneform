"use client"

import { Switch } from "@/components/ui/switch"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import {AnimatePresence, motion} from "framer-motion"
import { useAppDispatch } from "../hook"
import { changeSpecifiqueLabel, deleteForm, duplicateForm, selectForm } from "../features/formInput/formSlice"
interface PropsInput{
number : number
id:string
isSelected:boolean
inputLabel:string
}
const InputForm = ({number,id,isSelected,inputLabel}:PropsInput) => {
    const [isUsingText,setIsUsingText]=useState(inputLabel)
    const [isOpenMenu,setIsOpenMenu]=useState(false)
    const [isObligatory,setIsObligatory]=useState(false)
    const refInput=useRef<HTMLInputElement>(null)
    useEffect(()=>{
if(isSelected)
{
    refInput.current?.focus()
}
    },[isSelected])
    const dispatch=useAppDispatch()
  return (
    <div
    onClick={(e)=>{
        e.stopPropagation()
        dispatch(selectForm(id))   
    }}
    className={`flex flex-col w-full min-h-[100px]  gap-2 p-10 hover:bg-[#F5F5F5] ${isSelected? "bg-[#F5F5F5]":""}`}>
    {isSelected&&
    <div className="w-full flex p-4 justify-end gap-8">
        <button onClick={()=>{
            dispatch(duplicateForm(id))
        }}>Duplicate</button>

        <button onClick={()=>{
            dispatch(deleteForm(id))
        }}>Delete</button>
        </div>}
<div className="flex w-full"
onClick={(e)=>{
    
  
    
}}
>

   <label className="">{number+1}.{isSelected? "" : `${isUsingText}`} {isSelected===false&&isObligatory? "*" : ""} </label>
   {isSelected&&        <input  
   onBlur={()=>{
    dispatch(changeSpecifiqueLabel({id:id,inputLabel:isUsingText,optional:false}))
   }}
   value={isUsingText} ref={refInput} 
    onChange={(e)=>setIsUsingText(e.target.value)}
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
        setIsObligatory(e=>!e)
    }}
    key={"testBmomo"}
    layout transition={{duration:0.1,}}
    className={`flex w-14 rounded-full items-center p-1 ${isObligatory? "bg-emerald-500  justify-end" : "bg-slate-200 "}`}>

    <motion.div  transition={{duration:0.1}} layout
    key={"test33momo"}
    className={`h-4 w-4 rounded-full ${isObligatory? "bg-white" : "bg-slate-900"}`}>
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