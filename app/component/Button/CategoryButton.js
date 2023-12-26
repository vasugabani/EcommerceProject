import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
// import {  } from 'react-native-gesture-handler'

export default function CategoryButton({title,onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={style.btnStyle}>
        <Text style={{fontSize:18,color:'black'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
const style=StyleSheet.create({
    btnStyle:{
        backgroundColor:'#f9f9f9',
        borderBottomWidth:0.5,
        padding:15,
        marginLeft:20
    }
})