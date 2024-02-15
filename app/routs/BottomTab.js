import { View, Text, } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Product from '../container/Home/Product';
import ProductList from '../container/Home/ProductList';
import MyBag from '../container/Cart/MyBag';
import Favourite from '../container/Favourite/Favourite';
import MyProfile from '../container/Profile/MyProfile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StackNavigation, { BagStack, FavouriteStack, HomeStack, ProfileStack, ShopStack } from './StackNavigation';
import SignUp from '../container/SignUp';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../container/Login';
import Password from '../container/Password';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
export default function BottomTab() {
  const auth = useSelector(state=>state.auth)
  console.log("7777777777777777777777",auth);

  
  return (

    auth.user ? 
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-variant-outline'

          } else if (route.name === 'Shop') {
            iconName = 'cart-outline'

          } else if (route.name === 'Bag') {
            iconName = 'shopping-outline'

          } else if (route.name === 'Favourite') {
            iconName = 'cards-heart-outline'

          } else if (route.name === 'Profile') {
            iconName = 'account-outline'
          }
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
      })}
    >
      <Tab.Screen name='Home' component={StackNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name='Shop' component={ProductList} />
      <Tab.Screen name='Bag' component={MyBag} options={{headerShown:false,}}/>
      <Tab.Screen name='Favourite' component={Favourite} options={{headerShown:false,}}/>
      <Tab.Screen name='Profile' component={SignUp}  options={{headerShown:false}} />
    </Tab.Navigator>

    :
    
    <Stack.Navigator>
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
    </Stack.Navigator>
  )
}

