"use client"
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectComponentProps{

  defaultValue:string
}
export function SelectComponent({defaultValue}:SelectComponentProps) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Restriction" />
      </SelectTrigger>
      <SelectContent>
       
     
        <SelectGroup>
     <SelectLabel>Choissez un type de valeur</SelectLabel>
     <SelectItem value="number">Nombre</SelectItem>
     <SelectItem value="date">Date</SelectItem>
     <SelectItem value="text">Text</SelectItem>


        </SelectGroup>
    
     
      
      </SelectContent>
    </Select>
  )
}
