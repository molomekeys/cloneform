"use client"
import { Switch } from "@/components/ui/switch"
import { Label } from "@radix-ui/react-label"
import { useId } from "react"
import {useAppDispatch} from "../../../app/hook"
import {changeOptionalInput, changeOptionChoice, changeToTextArea} from "../../../features/formInput/formSlice"
interface SwitchComponentProps{
    value:boolean
    title:string
    id:string
    isForText:boolean
}
const SwitchComponent = ({value,id,title,isForText}:SwitchComponentProps) => {
    const dispatch=useAppDispatch()
    const idHtml=useId()
  return (
    <div className="flex items-center justify-center gap-4">
        <Switch 
             onClick={()=>{
                if(isForText)
                {
                    dispatch(changeToTextArea(id))
                }
                else {
                    dispatch(changeOptionalInput(id))

                }
            }}
        checked={value}  id={id}
        />
        <Label className="whitespace-nowrap"
   
            onClick={()=>{
                
                if(isForText)
                {
                    dispatch(changeToTextArea(id))
                }
                else {
                    dispatch(changeOptionalInput(id))

                }
            }

        }
        htmlFor={id}>{title}</Label>
    </div>
  )
}
export default SwitchComponent