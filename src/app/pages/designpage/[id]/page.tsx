import FormCreation from "@/components/FormCreation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {cookies} from "next/headers"
const page = async({params}:{params:{id:string}}) => {
  const supabase = createServerComponentClient<Database>({cookies})
  const {data,error}=await supabase.from("forms").select(`*,
  questiontable(
    id,title,type,optional,
    optionalquestion(
      choice 
    ) 
  )`).eq("id",params.id).single()
  
  if(data==null)
  {
    return 
  }

  else {
    console.log(data.questiontable)
  return (
  <main className="flex flex-col w-full items-center bg-gradient-to-tr from-teal-200 to-teal-600">
    <div className="flex flex-col w-3/5">
    <h2 className="text-3xl">{data?.title}</h2>
 
    <FormCreation data={data.questiontable}/>
    </div>
  </main>
  )
}
}
export default page