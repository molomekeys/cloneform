"use client"
import Image from 'next/image'
import { useState } from 'react'
import InputForm from './components/InputForm'
import {useAppDispatch, useAppSelector} from "./hook"
import {v4} from "uuid"
import { addNewForm, reseatSelect } from './features/formInput/formSlice'
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
  const allInput=allValue.map((e,i)=>{
    return (
     <InputForm   key={v4()}
     inputLabel={e.inputLabel}
     isSelected={e.id===Test} id={e.id} number={i}/>
    )
  })
  return (
  <main className='flex flex-col bg-gradient-to-tr from-teal-200 to-slate-100  min-h-screen'>

      <div>
      
      </div>
      <section className='w-full flex  items-center justify-center h-full p-20 ' onClick={(e)=>{
     
      dispatch(reseatSelect())
      }}>
     
        <div className='w-3/5 flex flex-col gap-8 p-4 bg-white  min-h-[400px] text-slate-800'>
        <h3 className='pl-10 text-2xl py-2'>Questionaire</h3>
        {allInput}
        <button 
        className='bg-teal-600 w-fit text-slate-100 px-8 py-2 rounded-lg font-semibold'
        onClick={()=>{
          dispatch(addNewForm({
            id:v4(),inputLabel:"Question",optional:false
          }))
        
        }
        }>Ajouter</button>
        </div>
      </section>
    </main>
  )
}
