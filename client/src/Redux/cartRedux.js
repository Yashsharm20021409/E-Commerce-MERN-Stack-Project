import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        product:[],
        quantity:0,
        total:0
    },
    reducers:{
        // state = previous state 
        addProduct:(state,action)=>{
            state.quantity += 1;
            // payload is new product
            state.product.push(action.payload)
            state.total += action.payload.price * action.payload.quantity;
        },
    },
})

export const { addProduct} = cartSlice.actions;
export default cartSlice.reducer;