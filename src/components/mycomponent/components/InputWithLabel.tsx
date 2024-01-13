"use client"

import { useState } from "react"
import {Input} from "../../ui/input"

import {Label} from "../../ui/label"
interface InputLabel {
    title:string 
    id:string
}
export const InputWithLabel = ({title,id}:InputLabel) => {
    const [isChangedText,setIsChangingText]=useState(title)
  return (
   <div className="flex flex-col gap-2">
    <Label htmlFor={id} className="">{title[0].toLocaleUpperCase()
    +title.slice(1)+" :"}</Label>
    <Input  id={id}
    className=""
    value={isChangedText} onChange={(e)=>{
        setIsChangingText(e.target.value)
    }}/>
   </div>
  )
}