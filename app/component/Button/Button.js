import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'


export default function Button({title,onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={style.btnStyle}>
        <Text style={{color:'white',fontWeight:'bold',alignSelf:'center'}}>{title}</Text>
    </TouchableOpacity>
  )
}
const style=StyleSheet.create({
    btnStyle : {
        borderRadius:20,
        width:370,
        padding:10,
        marginHorizontal:10,
        backgroundColor:'red',
        marginTop:15,
        
       
    }
})