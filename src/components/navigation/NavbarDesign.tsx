"use client"
import { useParams } from "next/navigation"
import { DialogComponent } from "../DialogComponent"
import SubmitComponent from "../SubmitComponent"

const NavbarDesign = () => {
    const idParam=useParams()
  return (
   <div className=" w-full flex py-2 justify-end px-10 bg-white  ">
    <div className="flex gap-6  items-center justify-center">
    <SubmitComponent idForm={idParam.id as string}/>

    <DialogComponent/>
  
    </div>
    
    <div>

    </div>
   </div>
  )
}
export default NavbarDesign