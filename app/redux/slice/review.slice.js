import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

const initialState = {
    isLoading: false,
    review: [],
    error: null
}

export const getReview = createAsyncThunk(
    'review/get',
    async () => {
        let review = []
        await firestore()
            .collection('review')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    review.push(documentSnapshot.data())
                    // review[documentSnapshot.id] = documentSnapshot.data(); // Store data with document ID as key
                });
            });
        // console.log(review, "1111111111111111111111111111");
        return review;
    }
)
export const addReview = createAsyncThunk(
    'review',
    async (data) => {
        // console.log(data, "ddddddddddddddddd");
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
            state.review.push(action.payload)
            // console.log(state, "aaaaaaaaaaaaaaaaaaaaaaaddddddddddddddddddddd");
        })
        builder.addCase(getReview.fulfilled, (state, action) => {
            // console.log(action.payload, "2222222222222222222222222");
            state.review = action.payload
            // console.log(state, "3333333333333333333333333333333333");
        })
    }
})

export default reviewSlice.reducer
