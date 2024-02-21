import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import firestore, { firebase } from '@react-native-firebase/firestore';


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
                await firestore()
                    .collection('users')
                    .doc(userCredential.user.uid)
                    .set({ name: data.name, email: data.email, emailVerified: false, createdAt: new Date().toString(), updatedAt: new Date().toString() })
                    .then((doc) => {
                        console.log('User added!');

                    });

                console.log("return dataaaaaaaaaaa", data);
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

    }
)

export const signinFacebook = createAsyncThunk(
    'auth/signinFacebook',
    async () => {
        try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw new Error('User cancelled the login process');
            }

            // Once signed in, get the user's AccessToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error('Something went wrong obtaining access token');
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(facebookCredential);
        } catch (error) {
            // Handle errors appropriately (e.g., log, display error message)
            console.error('Facebook Signin Error:', error);
            throw error; // Rethrow the error for the async thunk
        }
    }
);

export const loginEmailPass = createAsyncThunk(
    'auth/loginEmailPass',

    async (data) => {
        console.log("000000000000000", data);


        const user = await auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(async (user) => {
                console.log('User account created & signed in!', user);

                if (user.user.emailVerified) {
                    console.log("your account is log in ");

                    await firestore()
                        .collection('users')
                        .doc(user.user.uid)
                        .update({ emailVerified: true })
                        .then(() => {
                            console.log('User updated!');
                        });



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

export const addAddress = createAsyncThunk(
    'auth/address',

    async (data) => {
        console.log(data, "55555555555555555555555555555555555");


        await firestore()
            .collection('users')
            .doc(data.uid)
            .update({
                address: firestore.FieldValue.arrayUnion(data.address)
            })
            .then(() => {
                console.log('User updated!');
            });

        let userData;

        await firestore()
            .collection('users')
            .doc(data.uid)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    userData = documentSnapshot.data()
                }
            });

        // console.log("uddddddddddddddddddddd", userData);
        return { ...userData, uid: data.uid };
    }

)

export const deleteAddress = createAsyncThunk(
    'auth/deleteAddress',
    async (data) => {
        console.log(data, ";;;;;;;;;;;;;;;;;;;;;;");
        try {
            await firestore()
                .collection('users')
                .doc(data.uid)
                .update({
                    address: firebase.firestore.FieldValue.arrayRemove(data.address)
                })
                .then(() => {
                    console.log('User deleted!');
                });
        } catch (error) {
            console.log(error);
        }

        let userData;

        await firestore()
            .collection('users')
            .doc(data.uid)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    userData = documentSnapshot.data()
                }
            });

        // console.log("uddddddddddddddddddddd", userData);
        return { ...userData, uid: data.uid };
    
    }
)

export const updateAddress = createAsyncThunk(
    'auth/updateAddress',
    async (data) => {
        console.log(data,"/////////////////////////////////");
        try {
            await firestore()
                .collection('users')
                .doc(data.uid)
                .update({
                    address: firebase.firestore.FieldValue.arrayRemove(data.oldData)
                })
                .then(() => {
                    console.log('User deleted!');
                });
        } catch (error) {
            console.log(error);
        }

        await firestore()
        .collection('users')
        .doc(data.uid)
        .update({
            address: firestore.FieldValue.arrayUnion(data.address)
        })
        .then(() => {
            console.log('User updated!');
        });

        let userData;

        await firestore()
            .collection('users')
            .doc(data.uid)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    userData = documentSnapshot.data()
                }
            });

        console.log("uddddddddddddddddddddd", userData);
        return { ...userData, uid: data.uid };


    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginEmailPass.fulfilled, (state, action) => {
            // console.log("888888888888888", action);

            state.user = action.payload;
        })
        builder.addCase(signinGoogle.fulfilled, (state, action) => {
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaa", action);

            state.user = action.payload;
        })
        builder.addCase(signinFacebook.fulfilled, (state, action) => {
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaa", action);

            state.user = action.payload;
        })
        builder.addCase(addAddress.fulfilled, (state, action) => {
            // console.log("fffffffffffffffffffff11", action.payload);
            state.user = action.payload
        })
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            // console.log("fffffffffffffffffffff11", action.payload);
            state.user = action.payload
        })
        builder.addCase(updateAddress.fulfilled, (state, action) => {
            console.log("fffffffffffffffffffff11", action.payload);
            state.user = action.payload
        })
    }
});

export default authSlice.reducer;