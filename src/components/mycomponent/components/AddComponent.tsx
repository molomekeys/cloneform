"use client"

import { useState } from "react"
import { useAppDispatch } from "../../../app/hook"
import { addNewForm } from "../../../features/formInput/formSlice"
import { Button } from "@/components/ui/button"
import {v4} from "uuid"
const AddComponent = () => {
    const [isSelected,setIsSelected]=useState(false)
    const dispatch=useAppDispatch()
  return (
   <div className="py-8">
    {isSelected?<div className="flex gap-4 ">
    <p onClick={()=>setIsSelected(e=>!e)}>+</p>
        <div>
           
            <button onClick={()=>{
                 dispatch(addNewForm({id:v4(),title:"Entrez votre question",
                 optional:false,type:"multiple_choice"
                 ,optionalquestion:{choice:["Entrez une question","Entrez une question"]}}))
            }}
            >Choix</button>
            </div>
            <div>
            <p onClick={()=>{
                dispatch(addNewForm({id:v4(),optionalquestion:{},title:"Entrez votre question",optional:false,type:"text"}))
            }}>Text</p>
            </div>
    </div>:
    <Button onClick={()=>setIsSelected((e)=>!e)}>Ajouter</Button>}
   </div>
  )
}
export default AddComponent