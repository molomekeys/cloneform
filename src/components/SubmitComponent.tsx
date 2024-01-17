"use client"
import { useAppSelector } from "@/app/hook"
import {createServerComponentClient,createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { FaRegSave } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5"

interface SubmitComponentProps {
    idForm:string
}

const SubmitComponent = ({idForm}:SubmitComponentProps) => {
    const supabase =createClientComponentClient<Database>()
    const actualForm=useAppSelector(e=>e.form.formCreated)
  const router=useRouter()
   
    async function addRow(){
        
            //@ts-ignore
            const filteredForm=actualForm.map((e,i)=>{

                return ({title:e.title,form_id:idForm,order:i+1,
                    type:e.type,optional:e.optional,id:e.id,
                    choice:e.optionalquestion?.choice||['']})
            })


            const choiceQuestions = filteredForm.filter(q => q.type === "multiple_choice")

            const choiceFiltered=choiceQuestions.map((e)=>({
                title:e.title,form_id:e.form_id,type:e.type,id:e.id}))

            const textquestion = filteredForm.filter(q => q.type !== 'multiple_choice');

            const textFiltered=textquestion.map((e)=>({order:e.order,title:e.title,form_id:e.form_id,type:e.type,id:e.id,optional:e.optional}))

            
        let question=await supabase.from("questiontable").upsert(textFiltered)
               
        // let allIdOfQuestion=await supabase.from("questiontable").insert(choiceFiltered).select("id")
    
        // let newArray=allIdOfQuestion.data?.map((e,i)=>{
        //     return {question_id:e.id,choice:choiceQuestions[i].choice}
        // })
        // if(newArray)
        // {
        //     let choiceOption=await supabase.from("optionalquestion").insert(newArray)

        // }
        
        }
  return (
    <div
    onClick={addRow}
    className="bg-white cursor-pointer hover:bg-slate-200  rounded-md hover:duration-150 p-2">
        
        <IoSaveOutline
                

        size={30} color="black"/></div>
  )
}
export default SubmitComponent