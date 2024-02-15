import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from './app/routs/StackNavigation'
import BottomTab from './app/routs/BottomTab';
import { Provider } from 'react-redux';
import { persistor, store } from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';




export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <BottomTab />
          </NavigationContainer>
        </PersistGate>
      </Provider>

    )
  }
}