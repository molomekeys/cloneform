"use client"
import { useAppSelector } from "@/app/hook"
import {createServerComponentClient,createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
const SubmitComponent = () => {
    const supabase =createClientComponentClient<Database>()
    const actualForm=useAppSelector(e=>e.form.formCreated)
    async function addRow(){
        const date = new Date()
        const {data,error}=await supabase.from("forms").insert({
            created_at:date.toDateString()
        }).select().single()
        if(error)
        {
            console.log(error)
        }
        else if(data)
        {
            //@ts-ignore
            const filteredForm=actualForm.map((e)=>{
                return ({title:e.title,form_id:data.id,type:e.type,optional:e.optional,choice:e.optionalquestion?.choice||['']})
            })

            const choiceQuestions = filteredForm.filter(q => q.type === "multiple_choice")
            const textquestion = filteredForm.filter(q => q.type !== 'multiple_choice');

            const choiceFiltered=choiceQuestions.map((e)=>({title:e.title,form_id:e.form_id,type:e.type}))
            const textFiltered=textquestion.map((e)=>({title:e.title,form_id:e.form_id,type:e.type}))

            
        let question=await supabase.from("questiontable").insert(textFiltered)

        let allIdOfQuestion=await supabase.from("questiontable").insert(choiceFiltered).select("id")
    
        let newArray=allIdOfQuestion.data?.map((e,i)=>{
            return {question_id:e.id,choice:choiceQuestions[i].choice}
        })
        if(newArray)
        {
            let choiceOption=await supabase.from("optionalquestion").insert(newArray)

        }
        }
        }
  return (
    <div onClick={addRow}>SubmitComponent</div>
  )
}
export default SubmitComponent