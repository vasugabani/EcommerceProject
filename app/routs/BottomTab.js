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

const Tab = createBottomTabNavigator();
export default function BottomTab() {

  
  return (
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
      <Tab.Screen name='Profile' component={MyProfile}  options={{headerShown:false}} />
    </Tab.Navigator>
  )
}

{/* <Tab.Screen name='Home' component={StackNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name='Shop' component={ProductList} />
      <Tab.Screen name='Bag' component={MyBag} options={{headerShown:false,}}/>
      <Tab.Screen name='Favourite' component={Favourite} options={{headerShown:false,}}/>
      <Tab.Screen name='Profile' component={MyProfile}  options={{headerShown:false}} /> */}