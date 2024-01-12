"use client"

import { useState } from "react"
import { useAppDispatch } from "../hook"
import { addNewForm } from "../features/formInput/formSlice"
import {v4} from "uuid"
const AddComponent = () => {
    const [isSelected,setIsSelected]=useState(false)
    const dispatch=useAppDispatch()
  return (
   <div>
    {isSelected?<div className="flex gap-4">
    <p onClick={()=>setIsSelected(e=>!e)}>+</p>
        <div>
           
            <button onClick={()=>{
                 dispatch(addNewForm({id:v4(),inputLabel:"Question",title:"Entrez votre question",optional:false,type:"multipleChoice",option:["Choissisez une question",
                 "Choissisez une question"]}))
            }}
            >Choix</button>
            </div>
            <div>
            <p onClick={()=>{
                dispatch(addNewForm({id:v4(),inputLabel:"Question",title:"Entrez votre question",optional:false,type:"singleChoice",option:["Choisissez une question"]}))
            }}>Text</p>
            </div>
    </div>:
    <button onClick={()=>setIsSelected((e)=>!e)}>Ajouter</button>}
   </div>
  )
}
export default AddComponent