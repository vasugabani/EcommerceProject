import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
// import {  } from 'react-native-gesture-handler'

export default function BrandCard({title, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={style.btnStyle}>
        <Text style={{fontSize:16,color:'black'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
const style=StyleSheet.create({
    btnStyle:{
        padding:15,

    }
})