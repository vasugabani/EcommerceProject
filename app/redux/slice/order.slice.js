import firestore, { firebase } from '@react-native-firebase/firestore';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    order: [],
    error: null
}

export const getOrderData = createAsyncThunk(
    'getOrderData',
    async (data) => {
        console.log(data,"gggggggggggggggggggggg");
        let orderData;
        await firestore()
            .collection('order')
            .doc(data.id)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    orderData = documentSnapshot.data()
                }
            });
        return { ...orderData, uid: data.id };
    }
)

export const addOrderData = createAsyncThunk(
    'addOrderData',

    async (data) => {
        console.log(data, "orderrrrrrrrrrrrrrrrrrrrrrr");

        console.log({
            userID: data.uid,
            items: data.pData,
            address: data.v,
            totalAmount: data.total,
            orderDate:new Date().toLocaleDateString(),
            orderId:data.orderId
        }, "pppppppppppppppppppppppppp");

        const documentSnapShot = await firestore()
            .collection('order')
            .doc(data.uid)
            .get()

        console.log(documentSnapShot.exists, "ddddddddddddddddd");

        if (documentSnapShot.exists) {
            await firestore()
                .collection('order')
                .doc(data.uid)
                .update({
                    order: firebase.firestore.FieldValue.arrayUnion({
                        userID: data.uid,
                        items: data.pData,
                        address: data.v,
                        totalAmount: data.total,
                        status: 'pending',
                        orderDate:new Date().toLocaleDateString(),
                        orderId:data.orderId
                    })
                })
                .then(() => {
                    console.log('User deleted!');
                });

            return { ...data };
        } else {
            await firestore()
                .collection('order')
                .doc(data.uid)
                .set({
                    order: [
                        {
                            userID: data.uid,
                            items: data.pData,
                            address: data.v,
                            totalAmount: data.total,
                            status: 'pending',
                            orderDate:new Date().toLocaleDateString(),
                            orderId:data.orderId
                        }
                    ]
                })
                .then(() => {
                    console.log('User added!');

                });

            return data;
        }


    }
)


const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addOrderData.fulfilled, (state, action) => {
            // console.log(action.payload, "actionnnnnnnnnnnnnnnnnnnnnnnn");

            state.order.push(action.payload)
            // console.log(state, "actionnnnnnnnnnnnnnnnnnnnnnnn");
        })
        builder.addCase(getOrderData.fulfilled, (state, action) => {
            // console.log(action.payload, "actionnnnnnnnnnnnnnnnnnnnnnnn");

            state.order=action.payload
            // console.log(state, "actionnnnnnnnnnnnnnnnnnnnnnnn");
        })
    }
})

export default orderSlice.reducer