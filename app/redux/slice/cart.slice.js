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

            // console.log(state.cart,"11111111111111111111111111");
        },
        incrementCart:(state,action) => {
            console.log(action.payload,"222222222222222222222222");
        
            const plusIndex = state.cart.findIndex((v)=>v.id === action.payload)
            console.log(plusIndex,"1212121212121212121212121212");
           
            state.cart[plusIndex].qty++
        },
        decrementCart:(state, action)=>{
            const minusIndex = state.cart.findIndex((v)=>v.id===action.payload)
            console.log(minusIndex);

            state.cart[minusIndex].qty--
        },
        removeCart : (state,action)=>{
            const removeData = state.cart.findIndex((v)=>v.id === action.payload)
            state.cart.splice(removeData,1)
        }
    }
});

export const { addToCart, incrementCart, decrementCart, removeCart } = cartSlice.actions
export default cartSlice.reducer