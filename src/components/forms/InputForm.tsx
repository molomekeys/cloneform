"use client"

import { Switch } from "@/components/ui/switch"
import { AiOutlineDelete ,} from "react-icons/ai";
import { IoDuplicate } from "react-icons/io5";

import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import {AnimatePresence, motion, Reorder, useDragControls} from "framer-motion"
import { useAppDispatch } from "../../app/hook"
import { useDebounce } from 'use-debounce';
import { Input } from "@/components/ui/input"
import { changeOptionalField, changeSpecifiqueLabel, deleteForm, duplicateForm, reseatSelect, selectForm } from "../../features/formInput/formSlice"
import { ReorderIcon } from "../mycomponent/components/ReoderIcon"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import ToolTipForm from "./ToolTipForm";
import { SelectComponent } from "../mycomponent/components/SelectComponent";
import FooterInput from "./FooterInput";
import { Textarea } from "@/components/ui/textarea";
export interface SingleInputStat{
   optional:boolean,id:string
}
interface PropsInput{
number : number
id:string
isSelected:boolean
optional:boolean
type:string
valueOfDar:SingleInputStat

title:string
}
const InputForm = ({title,valueOfDar,type,number,id,isSelected,optional}:PropsInput) => {
   
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
    const supabase = createClientComponentClient<Database>()
  return (
    <Reorder.Item  
    
    transition={{duration:0.25}}
    className={`flex flex-col  h-fit
     gap-6 transition-all duration-0  select-none ${isSelected? "border-t-4 border-teal-500" : ""}`}
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
    onClick={e=>e.stopPropagation()}
    onDoubleClick={(e)=>{
        e.stopPropagation()
        dispatch(selectForm(id))   
    }}
    className={`flex flex-col w-full min-h-200px] p-4  gap-8
     hover:bg-[#F5F5F5] ${isSelected? "bg-[#F5F5F5]":""}`}>
   
   
   {isSelected===false&& <div className={`flex justify-center w-full pt-2 
     ${isShowToogle&&!isSelected? "opacity-100" :"opacity-0"}`}>

        
            <ReorderIcon dragControls={controles}/>
      </div>}


    {isSelected&&
    <ToolTipForm id={id}/>
    }




<div className="flex w-full gap-2"
onClick={(e)=>{    
}}
>

   <label className="gap-2 flex items-center justify-center "><span className="text-sm">{number}.</span> 
   {isSelected? "" : `${isUsingText}`}
    {isSelected===false&&optional===false? "*" : ""} </label>
   {isSelected&&        <Input  
   
   value={isUsingText} ref={refInput} 
    onChange={(e)=>{
        setIsUsingText(e.target.value)
      
    }}
    className={`outline-teal-300 w-full  pb-1  `}
    placeholder="Entrez votre reponse"/>
}
    </div>


    <div className={`rounded-md   ${isSelected? "border-2 " 
    : ""} ${isShowToogle&&isSelected==false? "bg-[#f5f5f5]" : "bg-[#f5f5f5]"} `}>
   
 {type==="text"?   <Input 
    disabled
    className="text-slate-800 pl-2 py-1" placeholder="Entrez votre réponse"/>
: <Textarea
disabled
className="text-slate-800 pl-2 py-1 resize-none" placeholder="Entrez votre réponse"/> }
    </div>


    {isSelected&& <div className="w-full flex items-center justify-center">
<FooterInput isText valueBol={optional} type={type}/>
</div>}

    </div>
  
    </Reorder.Item>
  )
}
export default InputForm