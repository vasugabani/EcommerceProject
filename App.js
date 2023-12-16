import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from './app/routs/StackNavigation'
import BottomTab from './app/routs/BottomTab';



export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    )
  }
}