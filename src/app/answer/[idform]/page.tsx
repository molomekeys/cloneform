import ShowData from "../../../components/mycomponent/components/ShowData"
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs"
import {cookies} from "next/headers"
import { useRouter } from "next/navigation"
import { InputWithLabel } from "@/components/mycomponent/components/InputWithLabel"
import { RadioGroup } from "@/components/ui/radio-group"
import RadioGroupeComponent from "@/components/mycomponent/components/RadioGroupeComponent"

const page = async ({ params }: { params: { idform: string } }) => {
 
    

    const supabase=createServerComponentClient<Database>({cookies})
    const {data}=await supabase.from("questiontable")
    .select(`id,title,type,
    optionalquestion(
      *
    )
    `).eq("form_id",params.idform)
console.log(params.idform)
const inputFormComponent=data?.map((e)=>{
switch(e.type)
{
  case "text":
  return <InputWithLabel
  id={e.id}
  title={e.title? e.title :""} key={e.id}/>
  break;
  case "multiple_choice":
  return <RadioGroupeComponent option={e?.optionalquestion[0]?.choice||[""]}
  title={e.title? e.title : ""}/>
  break;

}
})
  return (
  <div className="flex flex-col 
  bg-gradient-to-tr from-teal-200 items-center justify-center  to-slate-100  h-screen w-screen' ">
   <p>{JSON.stringify(data)}</p>
   <div className="flex lg:w-3/5 min-h-[600px] flex-col bg-white  gap-4 p-10">
   {inputFormComponent}
   </div>
   </div>
   
  )
}
export default page