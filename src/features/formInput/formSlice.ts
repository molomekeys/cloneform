import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {v4} from "uuid"
// Define a type for the slice state

interface OptionalquestionType{
    choice?:string[]
}
export interface formCreated{

        id:string
        title:string
        optional:boolean
       
        type:string
        optionalquestion:OptionalquestionType|null
     
}
interface FormStat {
 idSelected:string,
 formCreated:formCreated[]
 
}
interface ChangeTitle{
    id:string 
    newTitle:string
}
interface PayLoadChangeOption{
    id:string 
    indexChange:number 
    newOption:string
}
interface deleteSpecifiqueOption{
    id:string 
    indexChange:number
}

// Define the initial state using that type
const initialState: FormStat = {
  idSelected:"",
  formCreated:[]
}

export const formSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    setInitialState:(state,action:PayloadAction<formCreated[]>)=>{
        state.formCreated=action.payload

    },
    reseatSelect:(state)=>{
        state.idSelected=""
    },changeOptionChoice:(state,action:PayloadAction<PayLoadChangeOption>)=>{
        const {id,indexChange,newOption}=action.payload
        const newArrayState=[...state.formCreated]
        const newArray=newArrayState.filter((e)=>{
            
            if(e.id===id)
            {
                
                if(e.optionalquestion?.choice)
                {
                e.optionalquestion.choice[indexChange]=newOption
                return  e
                }
            }
            else {
                return e
            }
        })
        state.formCreated=newArray

    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    selectForm: (state, action: PayloadAction<string>) => {
      state.idSelected=action.payload
    },deleteForm:(state,action:PayloadAction<string>)=>{
        const newState=[...state.formCreated]
        const filtereState=newState.filter((e)=>{
            if(e.id!==action.payload)
            {
                return e
            }
            else {

            }
        })
        state.formCreated=filtereState

    },reOrderInput:(state,action:PayloadAction<formCreated[]>)=>{
        state.idSelected=""
        state.formCreated=action.payload
    },duplicateForm:(state,action:PayloadAction<string>)=>{
        const newState=[...state.formCreated]
        const id=action.payload
        const filtereIndex=newState.findIndex(b=>b.id===id)
        const theActualValue=newState[filtereIndex]
        const newId=v4()
        state.idSelected=newId
      state.formCreated.splice(filtereIndex,0,{...theActualValue,id:newId})
    
       
    },
    addNewForm:(state,action:PayloadAction<formCreated>)=>{
        state.idSelected=action.payload.id
       
        state.formCreated=[...state.formCreated,{...action.payload}]

    },changeOptionalField:(state,action:PayloadAction<string>)=>{
        const id=action.payload
        const newState=[...state.formCreated]
         let filteredArray=newState.map((e)=>{
            if(e.id===id)
            {
                return {...e,optional:!e.optional}
            }
            else {
                return e
            }
         })
            state.formCreated=filteredArray
    }
    ,deleteSpecifiqueOption:(state,action:PayloadAction<deleteSpecifiqueOption>)=>{

const {id,indexChange}=action.payload
const newArray=[...state.formCreated]
const newArrayOption=newArray.map((e)=>{
    if(e.id===id&&e.optionalquestion?.choice)
    {
      
            const newOptionArray=e.optionalquestion.choice.slice(0,indexChange).concat(
                e.optionalquestion.choice.slice(indexChange+1))
            e.optionalquestion.choice=newOptionArray
            return e
        
       
    }
    else {
        return e
    }
})
if(newArrayOption)
{
state.formCreated=newArrayOption
}
    }
  ,changeSpecifiqueLabel:(state,action:PayloadAction<ChangeTitle>)=>{
        const {id,newTitle}=action.payload
        const newState=[...state.formCreated]
         let filteredArray=newState.map((e)=>{
            if(e.id===id)
            {
                return {...e,title:newTitle}
            }
            else {
                return e
            }
         })
            state.formCreated=filteredArray
    }
    
  },
})

export const {setInitialState,deleteSpecifiqueOption,changeOptionChoice,reOrderInput,changeOptionalField,duplicateForm,deleteForm,changeSpecifiqueLabel,addNewForm, selectForm,reseatSelect } = formSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default formSlice.reducer