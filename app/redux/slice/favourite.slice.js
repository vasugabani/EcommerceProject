import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore, { firebase } from '@react-native-firebase/firestore';

const initialState = {
    isLoading: false,
    favourite: [],
    error: null
}
export const getFav = createAsyncThunk(
    'cart/getFav',

    async (userid) => {
        console.log("okkkkkkkkkkkkkkkkk", userid);
        let Cdata;
        try {
            await firestore()
                .collection('wishList')
                .doc(userid)
                .get()
                .then(documentSnapshot => {
                    console.log('User exists: ', documentSnapshot.exists);

                    if (documentSnapshot.exists) {
                        console.log('carttttttttttttttt data: ', documentSnapshot.data());
                        Cdata = documentSnapshot.data()
                    }
                });
            console.log("cadataaaaaaaaaaaaaaa", Cdata);
            return Cdata;
        } catch (error) {
            console.log(error);
        }

    }
)

export const addToFav = createAsyncThunk(
    'whishList/addToFav',
    async (data) => {
        // console.log(data, "ccccccccccccccccccccccccc");
        try {
            const favRef = await firestore().collection('wishList').doc(data.uid);
            const favDoc = await favRef.get()

            if (favDoc.exists) {
                await favRef.update({
                    fav: firebase.firestore.FieldValue.arrayUnion(data.id)
                })
                console.log('cart update !!!!!!!!!!');
            } else {
                await favRef.set({
                    fav: [data.id]
                })
                console.log('fav add !!!!!!!!!!!!!!');
            }

        } catch (error) {
            console.log(error.message);
        }

        const favRef = firestore().collection('wishList').doc(data.uid);
        const favDoc = await favRef.get();
        const favData = favDoc.data();
        // console.log("hhhheeeeeeeellllllooooooooooooo", favData);

        return favData;
    }
)

export const removeFav = createAsyncThunk(
    'wishList/removeFav',
    async (data) => {
        console.log("removee favvvvv    ", data);

        try {
            // console.log(data, "&&&&&&&&&&&&&&", uid);
            const favRef = firestore().collection('wishList').doc(data.uid);
            const favDoc = await favRef.get();
            const favData = favDoc.data();

            // favData.favourite

            if (favData && favData.fav) {

                const updatedfav = favData.fav.filter(item => item !== data.id);

                await favRef.update({
                    fav: updatedfav
                });

                console.log('Item removed from fav!     ');

                return updatedfav;
            } else {
                console.log('fav or item not found');
                return [];
            }


        } catch (error) {
            console.error('Error removing product from cart:', error);

            // You can throw the error to be handled by the Redux store
            throw error;
        }
    }
)

const handleLoading = (state, action) => {
    state.isLoading = true
    state.error = null
}

const handleError = (state, action) => {
    state.error = action.error.message
    state.isLoading = false
}

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        // addToFavourite: (state, action) => {


        //     const favIndex = state.favourite.findIndex((v) => v === action.payload)


        //     if (favIndex === -1) {
        //         state.favourite.push(action.payload);
        //     } else {
        //         state.favourite.splice(favIndex, 1)
        //     }    
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getFav.pending, handleLoading)
        builder.addCase(getFav.fulfilled, (state, action) => {
            state.favourite = action.payload.fav
            state.isLoading = false
            state.error = null
        })
        builder.addCase(getFav.rejected, handleError)

        builder.addCase(addToFav.pending, handleLoading)
        builder.addCase(addToFav.fulfilled, (state, action) => {
            state.favourite = action.payload.fav
            state.isLoading = false
            state.error = null
        })
        builder.addCase(addToFav.rejected, handleError)

        builder.addCase(removeFav.pending, handleLoading)
        builder.addCase(removeFav.fulfilled, (state, action) => {
            state.favourite = action.payload;
            state.isLoading = false
            state.error = null
        });
        builder.addCase(removeFav.rejected, handleError)
    }
})

// export const { addToFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer