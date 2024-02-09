import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    favourite: [],
    error: null
}

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addToFavourite: (state, action) => {
            

            const favIndex = state.favourite.findIndex((v) => v === action.payload)


            if (favIndex === -1) {
                state.favourite.push(action.payload);
            } else {
                state.favourite.splice(favIndex, 1)
            }

            // console.log(favIndex, "222222222222222222");
            // console.log(state.favourite);
            // console.log(action.payload,"11111111111111111111");
        }
    }
})

export const { addToFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer