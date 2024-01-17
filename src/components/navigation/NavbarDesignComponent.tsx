"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
const NavbarDesignComponent = () => {
const stringTest=usePathname()
  return (
 <nav className="flex w-full justify-between px-10 py-2">
   <Link href="/pages "className="text-3xl font-semibold ">
      Easyform</Link>
    <div className="flex gap-4">
  {/* { stringTest!="/pages"&& <Link href={'/pages'} >

         <Button>Dashboard</Button>
       </Link>} */}
      

    </div>
 </nav>
  )
}

export default NavbarDesignComponent