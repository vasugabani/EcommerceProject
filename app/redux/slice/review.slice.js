import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

const initialState = {
    isLoading: false,
    review: [],
    error: null
}

export const addReview = createAsyncThunk(
    'review',
    async (data) => {
        console.log(data, "ddddddddddddddddd");
        await firestore()
            .collection('review')
            .add(data)
            .then(() => {
                console.log('User added!');
            });

        return data;
    }
)

const reviewSlice = createSlice({
    name: 'review',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addReview.fulfilled, (state, action) => {
            // console.log(action.payload, "aaaaaaaaaaaaaaaaaaaaaaa");
            state.review = action.payload
        })
    }
})

export default reviewSlice.reducer
