import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import { horizontalScale, verticalScale } from '../../constant/Metrices';

export default function ProductCard({ image, subTitle, title, price, discount, color, onPress}) {
    // console.log(image.toString().substring(0,8) !== 'https://');
    return (
        <View style={{ marginTop: 15,position:'relative', }}>
            <TouchableOpacity onPress={onPress}>
                <View style={{width:170,height:180,marginTop:25}}>
                <Image
                    style={{ borderRadius: 8,width:170,height:180 }}
                    source={{uri:image.toString().substring(0,8) !== 'https://' ? "https://www.cdparque.com/img/sections/productos/pepsi.png" : image}}
                    
                /></View>
                <Pressable style={{margin:6,padding:1,backgroundColor:color,width:40,position:'absolute',borderRadius:10}}>
                    <Text style={{fontWeight:'bold',color:'white',alignSelf:'center'}}>{discount}</Text>
                    
                </Pressable>
                <View style={{width:170,height:'auto',marginTop:8}}>
                <Text style={{ marginTop: 5 }}>{subTitle}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 2 }}>{title}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 2, }}>{price}</Text></View>
            </TouchableOpacity>
        </View>
    )
}