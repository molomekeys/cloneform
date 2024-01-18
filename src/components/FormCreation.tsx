"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import InputForm from './forms/InputForm'
import {useAppDispatch, useAppSelector} from "../app/hook"
import {v4} from "uuid"
import {useDebounce} from "use-debounce"
import { addNewForm, formCreated,reOrderInput, reseatSelect,setInitialState } from '../features/formInput/formSlice'
import { Reorder,useDragControls } from 'framer-motion'
import MultipleChoice from './forms/MultipleChoice'
import AddComponent from './forms/AddComponent'
import SubmitComponent from './SubmitComponent'
import DateInput from './forms/DateInput'
import InputDateComponent from './forms/InputDateComponent'
interface InputDataState{
 labelInput:string ,optional:boolean,id:string


}
interface FormCreationProps{
  data? :formCreated[]
  title:string
}
export default function FormCreation({data,title}:FormCreationProps) {

console.log(data)
  const [isAddedData,setIsAddedData]=useState<InputDataState[]>([])
const Test=useAppSelector(e=>e.form.idSelected)
  const dispatch=useAppDispatch()
  function AddInput(data:InputDataState){
    setIsAddedData((e)=>{
      return [...e,data]
    })
  }
  const allValue=useAppSelector(v=>v.form.formCreated)
  const controls = useDragControls()
  useEffect(()=>{
if(data)
{
    dispatch(setInitialState(data))
  }
  },[])

  const allInput=allValue?.map((e,i)=>{

      
      
     switch(e.type)
     {
      case "date":
        return <InputDateComponent index={i+1}
        valueTest={e}
        id={e.id} isSelected={e.id===Test} 
        key={e.id}
        title={e.title}/>
        break;
      case "number":
        case"textarea":
      case"text":
     return <InputForm  
      type={e.type}
    
     valueOfDar={e}
 
     optional={e.optional}
     key={e.id} title={e.title}
    
     isSelected={e.id===Test} id={e.id} number={i+1}/>
   
     
     break ;
     case "multiple_choice":
     return <MultipleChoice title={e.title}
     option={e.optionalquestion?.choice||[]}
     key={e.id}
     values={e}
     isSelected={e.id===Test}
     id={e.id}
     numberQuestion={i+1}/>
     break;
  
  
     }
     
  })
  console.log(allInput)
  const [isText,setIsText]=useState("")
  const [value]=useDebounce(isText,1000)
  return (
  <main className='flex flex-col bg-gradient-to-tr  i
  tems-center justify-center  min-h-screen'>


     
      
      <section className='flex flex-col bg-white w-full  h-full px-8  ' onClick={(e)=>{
     e.stopPropagation()
      dispatch(reseatSelect())
      }}>
    
    <h3 className='text-2xl font-semibold pt-16 pl-8'>{title}</h3>
        <div className=' flex flex-col gap-8 p-4   min-h-[400px] text-slate-800'>
        <Reorder.Group  transition={{duration:0.25}}
        
        axis='y' values={allValue} 
        className="gap-8 flex flex-col"
        onClick=
        {(e)=>{e.stopPropagation()
          dispatch(reseatSelect())
                }        }
        onReorder={(e)=>{
          
          console.log(e)
          dispatch(reOrderInput(e))}}>   
               {allInput}</Reorder.Group>

               </div>
               <div>
                <AddComponent/>
               </div>
              
      </section>
    
    </main>
  )
}
