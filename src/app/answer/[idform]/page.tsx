import ShowData from "../../../components/mycomponent/components/ShowData"
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs"
import {cookies} from "next/headers"
import { useRouter } from "next/navigation"
import { InputWithLabel } from "@/components/mycomponent/components/InputWithLabel"
import { RadioGroup } from "@/components/ui/radio-group"
import RadioGroupeComponent from "@/components/mycomponent/components/RadioGroupeComponent"
import FormComponent from "@/components/FormComponent"
import SubmitComponent from "@/components/SubmitComponent"

const page = async ({ params }: { params: { idform: string } }) => {
 
    

    const supabase=createServerComponentClient<Database>({cookies})
  
    const {data}=await supabase.from("questiontable")
    .select(`id,title,type,order,optional,forms(
      title
    )
    `).eq("form_id",params.idform)

console.log(params.idform)
// const inputFormComponent=data?.map((e)=>{
// switch(e.type)
// {
//   case "text":
//   return <InputWithLabel
//   id={e.id}
//   title={e.title? e.title :""} key={e.id}/>
//   break;
//   case "multiple_choice":
//   return <RadioGroupeComponent option={e?.optionalquestion?.choice||[""]}
//   title={e.title? e.title : ""}/>
//   break;

// }
// })
if(!data)
{
  return 
}
const extractedForms = data.map(item => item.forms);
const newData = data.map(({ forms, ...rest }) => rest);
  return (
  <div className="flex flex-col 
  bg-gradient-to-tr from-teal-200 items-center justify-center to-teal-600  
    h-screen w-screen' ">
   
   <div className="flex w-full gap-20  lg:w-3/5 min-h-[600px] flex-col bg-white  gap-4 p-10 gap-4">
    <div>
      <h2 className="text-5xl">{extractedForms[0]?.title}</h2>
    </div>
    <div className="h-full">
   <FormComponent data={newData} />
   </div>
 
   </div>
   </div>
   
  )
}
export default page