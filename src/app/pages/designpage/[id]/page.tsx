import FormCreation from "@/components/FormCreation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import SubmitComponent from "@/components/SubmitComponent"
import {cookies} from "next/headers"
import NavbarDesign from "@/components/navigation/NavbarDesign"
import Navbar from "@/components/navigation/Navbar"
import NavbarDesignComponent from "@/components/navigation/NavbarDesignComponent"
const page = async({params}:{params:{id:string}}) => {
  const supabase = createServerComponentClient<Database>({cookies})
  const {data,error}=await supabase.from("forms").select(`*,
  questiontable(
    id,title,type,optional,order,
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
    let dataSort=data.questiontable.sort((a,b)=>a.order-b.order)
    let filteredData=dataSort.map(({order,...rest})=>{
      return rest
    })
  return (
  <main className="flex flex-col h-screen w-full items-center bg-gradient-to-tr  from-teal-200 to-teal-600">
<NavbarDesignComponent/>
    <NavbarDesign/>

    <div className="w-full flex flex-col items-center overflow-scroll  mt-10 ">
    <div className="flex flex-col w-3/5 bg-white  rounded-lg  ">
 <div className="flex flex-col    ">
    <FormCreation title={data.title||""}
     data={filteredData}/>
    </div>

    </div>
    </div>
   
  </main>
  )
}
}
export default page