import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auth from '@react-native-firebase/auth';

const initialState = {
    isLoading: false,
    user: null,
    error: null
}

export const signupEmailPass = createAsyncThunk(
    'auth/signupEmailPass',
    async (data) => {
        console.log(data);

        await auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(async (userCredential) => {
                console.log('User account created & signed in!', userCredential);
                await userCredential.user.sendEmailVerification();
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

export const loginEmailPass = createAsyncThunk(
    'auth/loginEmailPass',

    async (data) => {
        console.log("000000000000000", data);
        const user = await auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
                console.log('User account created & signed in!', user);

                if (user.user.emailVerified) {
                    console.log("your account is log in ");

                    return user.user;
                } else {
                    console.log("please verify your email");
                }


            })

            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                if (error.code === 'auth/invalid-credential') {
                    console.log("invalid email or password");
                }

                console.error(error);
            });

        return user;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginEmailPass.fulfilled, (state, action) => {
            console.log("888888888888888", action);

            state.user = action.payload;
        })
    }
});

export default authSlice.reducer;