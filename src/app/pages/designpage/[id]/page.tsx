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
  return (
  <main>
    <h2 className="text-3xl">{data?.title}</h2>
    <p>{JSON.stringify(data)}</p>
    <FormCreation data={data.questiontable}/>
  </main>
  )
}
}
export default page