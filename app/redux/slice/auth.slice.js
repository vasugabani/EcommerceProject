import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
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

export const signinGoogle = createAsyncThunk(
    'auth/signinGoogle',
    async () => {


        try {

            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const user = await GoogleSignin.signIn();
            console.log("uuuuuuuuuuuuuuu", user);

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);

            console.log("ggggggggggggggggg", googleCredential);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
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
        builder.addCase(signinGoogle.fulfilled, (state, action) => {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaa", action);

            state.user = action.payload;
        })
    }
});

export default authSlice.reducer;