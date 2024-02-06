import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemAvailableIndex = state.cart.findIndex((v) => v.id === action.payload);

            console.log(itemAvailableIndex);

            if (itemAvailableIndex === -1) {
                state.cart.push({id: action.payload, qty: 1})
            } else {
                state.cart[itemAvailableIndex].qty++
            }

            console.log("carttttttttttttttttttttttttt", state.cart);
            //console.log("payyyyyyyyyyyyyyyyyy", action.payload);
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer

// [
//     {id: 15, qty: 3},
//     {id: 24, qty: 2},
//       {id: 85, qty: 1},
// ]