"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {v4} from "uuid"
interface OptionsP{
  choice: string[] | null;
  id: number;
  question_id: string | null;
}
interface RadioGroupeProps{
    title:string
    option:string[]
}
const RadioGroupeComponent = ({title,option}:RadioGroupeProps) => {
  const allGroupe=option?.map((e)=>{
    return (
      <div 
      key={v4()}
      className="flex items-center space-x-2">
      <RadioGroupItem key={v4()} value={e}  defaultValue={""} />
      <Label>{e}</Label>
    </div>
    )
  })
  return (
    <div className="flex flex-col">
        <Label className="text-sm">{title}</Label>
    <RadioGroup  defaultValue="option-one" className="">
  
    {allGroupe}
  </RadioGroup>
  </div>
  
  )
}
export default RadioGroupeComponent