"use stats"

import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import {v4} from "uuid"
import { InputProps } from "./InputProps"
import AddComponent from "./AddComponent"
import { useAppDispatch, useAppSelector } from "../../../app/hook"
import { changeSpecifiqueLabel, deleteForm, selectForm } from "../../../features/formInput/formSlice"
import { Reorder, useDragControls } from "framer-motion"
import { ReorderIcon } from "./ReoderIcon"
import { SingleInputStat } from "./InputForm"
import { useEffect } from "react"
import { useRef } from "react"
import {useDebounce} from "use-debounce"
interface TypeMultipleChoice{
  id:string
    numberQuestion:number
    isSelected:boolean
    values:SingleInputStat
    title:string
    option:string[]
    
}
const MultipleChoice = ({title,option,values,numberQuestion,id,isSelected}:TypeMultipleChoice) => {
  
  
    const dispatch=useAppDispatch()
    const inputRef=useRef<HTMLInputElement>(null)
    const idSelected=useAppSelector(s=>s.form.idSelected)
    const [isChoice,setIsChoice]=useState([{option:"Choose option",id:`${v4()}`,isChange:false},
   {option:"Choose option",id:v4(),isChange:false}])
const [isChangeTitle,setIsChangeTitle]=useState(title)
   const controles=useDragControls()
   const [isMouseEnter,setIsMouseEnter]=useState(false)




   const [isValueDebouce]=useDebounce(isChangeTitle,1000)

   useEffect(()=>{
  if(isSelected&&inputRef.current)
  {
      inputRef.current.focus()
      dispatch(changeSpecifiqueLabel({id:id,newTitle:isValueDebouce}))
  }
   },[isSelected,isValueDebouce])


 const allOptions=option.map((e,i)=>{
    return (
    <div  className="flex flex-col "
    key={v4()}
    onClick={(e)=>{
        inputRef.current?.blur()

e.stopPropagation()
    }}>
        <InputProps   isSelected={isSelected}
    refInput={inputRef}
    index={i}
    isChange={isSelected}
    deleteOption={deleteSpecialForm}
    id={id} saveChange={changeOptionValue}
    value={e} key={v4()}/></div>)
 }) 

 const isChangedAdded=isChoice.filter((e)=>{
    if(e.isChange===true)
    {
        return e
    }
 })
 const dataTest=isChangedAdded[0]?.isChange
 function addOption ()
 {
setIsChoice((e)=>([...e,{option:"new option",id:v4(),isChange:false}]))
 }
 function addOptionOther ()
 {
setIsChoice((e)=>([...e,{option:"Autre",id:v4(),isChange:true}]))
 }
 function changeOptionValue(idString:string,val:string)
 {
    const allData=[...isChoice]
    const filteredId=allData.map((e)=>{
        if(e.id===idString)
        {
            return {...e,option:val}
        }
        else {
            return e
        }
    })
    setIsChoice(filteredId)
 }
 function deleteSpecialForm(id:string)
 {
    const allData=[...isChoice]

    const filteredAlData=allData.filter((e)=>{
        if(e.id!=id)
        {
            return e

        }
       
    })
   
    if(filteredAlData)
    {
    setIsChoice(filteredAlData)
}
 }

   return (
<Reorder.Item
transition={{duration:0.25}}
value={values} className={`flex flex-col gap-2  transition-all
 duration-0 select-none ${isSelected? "border-t-4 border-teal-500 bg-[#f5f5f5]" : ""}`}
dragControls={controles}
onMouseEnter={()=>{
    setIsMouseEnter(true)
}}
onMouseLeave={()=>{
    setIsMouseEnter(false)
}}
dragListener={false}>
   <section 
   onDoubleClick={()=>{
    if(isSelected===false)
    {
    dispatch(selectForm(id))
}
   }}
   className={`flex flex-col 
    p-2 ${isMouseEnter&&isSelected===false&&"bg-[#f5f5f5]"} ${isSelected&&"bg-[#f5f5f5]"} 
    gap-2 h-full w-full `}>
       
      <div className={`flex justify-center w-full pt-2 ${isMouseEnter&&!isSelected? "opacity-100" :"opacity-0"}`}>
       <ReorderIcon dragControls={controles}/>
        </div>

    {isSelected&&    <div className="flex justify-end w-full">
        <button onClick={(e)=>{
            e.stopPropagation()
            dispatch(deleteForm(id))
        }}>Delete</button>
        </div>}
<div className="flex w-full h-full items-center justify-center gap-2">
    <p>{numberQuestion+"."}</p>
    <input ref={inputRef}  
    // onBlur={(e)=>{
    //     inputRef.current?.blur()
    //     e.stopPropagation()
    //     dispatch(changeSpecifiqueLabel({id:id,newTitle:isChangeTitle}))
    // }}
    onChange={(e)=>{
        e.stopPropagation()
        setIsChangeTitle(e.target.value)
    }}
    value={isChangeTitle}
    className={`w-full outline-none py-1 ${isSelected? "bg-white border-b-2 border-teal-600" : "bg-transparent"}`}
     placeholder="Choisisez la question"/>
</div>
<div className={`flex flex-col  p-4 gap-4 ${isSelected? "" : ""}`}>
{allOptions}
{isSelected&&<div className="flex justify-between p-4 text-sm">
    <button 
    className="hover:bg-emerald-500 duration-200 py-2 px-2 rounded-lg hover:text-slate-100"
    onClick={addOption}>Add option</button>
{dataTest!=true&&    <button 
    className="hover:bg-emerald-500 duration-200 py-2 px-2 rounded-lg hover:text-slate-100"
    onClick={addOptionOther}>Add option other</button>}
</div>}

</div>


   </section>
   </Reorder.Item>
  )
}
export default MultipleChoice