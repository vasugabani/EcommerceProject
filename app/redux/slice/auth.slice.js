import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Alert } from "react-native";
import { useSelector } from "react-redux";

const initialState = {
    isLoading: false,
    user: null,
    allUser: [],
    message:'',
    error: null,
    loginError:null
}


export const signupEmailPass = createAsyncThunk(
    'auth/signupEmailPass',
    async (data, { rejectWithValue }) => {
        console.log("signupEmailPass");
        console.log("ddddddddddddddd", data);
        try {
            await auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(async (userCredential) => {
                    await firestore()
                        .collection('users')
                        .doc(userCredential.user.uid)
                        .set({ name: data.name, email: data.email, emailVerified: false, createdAt: new Date().toString(), updatedAt: new Date().toString() })
                        .then((doc) => {
                            console.log('User added!', doc);

                        });

                    await userCredential.user.sendEmailVerification()
   
                })
                return {message:'SignUp succesfull,please check your email for verify'}
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {

                return rejectWithValue({ message: 'email already use' })
                // console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                return rejectWithValue({ message: 'invaild email' })
            }

            return rejectWithValue({ message: error.message })


        };

    }
)

export const signinGoogle = createAsyncThunk(
    'auth/signinGoogle',
    async () => {
        console.log("signinGoogle");
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
        console.log("signinFacebook");
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
        console.log("loginEmailPass");
        console.log("000000000000000", data.email, data.password);
let userData;
        try {
    
            await auth()
                .signInWithEmailAndPassword(data.email, data.password)
                .then(async (user) => {
                    console.log('User account created & signed in! login:::::::::::', user);

                    if (user.user.emailVerified) {
                        console.log("your account is log in ");

                        await firestore()
                            .collection('users')
                            .doc(user.user.uid)
                            .update({ emailVerified: true })
                            .then(() => {
                                console.log('User updated!', user.user.uid);
                            });

                            userData=user.user
                        return userData;
                    } else {
                        console.log("please verifyyyyyyyyyyyy");
                        userData= {message:"please verify your email"}
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

                    console.error(error,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                });
            // console.log("qqqqqqqqqqqqqq", user);
            
        } catch (error) {
            console.log(error.message);
        }
        return userData;
    }
)

export const getUsers = createAsyncThunk(
    'auth/getUsers',
    async () => {
        try {
            let usersData = [];
            const querySnapshot = await firestore().collection('users').get();

            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.exists) {
                    console.log('Get user => User data: ', documentSnapshot.data());
                    usersData.push({ ...documentSnapshot.data(), uid: documentSnapshot.id });
                }
            });

            console.log("get user => All users data: ", usersData);
            return usersData;
        } catch (error) {
            console.error('Error getting users: ', error);
            throw error;
        }
    }
);

export const getAddress = createAsyncThunk(
    'auth/getAddress',
    async (data) => {
        console.log("getAddress");
        let aData;
        try {
            await firestore()
                .collection('users')
                .doc(data.uid)
                .get()
                .then(documentSnapshot => {
                    console.log('User exists: ', documentSnapshot.exists);

                    if (documentSnapshot.exists) {
                        console.log('User data: ', documentSnapshot.data());
                        aData = documentSnapshot.data()
                    }
                });

            console.log("vvvvvvvvvvvvvvvvvv", aData);
            let fData = { ...aData, uid: data.uid }
            console.log("adddddddddddddddddddddressssssssss", fData);
            return fData;
        } catch (error) {
            return error;
        }

    }

)

export const addAddress = createAsyncThunk(
    'auth/address',

    async (data) => {
        // console.log(data, "55555555555555555555555555555555555");
        console.log("addAddress");

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


        return { ...userData, uid: data.uid };
    }

)

export const deleteAddress = createAsyncThunk(
    'auth/deleteAddress',
    async (data) => {
        console.log("deleteAddress");
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


        return { ...userData, uid: data.uid };

    }
)

