import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auth from '@react-native-firebase/auth';

const initialState = {
    isLoading: false,
    auth: [],
    error: null
}

export const signupEmailPass = createAsyncThunk(
    'auth/signupEmailPass',
    async (data) => {
        console.log(data);

        await auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: {

    }
});

export default authSlice.reducer;