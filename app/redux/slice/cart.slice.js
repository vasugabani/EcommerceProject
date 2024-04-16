import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore, { firebase } from '@react-native-firebase/firestore';

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

// export const addCart = createAsyncThunk(
//     'cart/add',
//     async(cartData)=>{
//         console.log(cartData,"ccccccccccccccccccccccccc");

//         try{

//             const cartRef = await firestore().collection('cart').doc(cartData.uid);
//             const cartDoc = await cartRef.get()

//             if(cartDoc.exists){
//                 await cartRef.update({
//                     cart : firebase.firestore.FieldValue.arrayUnion({id:cartData.id,price:cartData.price,qty:1})
//                 })
//                 console.log('cart update !!!!!!!!!!');
//             }else{
//                 await cartRef.set({
//                     cart:[{
//                         id:cartData.id,price:cartData.price,qty:1
//                     }]
//                 })
//                 console.log('cart add !!!!!!!!!!!!!!');
//             }

//         }catch(error){
//             console.log(error.message);
//         }

//         return cartData;
//     }
// )
export const getCart = createAsyncThunk(
    'cart/getCart',

    async (userid) => {
        console.log("okkkkkkkkkkkkkkkkk", userid);
        let Cdata;
        try {
            await firestore()
                .collection('cart')
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

export const addCart = createAsyncThunk(
    'cart/add',
    async (data) => {
        // console.log(data, "ccccccccccccccccccccccccc");
        try {
            const cartRef = await firestore().collection('cart').doc(data.uid);
            const cartDoc = await cartRef.get()

            if (cartDoc.exists) {
                await cartRef.update({
                    cart: firebase.firestore.FieldValue.arrayUnion({ id: data.id, price: data.price, qty: 1 })
                })
                console.log('cart update !!!!!!!!!!');
            } else {
                await cartRef.set({
                    cart: [{ id: data.id, price: data.price, qty: 1 }]
                })
                console.log('cart add !!!!!!!!!!!!!!');
            }

        } catch (error) {
            console.log(error.message);
        }

        const cartRef = firestore().collection('cart').doc(data.uid);
        const cartDoc = await cartRef.get();
        const cartData = cartDoc.data();
        // console.log("hhhheeeeeeeellllllooooooooooooo", cartData);

        return cartData;
    }
)

export const incrementCart = createAsyncThunk(
    'cart/plus',
    async (data) => {
        // console.log(data, "999999999888888888888");

        try {
            const cartRef = firestore().collection('cart').doc(data.uid);
            const cartDoc = await cartRef.get();
            const cartData = cartDoc.data();

            if (cartData && cartData.cart) {
                const existingItemIndex = cartData.cart.findIndex(item => item.id === data.id);
                if (existingItemIndex !== -1) {
                    // If item exists, update its quantity by incrementing
                    const updatedCart = [...cartData.cart];
                    updatedCart[existingItemIndex].qty = data.qty + 1;
                    updatedCart[existingItemIndex].price = data.price * updatedCart[existingItemIndex].qty;
                    await cartRef.update({
                        cart: updatedCart
                    });
                    console.log('Cart item quantity incremented!');
                } else {
                    // If item doesn't exist, add it to the cart
                    await cartRef.update({
                        cart: [...cartData.cart, { id: data.id, qty: data.qty, price: data.price }]
                    });
                    console.log('Item added to cart!');
                }
            } else {
                // If cart doesn't exist, create it and add the item
                await cartRef.set({
                    cart: [{ id: data.id, qty: data.qty, price: data.price }]
                });
                console.log('Cart created and item added!');
            }
        } catch (error) {
            console.log(error.message);
        }

        const cartRef = firestore().collection('cart').doc(data.uid);
        const cartDoc = await cartRef.get();
        const cartData = cartDoc.data();
        // console.log(cartData, "hhhheeeeeeeellllllooooooooooooo");

        return cartData;

    }
);

export const decrementCart = createAsyncThunk(
    'cart/minus',
    async (data) => {
        // console.log(data, "999999999888888888888");

        try {
            const cartRef = firestore().collection('cart').doc(data.uid);
            const cartDoc = await cartRef.get();
            const cartData = cartDoc.data();

            if (cartData && cartData.cart) {
                const existingItemIndex = cartData.cart.findIndex(item => item.id === data.id);
                if (existingItemIndex !== -1) {
                    // If item exists, update its quantity by incrementing
                    const updatedCart = [...cartData.cart];
                    updatedCart[existingItemIndex].qty = data.qty - 1;
                    updatedCart[existingItemIndex].price -= data.price;

                    await cartRef.update({
                        cart: updatedCart
                    });
                    console.log('Cart item quantity decremented!');
                } else {
                    // If item doesn't exist, add it to the cart
                    await cartRef.update({
                        cart: [...cartData.cart, { id: data.id, qty: data.qty, price: data.price }]
                    });
                    console.log('Item removed to cart!');
                }
            } else {
                // If cart doesn't exist, create it and add the item
                await cartRef.set({
                    cart: [{ id: data.id, qty: data.qty, price: data.price }]
                });
                console.log('Cart created and item removed!');
            }
        } catch (error) {
            console.log(error.message);
        }

        const cartRef = firestore().collection('cart').doc(data.uid);
        const cartDoc = await cartRef.get();
        const cartData = cartDoc.data();
        // console.log("hhhheeeeeeeellllllooooooooooooo", cartData);

        return cartData;
    }
);

export const removeCart = createAsyncThunk(
    'cart/remove',
    async ({ data, uid }) => {
        try {
            console.log(data, "&&&&&&&&&&&&&&", uid);
            const cartRef = firestore().collection('cart').doc(uid);
            const cartDoc = await cartRef.get();
            const cartData = cartDoc.data();

            if (cartData && cartData.cart) {

                const updatedCart = cartData.cart.filter(item => item.id !== data);

                await cartRef.update({
                    cart: updatedCart
                });

                console.log('Item removed from cart!');

                return updatedCart;
            } else {
                console.log('Cart or item not found');
                return [];
            }


        } catch (error) {
            console.error('Error removing product from cart:', error);

            // You can throw the error to be handled by the Redux store
            throw error;
        }
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        // addToCart : (state, action) => {


        //     const itemAvaible = state.cart.findIndex((v)=>v.id === action.payload)
        //     console.log(itemAvaible,"0000000000000000000000000000");

        //     if(itemAvaible === -1){
        //         state.cart.push({id:action.payload , qty : 1})
        //     }else{
        //         state.cart[itemAvaible].qty++
        //     }    
        // },
        // incrementCart:(state,action) => {
        //     console.log(action.payload,"222222222222222222222222");

        //     const plusIndex = state.cart.findIndex((v)=>v.id === action.payload)
        //     console.log(plusIndex,"1212121212121212121212121212");

        //     state.cart[plusIndex].qty++
        // },
        // decrementCart:(state, action)=>{
        //     const minusIndex = state.cart.findIndex((v)=>v.id===action.payload)
        //     console.log(minusIndex);

        //     state.cart[minusIndex].qty--
        // },
        // removeCart : (state,action)=>{
        //     const removeData = state.cart.findIndex((v)=>v.id === action.payload)
        //     state.cart.splice(removeData,1)
        // }

    },
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload.cart
        })
        builder.addCase(addCart.fulfilled, (state, action) => {
            // console.log(" actionnnnnnnnnn  payloadddddddddd", action.payload);

            state.cart = action.payload.cart

            // const itemAvaible = state.cart.findIndex((v)=>v.id === action.payload)
            // console.log(itemAvaible,"0000000000000000000000000000");

            // if(itemAvaible === -1){
            //     state.cart.push({id:action.payload , qty : 1})
            // }else{
            //     state.cart[itemAvaible].qty++
            // }
        })
        builder.addCase(incrementCart.fulfilled, (state, action) => {
            // console.log("increment actionnnnnnnnnn", action.payload);
            state.cart = action.payload.cart;
            // console.log("increment stateeeeeeeeeee", state);
        });
        builder.addCase(decrementCart.fulfilled, (state, action) => {
            state.cart = action.payload.cart;
        });
        builder.addCase(removeCart.fulfilled, (state,action)=>{
            state.cart=action.payload
        })
    }
});

// export const { removeCart } = cartSlice.actions
export default cartSlice.reducer