export const updateAddress = createAsyncThunk(
    'auth/updateAddress',
    async (data) => {
        console.log("updateAddress");
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

export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async (userid) => {
        // console.log("6666666666666666666666666666666",uid);
        let data;
        try {

            await firestore()
                .collection('users')
                .doc(userid)
                .get()
                .then(documentSnapshot => {
                    console.log('getUserProfile user Exists : ', documentSnapshot);

                    if (documentSnapshot.exists) {
                        console.log('getUserProfile User data : ', documentSnapshot.data());
                        data = { ...documentSnapshot.data(), uid: userid }
                    }
                    console.log("4444444444444444444444444", data);

                })
            return data;
        } catch (error) {
            console.log(error);
        }

    }
)

export const addUserInfo = createAsyncThunk(
    'auth/addUserInfo',
    async (data) => {
        console.log("addUserInfo");
        // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$", data);

        if (typeof data.imageURL === 'string') {
            // console.log("okkkkkkkkkkkkkkkkk");
            const imgref = await storage().ref('users/' + data.imagename);
            await imgref.delete();
        }
        let tempArr = data.image.path.split('/')
        let imageName = tempArr[tempArr.length - 1]
        console.log(imageName);

        let rNo = Math.floor(Math.random() * 1000);

        const imgFinalName = rNo + "_" + imageName;
        console.log(imgFinalName);
        const imgRefPath = 'users/' + imgFinalName
        const imgRef = await storage().ref('users/' + imgFinalName);

        const task = await imgRef.putFile(data.image.path);
        console.log(task);


        const url = await storage().ref(imgRefPath).getDownloadURL();
        // console.log(url, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

        await firestore()
            .collection('users')
            .doc(data.uid)
            .update({
                MobileNumber: data.number,
                imagename: imgFinalName,
                imageURL: url
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


        return { ...userData, uid: data.uid };

    }
)

export const logOut = createAsyncThunk(
    'auth/logOut',

    async (data) => {
        console.log("logOut");

        try {
            await firebase.auth()
                .signOut(data)
                .then(() => console.log('user sign out'));

            return null;
        } catch (error) {
            console.log(error);
        }
    }
)
// export const getuserdata = createAsyncThunk(
//     'auth/get',
//     async (uid, { rejectWithValue }) => {
//         try {
//             const documentSnapshot = await firestore()
//                 .collection('users')
//                 .doc(uid)
//                 .get();

//             // Check if user document exists
//             if (!documentSnapshot.exists) {
//                 throw new Error('User not found');
//             }

//             // Extract user data
//             const userData = documentSnapshot.data();

//             console.log(userData, 'Retrieved user data');
//             return userData;
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             throw error;
//         }
//     }
// );

const handleLoading = (state, action) => {
    state.isLoading = true
    state.error = null
}

const handleError = (state, action) => {
    console.log("aaaaaaaaaaaaaaaaaaaaa", action.payload.message);
    state.error = action.payload.message
    state.isLoading = false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        errorReset: (state, action) => {
            state.isLoading = true
            state.error = null
            state.message=''
            state.loginError=null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginEmailPass.pending,handleLoading)
        builder.addCase(loginEmailPass.fulfilled, (state, action) => {
            console.log(action.payload, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

            if(action.payload.message){
                state.loginError=action.payload.message
            }else{
                state.user = action.payload;
            }
            state.isLoading=false
            
        })
        builder.addCase(loginEmailPass.rejected,handleError)

        builder
            .addCase(signupEmailPass.pending, handleLoading)
            .addCase(signupEmailPass.fulfilled, (state, action) => {
                
                state.message=action.payload 
                state.isLoading=false   
            })
            .addCase(signupEmailPass.rejected, handleError)

        builder.addCase(signinGoogle.fulfilled, (state, action) => {


            state.user = action.payload.user;
        })
        builder.addCase(signinFacebook.fulfilled, (state, action) => {


            state.user = action.payload;
        })
        builder.addCase(addAddress.fulfilled, (state, action) => {

            state.user = action.payload
        })
        builder.addCase(deleteAddress.fulfilled, (state, action) => {

            state.user = action.payload
        })
        builder.addCase(updateAddress.fulfilled, (state, action) => {

            state.user = action.payload
        })
        builder.addCase(addUserInfo.fulfilled, (state, action) => {

            state.user = action.payload
        })
        builder.addCase(getAddress.fulfilled, (state, action) => {
            // console.log("builddddddddddddgetaddresssssssss", action.payload);
            state.user = action.payload;
        })
        builder.addCase(logOut.fulfilled, (state, action) => {

            state.user = action.payload
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            // console.log(action.payload, "888888888888888888");
            state.allUser = action.payload
            // state.user=action.payload[0]

            // console.log(state, "get111111111111111111111111111");
        })
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            // console.log("99999999999999999999999", action.payload);
            state.user = action.payload

        })
        // builder.addCase(getuserdata.fulfilled, (state, action) => {

        //     state.user = action.payload

        // })

    }
});
export const {errorReset} = authSlice.actions
export default authSlice.reducer;