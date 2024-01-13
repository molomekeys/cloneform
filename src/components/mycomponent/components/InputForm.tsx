"use client"

import { Switch } from "@/components/ui/switch"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import {AnimatePresence, motion, Reorder, useDragControls} from "framer-motion"
import { useAppDispatch } from "../../../app/hook"
import { useDebounce } from 'use-debounce';

import { changeOptionalField, changeSpecifiqueLabel, deleteForm, duplicateForm, reseatSelect, selectForm } from "../../../features/formInput/formSlice"
import { ReorderIcon } from "./ReoderIcon"
export interface SingleInputStat{
    inputLabel:string ,optional:boolean,id:string
}
interface PropsInput{
number : number
id:string
isSelected:boolean
optional:boolean
inputLabel:string
valueOfDar:SingleInputStat
optionQuestion:string
title:string
}
const InputForm = ({title,optionQuestion,valueOfDar,number,id,isSelected,inputLabel,optional}:PropsInput) => {
   
    const [isUsingText,setIsUsingText]=useState(title)
    const [isOpenMenu,setIsOpenMenu]=useState(false)
    const [isObligatory,setIsObligatory]=useState(false)
    const refInput=useRef<HTMLInputElement>(null)
    const [value] = useDebounce(isOpenMenu, 1000);
    const [isValue]=useDebounce(isUsingText,500)

    useEffect(()=>{
if(isSelected)
{
    refInput.current?.focus()
    dispatch(changeSpecifiqueLabel({id:id,newTitle:isValue}))
    
}
else if(value===true) {

}
    },[isSelected,isValue])
    const dispatch=useAppDispatch()
    const controles=useDragControls()
    const [isShowToogle,setIsShowToogle]=useState(false)
  return (
    <Reorder.Item  
    
    transition={{duration:0.25}}
    className={`flex flex-col  h-fit
     gap-2 transition-all duration-0  select-none ${isSelected? "border-t-4 border-teal-500" : ""}`}
    onMouseLeave={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsShowToogle(false)
    }}
    onMouseEnter={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsShowToogle(true)
    }}
    dragListener={false}
    dragControls={controles}
    id={id}
    value={valueOfDar}
        >
    <div
    onDoubleClick={(e)=>{
        e.stopPropagation()
        dispatch(selectForm(id))   
    }}
    className={`flex flex-col w-full min-h-200px] p-4  gap-2 
     hover:bg-[#F5F5F5] ${isSelected? "bg-[#F5F5F5]":""}`}>
   
     <div className={`flex justify-center w-full pt-2 ${isShowToogle&&!isSelected? "opacity-100" :"opacity-0"}`}>

        
            <ReorderIcon dragControls={controles}/>
      </div>


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

<div className="flex w-full gap-2"
onClick={(e)=>{
    
  
    
}}
>

   <label className="gap-2 flex items-center justify-center "><span className="text-sm">{number}.</span> 
   {isSelected? "" : `${isUsingText}`}
    {isSelected===false&&optional? "*" : ""} </label>
   {isSelected&&        <input  
   
   value={isUsingText} ref={refInput} 
    onChange={(e)=>{
        setIsUsingText(e.target.value)
      
    }}
    className={`w-full border-b-2 pb-1 border-teal-600 outline-none `}
    placeholder="Entrez votre reponse"/>
}
    </div>
    <div className={`rounded-md  ${isSelected? "border-2 " 
    : ""} ${isShowToogle&&isSelected==false? "bg-[#f5f5f5]" : "bg-[#f5f5f5]"} `}>
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
    </Reorder.Item>
  )
}
export default InputForm