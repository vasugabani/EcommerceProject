import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading:false,
    cart:[],
    error:null
}

const cartSlice= createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        addToCart : (state, action) => {
            // console.log(action.payload,"action payloaddddddddddddddddd");

            const itemAvaible = state.cart.findIndex((v)=>v.id === action.payload)
            console.log(itemAvaible,"0000000000000000000000000000");

            if(itemAvaible === -1){
                state.cart.push({id:action.payload , qty : 1})
            }else{
                state.cart[itemAvaible].qty++
            }

            console.log(state.cart,"11111111111111111111111111");
        }
    }
});

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer