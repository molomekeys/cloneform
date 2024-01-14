"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const CreateForm = () => {
    const router=useRouter()
    const supabase=createClientComponentClient<Database>()
    async function addForn(){
        const test=await supabase.from("forms").insert({
                title:"Nouveau Questionnaire"
        })
        router.refresh()
    }
  return (
    <Button onClick={addForn}>Ajouter un formulaire</Button>
  )
}
export default CreateForm