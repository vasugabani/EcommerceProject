import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from '../container/Home/Categories';
import Product from '../container/Home/Product';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductList from '../container/Home/ProductList';
import MyBag from '../container/Cart/MyBag';
import Favourite from '../container/Favourite/Favourite';
import MyProfile from '../container/Profile/MyProfile';
import ProductDetails from '../container/Home/ProductDetails';
import Filter from '../container/Home/Filter';
import Address from '../container/Cart/Address';
import Payment from '../container/Cart/Payment';
import Success from '../container/Cart/Success';
import MyOrder from '../container/Profile/MyOrder';
import SignUp from '../container/SignUp';
import Login from '../container/Login';
import Password from '../container/Password';
import UserInfo from '../container/Profile/UserInfo';
import CheckOut from '../container/Cart/CheckOut';
import OrderDetails from '../container/Cart/OrderDetails';
import SplashScreen from '../container/SplashScreen';
import Review from '../container/Cart/Review';

// export default function StackNavigation({ navigation }) {

  const Stack = createNativeStackNavigator();

  const CustomButton = ({ icon, onClick }) => {
    return (
      <TouchableOpacity onPress={onClick}>
        <MaterialCommunityIcons name={icon} size={25} color={'black'} />
      </TouchableOpacity>
    )
  }

  export default function StackNavigation ({navigation}) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Product' component={Product}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='ProductList' component={ProductList}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
  
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
            headerRight: () => (
              <CustomButton
                icon='shopping-search'
              />
            )
          }}
        />
        <Stack.Screen name="Categories" component={Categories}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
            headerRight: () => (
              <CustomButton
                icon='shopping-search'
              />
            )
          }}
        />
        <Stack.Screen name='Filter' component={Filter}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name='ProductDetails' component={ProductDetails}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name='Bag' component={MyBag}
          options={{
  
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name='CheckOut' component={CheckOut}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name='Address' component={Address}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name='Payment' component={Payment}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name='Success' component={Success}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen name='Favourite' component={Favourite}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name='Profile' component={MyProfile} />
        <Stack.Screen name='MyOrder' component={MyOrder}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name='SignUp' component={SignUp} 
        options={{
          headerShown:false
        }}/>
        <Stack.Screen name='Login' component={Login} 
        options={{
          headerShown:false
        }}/>
        <Stack.Screen name='Password' component={Password} options={{
          headerShown:false
        }}/>
        <Stack.Screen name='UserInfo' component={UserInfo} 
        options={{
          headerShown:false
        }}/>

<Stack.Screen name='OrderDetails' component={OrderDetails}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />

<Stack.Screen name='Review' component={Review}
          options={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <CustomButton
                icon='chevron-left'
                onClick={() => {
                  navigation.goBack();
                }}
              />
            ),
          }}
        />

<Stack.Screen name='SplashScreen' component={SplashScreen}
          options={{
            
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    )
  }
  
  //===============================================================
  // const HomeStack = ({ navigation }) => {
  //   return (

  //     <Stack.Navigator>
  //       <Stack.Screen name='Product' component={Product}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen name='ProductList' component={ProductList}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,

  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //           headerRight: () => (
  //             <CustomButton
  //               icon='shopping-search'
  //             />
  //           )
  //         }}
  //       />
  //       <Stack.Screen name="Categories" component={Categories}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //           headerRight: () => (
  //             <CustomButton
  //               icon='shopping-search'
  //             />
  //           )
  //         }}
  //       />
  //       <Stack.Screen name='Filter' component={Filter}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='ProductDetails' component={ProductDetails}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Bag' component={MyBag}
  //         options={{

  //           headerBackVisible: false,
  //           // headerShown:false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Address' component={Address}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Payment' component={Payment}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Success' component={Success}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //         }}
  //       />
  //     </Stack.Navigator>
  //   )
  // }

  // const ShopStack = ({ navigation }) => {
  //   return (

  //     <Stack.Navigator>
  //       <Stack.Screen name='ProductList' component={ProductList}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,

  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //           headerRight: () => (
  //             <CustomButton
  //               icon='shopping-search'
  //             />
  //           )
  //         }}
  //       />
  //       <Stack.Screen name='Filter' component={Filter}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='ProductDetails' component={ProductDetails}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerShown:false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Bag' component={MyBag}
  //         options={{

  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Address' component={Address}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Payment' component={Payment}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Success' component={Success}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //         }}
  //       />
  //     </Stack.Navigator>
  //   )
  // }

  // const BagStack = ({ navigation }) => {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name='Bag' component={MyBag}
  //         options={{
  //           headerShown:false,
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Address' component={Address}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Payment' component={Payment}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Success' component={Success}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //         }}
  //       />
  //     </Stack.Navigator>
  //   )
  // }

  // const FavouriteStack = ({ navigation }) => {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name='Favourite' component={Favourite}
  //       options={{
  //         headerTitleAlign: 'center',
  //         headerBackVisible: false,
  //         headerLeft: () => (
  //           <CustomButton
  //             icon='chevron-left'
  //             onClick={() => {
  //               navigation.goBack();
  //             }}
  //           />
  //         ),
  //       }}
  //     />
  //     <Stack.Screen name='Bag' component={MyBag}
  //         options={{
            
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Address' component={Address}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Payment' component={Payment}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //       <Stack.Screen name='Success' component={Success}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //         }}
  //       />
  //     </Stack.Navigator>
  //   )
  // }

  // const ProfileStack = ({ navigation }) => {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name='Profile' component={MyProfile} />

  //       <Stack.Screen name='MyOrder' component={MyOrder}
  //         options={{
  //           headerTitleAlign: 'center',
  //           headerBackVisible: false,
  //           headerLeft: () => (
  //             <CustomButton
  //               icon='chevron-left'
  //               onClick={() => {
  //                 navigation.goBack();
  //               }}
  //             />
  //           ),
  //         }}
  //       />

  //     </Stack.Navigator>

  //   )
  // }

  // export {HomeStack, ShopStack, BagStack, FavouriteStack, ProfileStack }





  