import { View, Text, Image } from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
    <View style={{alignItems:'center',}}>
      {/* <Text>SplashScreen</Text> */}
      <Image 
      style={{height:100,width:100,borderRadius:200,marginVertical:350}}
      source={require("../../assets/image/Appicon.jpg")}
      />

    </View>
  )
}