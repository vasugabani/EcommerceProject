import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from './app/routs/StackNavigation'
import BottomTab from './app/routs/BottomTab';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';



export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </Provider>

    )
  }
}