"use client"
import { useAppSelector } from "@/app/hook"
import { boolean } from "zod"
import { SelectComponent } from "./SelectComponent"
import SwitchComponent from "./SwitchComponent"
interface FooterInputProps {
    type:string 
    valueBol:boolean
}
const FooterInput = ({type,valueBol}:FooterInputProps) => {
    const idSelected= useAppSelector(e=>e.form.idSelected)
  return (
    <div className="flex justify-between items-center w-full gap-20">
        <div className="flex w-full gap-20 ">
<SwitchComponent  isForText={false} value={valueBol} id={idSelected} title="Optional"/>
<SwitchComponent  isForText  value={type==="textarea"? true : false}  id={idSelected} title="Réponse longue "/> 
</div>
<div className="w-full ">
<SelectComponent/>
</div>
    </div>
  )
}
export default FooterInput