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

export function SelectComponent() {
  return (
    <Select defaultValue="text">
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
