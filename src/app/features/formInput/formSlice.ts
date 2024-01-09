import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {v4} from "uuid"
// Define a type for the slice state
interface formCreated{

        id:string
        optional:boolean
        inputLabel:string
     
}
interface FormStat {
 idSelected:string,
 formCreated:formCreated[]
 
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
    reseatSelect:(state)=>{
        state.idSelected=""
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
        state.formCreated=[...state.formCreated,action.payload]

    },changeSpecifiqueLabel:(state,action:PayloadAction<formCreated>)=>{
        const {id,inputLabel,optional}=action.payload
        const newState=[...state.formCreated]
         let filteredArray=newState.map((e)=>{
            if(e.id===id)
            {
                return {...e,inputLabel:inputLabel,optional}
            }
            else {
                return e
            }
         })
            state.formCreated=filteredArray
    }
    
  },
})

export const {duplicateForm,deleteForm,changeSpecifiqueLabel,addNewForm, selectForm,reseatSelect } = formSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default formSlice.reducer