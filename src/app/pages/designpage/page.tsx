"use client"
import Image from 'next/image'
import { useState } from 'react'
import InputForm from '../../../components/mycomponent/components/InputForm'
import {useAppDispatch, useAppSelector} from "../../hook"
import {v4} from "uuid"
import {useDebounce} from "use-debounce"
import { addNewForm, reOrderInput, reseatSelect } from '../../../features/formInput/formSlice'
import { Reorder,useDragControls } from 'framer-motion'
import MultipleChoice from '../../../components/mycomponent/components/MultipleChoice'
import AddComponent from '../../../components/mycomponent/components/AddComponent'
import SubmitComponent from '../../../components/mycomponent/components/SubmitComponent'
interface InputDataState{
 labelInput:string ,optional:boolean,id:string


}
export default function Home() {


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

  const allInput=allValue.map((e,i)=>{

      
      
     switch(e.type)
     {
      case"text":
     return <InputForm  
     
     optionQuestion={e.option[0]}
     valueOfDar={e}
 
     optional={e.optional}
     key={e.id} title={e.title}
     inputLabel={e.inputLabel}
     isSelected={e.id===Test} id={e.id} number={i+1}/>
   
     
     break ;
     case "multiple_choice":
     return <MultipleChoice title={e.title}
     option={e.option}
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
  <main className='flex flex-col bg-gradient-to-tr from-teal-200 items-center justify-center  to-slate-100  min-h-screen'>

    <SubmitComponent/>
     
      
      <section className='flex flex-col bg-white w-3/5  h-full p-20 ' onClick={(e)=>{
     e.stopPropagation()
      dispatch(reseatSelect())
      }}>
    
        <div className=' flex flex-col gap-8 p-4   min-h-[400px] text-slate-800'>
        <h3 className='pl-10 text-2xl py-2'>Questionaire</h3>
        <Reorder.Group  transition={{duration:0.25}}
        
        axis='y' values={allValue} 
        className="gap-2 flex flex-col"
        onClick=
        {(e)=>e.stopPropagation()}
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
