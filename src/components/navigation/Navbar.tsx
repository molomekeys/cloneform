"use client"
import Link from "next/link"
import { Button } from "../ui/button"
const Navbar = () => {
  return (
 <nav className="flex w-full justify-between px-10 py-1">
   <Link href="/ "className="text-lg font-semibold ">
      Easyform</Link>
    <div className="flex gap-4">
       <Link href={'/pages'} >

         Dashboard
       </Link>
       <Link href={'/pages'} >
         
      Login

         </Link>

    </div>
 </nav>
  )
}
export default Navbar