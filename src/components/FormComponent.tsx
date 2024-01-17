"use client"
import { Form,FormControl,FormDescription,FormField,FormLabel,FormItem,FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import RadioGroupeComponent from "./mycomponent/components/RadioGroupeComponent"
import { Label } from "@radix-ui/react-label"
import {v4} from "uuid"
import { ZodTypeAny } from "zod"
import {useId} from "react"
import { register } from "module"
import { Textarea } from "./ui/textarea"
let momo={
    name:z.string().min(1,{message:"too small"}),
    email:z.string().email(),
    question:z.string()
}
interface DynamicObject {
    [key: string]: any; // This allows any string key with any value type
  }
  interface Field {
    title:string 
    optional:boolean
    type:string
    id:string
    order:number
  }

  interface FormComponentProps{
    data:Field[]
  }

const zodTest=z.object({
    username:z.string()
})
const FormComponent = ({data}:FormComponentProps) => {


console.log(data)
    interface DefaultValues {
        [key: string]: string; // This allows any string as a key and the value can be of any type
    }
    const createCustomSchema=(field:Field[])=>{

        let object=z.object({})
        field.forEach((e)=>{

            let safetitle=e.title.replace(".","")
            switch(e.type)
            {
                case "text" :
                    if(e.optional)
                    {
                    object= object.merge(z.object({
                        [safetitle]:z.string().optional()
                    }))
                }
                else {
                    object= object.merge(z.object({
                        [safetitle]:z.string().min(1,`Vous devez indiquer une valeur ${safetitle}`)
                    }))
                }
                break;
                case "number" :
                    if(e.optional)
                    {
                        object= object.merge(z.object({
                            [safetitle]:z.string().optional().transform(v=>parseInt(v||"0")).refine(
                                (e)=>(!isNaN(e)),{message:"Valeur non valide"}
                            )}))
        }
        else {
            object= object.merge(z.object({
                [safetitle]:z.string().min(1,{message:"Vous devez indiquez une valeur"}).transform(v=>parseInt(v)).refine(
                    (e)=>(!isNaN(e)),{message:"valeur non valide"}
                )}))
        }
                    break;
            }
        })
      
  
        return object
    
      }
    
    
    const formSchema=createCustomSchema(data)

    const createDefaultValuesTest = (fields:Field[]) => {
        return fields.reduce((acc:DefaultValues, field) => {

           let  safeText=field.title.replace("."," ")
            if (field.type === "text"||"textarea") {
                acc[safeText] = ""; // Default to empty string for strings
            } else if (field.type === "number") {
                acc[safeText] = ""; // Default to 0 for numbers
            }
            // Add more type cases here if necessary
            return acc;
        }, {});
    };
    let defaultVal=createDefaultValuesTest(data)
 
   console.log(defaultVal)
    const form=useForm({
        defaultValues:
           defaultVal,
        resolver:zodResolver(formSchema)
    },)
const momo=useForm<z.infer<typeof zodTest>>()

    function onSubmit(val:any) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("in the form")
       console.log(val)
      
      }

      let allValues=data.map((e)=>{
       console.log(e)
       const test=e.title.replace("."," ")
       const singleId=useId()
        return(
          
          <div className="flex flex-col gap-2">
                      <Label 
                        htmlFor={singleId}
                      className="font-semibold text-slate-600 text-sm">{`${+e.order+". "+e.title}${e.optional?"":"*"}` }</Label>      
                        
                       {e.type==="textarea"?
                        <Textarea id={singleId}  {...form.register(test)}
                         
                         className="resize-none"
                        />
                       :
                        <Input id={singleId} type={e.type}  {...form.register(test)}
                         
                         
                         />}
                         <p className="text-xs text-red-500 font-semibold py-2">{form.formState.errors[test]?.message}</p>
                      
                          
                                
               </div>
            )}
           
        )

  

     console.log(allValues)
  return (
  <section className="flex flex-col gap-2">
<Form {...form}>
    <form  className="h-full w-full flex flex-col gap-2"
    onSubmit={form.handleSubmit(onSubmit)}>
        <div className="h-full gap-4">
{allValues}
</div>
<div className="w-full flex justify-center my-auto"
><Button className="flex relative my-auto
self-center justify-self-end" type="submit">Submit</Button>
</div>

    </form>

</Form>
  </section>
  )
}
export default FormComponent

