import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
// import {  } from 'react-native-gesture-handler'

export default function ShoppingButton({title,onPress}) {
  return (
    
      <TouchableOpacity onPress={onPress} style={style.ShopBtn}>
        <Text style={{color:'white',fontWeight:'bold',alignSelf:'center'}}>{title}</Text>
      </TouchableOpacity>
   
  )
}
const style=StyleSheet.create({
    ShopBtn : {
        padding:10,
        width:100,
        backgroundColor:'black',
        borderRadius:18,
        marginLeft:16,
        
    }
})
