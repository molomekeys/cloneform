"use client"
import { useAppSelector } from "@/app/hook"
import { boolean } from "zod"
import { SelectComponent } from "../mycomponent/components/SelectComponent"
import SwitchComponent from "../mycomponent/components/SwitchComponent"
interface FooterInputProps {
    type:string 
    valueBol:boolean
    isText:boolean
}
const FooterInput = ({type,valueBol,isText}:FooterInputProps) => {
    const idSelected= useAppSelector(e=>e.form.idSelected)
  return (
    <div className="flex justify-between items-center w-full gap-20">
        <div className="flex w-full gap-20 ">
<SwitchComponent  isForText={false} value={valueBol} id={idSelected} title="Optional"/>
{isText&&<SwitchComponent  isForText  value={type==="textarea"? true : false}  id={idSelected} title="Réponse longue "/> 
}</div>
<div className="w-full ">
<SelectComponent defaultValue={type}/>
</div>
    </div>
  )
}
export default FooterInput