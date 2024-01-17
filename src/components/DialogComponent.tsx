"use client"
import { Copy } from "lucide-react"
import { IoCopy, IoDuplicate } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover,PopoverContent,PopoverTrigger } from "@radix-ui/react-popover"
import { usePathname,useParams} from "next/navigation"
import { useRef,useState } from "react"
export function DialogComponent() {
    const router =usePathname()
    const param=useParams()
    const refInput=useRef<HTMLInputElement>(null)
    const valueInput=`https://easyform.vercel.app/answer/${param.id}`
    const[isCopied,setIsCopied]= useState(false)
  return (
    <Popover onOpenChange={(isOpen)=>{
        if(isOpen)
        {
            refInput.current?.focus()
        }
        else {
            setIsCopied(false)
        }
        
    }} >
    <PopoverContent className="bg-slate-100 flex flex-col
    relative
    rounded-lg p-3 px-6  gap-2
    ">
<h3 className=" font-semibold text-sm">Envoyer et recueillir les réponses</h3>
<div className="flex  py-2 gap-4 w-[400px]">
<Input
ref={refInput}
 value={valueInput}/>
<button
onClick={()=>{
    navigator.clipboard.writeText(valueInput)
    setIsCopied(true)
}}
className="hover:bg-slate-100 p-2 rounded-mg hover:duration-150"><IoCopy size={20}/>
</button>
</div>
{isCopied&&<p className="text-xs text-teal-600 font-semibold">{`Ce lien est prêt à être collé.`}</p>}
    </PopoverContent>
    <PopoverTrigger ><Button>{`Collecte des réponses`}</Button></PopoverTrigger>

  </Popover>
  
  )
}
