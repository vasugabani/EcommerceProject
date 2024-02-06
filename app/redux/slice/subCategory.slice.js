import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

/////////////          File Of Categories.js        ///////////////////////

const initialState = {
    isLoading: false,
    subCatData: [],
    error: null,
}

export const getSubCatData = createAsyncThunk(
    'subCategory/get',

    async () => {
        let data = [];
        try {
            await firestore()
                .collection('subCategory')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {

                        data.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data()
                        })
                    });
                });
            return data;
        } catch (error) {
            return error
        }
    }
)

export const addSubCatData = createAsyncThunk(
    'subCategory/add',

    async (data) => {
        console.log("dataaaaaaaaaaa", data);
        await firestore()
            .collection('subCategory')
            .add(data)
            .then((doc) => {
                console.log('User added!');
                data.id = doc.id;

            });
        console.log("return dataaaaaaaaaaa", data);
        return data;
    }
)

export const deleteSubCatData = createAsyncThunk(
    'subCategory/delete',

    async (data) => {
        console.log("delete slice", data);
        await firestore()
            .collection('subCategory')
            .doc(data.id)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
        return data.id;
    }
)

export const updateSubCatData = createAsyncThunk(
    'subCategory/update',

    async (data) => {
        console.log(data, "updateee sliceee");

        let newData = { ...data };
        delete newData.id;

        await firestore()
            .collection('subCategory')
            .doc(data.id)
            .update(newData)
            .then(() => {
                console.log('User updated!');
            });

        return data;
    }
)

const subCategorySlice = createSlice({
    name: "subCategory",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubCatData.fulfilled, (state, action) => {
            state.subCatData = action.payload
        })
        builder.addCase(addSubCatData.fulfilled, (state, action) => {
            console.log("actionnnnnnnnnnnnnnnn", action.payload);

            state.subCatData.push(action.payload)
        })
        builder.addCase(deleteSubCatData.fulfilled, (state, action) => {
            state.subCatData = state.subCatData.filter((v) => v.id !== action.payload)
        })
        builder.addCase(updateSubCatData.fulfilled,(state,action)=>{
            state.subCatData = state.subCatData.map((v)=>{
                if(v.id === action.payload.id){
                    return action.payload
                }else{
                    return v
                }
            })
        })
    }
})

export default subCategorySlice.reducer