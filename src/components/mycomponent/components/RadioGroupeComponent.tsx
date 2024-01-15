"use client"
import { FormControl, FormItem } from "@/components/ui/form";
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
    changeValue:()=>void,
    defaultValue:string
   
}
const RadioGroupeComponent = ({changeValue,title,option,defaultValue}:RadioGroupeProps) => {
  const allGroupe=option?.map((e)=>{
   
    return (
      <div 
      key={v4()}
      className="flex items-center space-x-2">
        <FormItem>
          <FormControl>
      <RadioGroupItem 
     
      key={v4()} value={e}  />
      </FormControl>
      <Label>{e}</Label>
      </FormItem>
    </div>
    
    )
  })
  return (
    <div className="flex flex-col">
        <Label className="text-sm">{title}</Label>
    <RadioGroup onValueChange={changeValue} 
    defaultValue={""} value={defaultValue} className="">
  
    {allGroupe}
  </RadioGroup>
  </div>
  
  )
}
export default RadioGroupeComponent