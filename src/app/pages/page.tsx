import FormMiniatureComponent from "@/components/FormMiniatureComponent"
import NavbarPages from "@/components/mycomponent/components/NavbarPages"
import CreateForm from "@/components/mycomponent/CreateForm"
import NavbarDesignComponent from "@/components/navigation/NavbarDesignComponent"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {cookies} from "next/headers"
import {v4} from "uuid"
async function page() {
 
  let momo=[<div key={v4()} className="aspect-square bg-black"></div>]
  for(let i=0;i<100;i++)
  {
    momo.push(<div key={v4()} className="aspect-square bg-black"></div>)
  }
  
  const supabase =createServerComponentClient<Database>({cookies})
  const {data,error}=await supabase.from("forms").select(`*`)
  const allFormsComponent=data?.map((e)=>{
    return  <FormMiniatureComponent title={e.title||""} urlId={e.id} key={e.id}/>

  })
  if(error)
  {
    return <p>"error"</p>
  }
  return (
   <main className="flex flex-col items-center h-screen bg-slate-50 justify-center p-4">
    <NavbarDesignComponent/>

    <div className="w-4/5 flex items-end flex-col h-full  gap-10">
     <CreateForm/>

      <section className="grid grid-cols-4 gap-10  relative z-50  w-full h-full ">
      {allFormsComponent}
      </section>
    </div>
   </main>
  )
}
export default page