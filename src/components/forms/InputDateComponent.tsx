
"use client"

import { Reorder, useDragControls } from "framer-motion"
import { useState } from "react"
import { ReorderIcon } from "../mycomponent/components/ReoderIcon"
import DateInput from "./DateInput"
import { useAppDispatch } from "@/app/hook"
import { selectForm } from "@/features/formInput/formSlice"
import ToolTipForm from "./ToolTipForm"
import FooterInput from "./FooterInput"
export interface SingleInputStat{
    optional:boolean,id:string
 }
interface InputDataComponent{
    title:string
    isSelected:boolean
    valueTest:SingleInputStat
    id:string
    index:number
}
const InputDateComponent = ({index,title,valueTest,isSelected,id}:InputDataComponent) => {
    const [isShowToogle,setIsShowToogle]=useState(false)
    const controles=useDragControls()
    const dispatch=useAppDispatch()
  return (
    <Reorder.Item value={valueTest}
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
   onClick={e=>e.stopPropagation()}

onDoubleClick={(e)=>{
    e.stopPropagation()
    dispatch(selectForm(id))
}}
       >
  <div
 className={`flex flex-col w-full min-h-200px] p-4  gap-8
 hover:bg-[#F5F5F5] ${isSelected? "bg-[#F5F5F5]":""}`}
  >
    
  {isSelected===false&& <div className={`flex justify-center w-full pt-2 
     ${isShowToogle&&!isSelected? "opacity-100" :"opacity-0"}`}>

        
            <ReorderIcon dragControls={controles}/>
      </div>}

      {isSelected&&  <div>
   <ToolTipForm id={id}/>
   </div>}
   <div className="flex flex-col w-full gap-6 ">
    <h2>{index+". "+title}<span>{valueTest.optional===true?"" : "*"}</span></h2>
    <div className="pointer-events-none w-full">
    <DateInput/>
    </div>
    {isSelected&&  <div>
   <FooterInput
    isText={false}
    type="date" valueBol= {valueTest.optional}/>
   </div>}
   </div> 
 
   </div>
   </Reorder.Item>
  )
}
export default InputDateComponent