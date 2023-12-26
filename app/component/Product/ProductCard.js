import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'

export default function ProductCard({ image, subTitle, title, price, discount, color, onPress}) {
    return (
        <View style={{ marginTop: 15,position:'relative' }}>
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{ borderRadius: 8 }}
                    source={image}
                />
                <Pressable style={{margin:6,padding:1,backgroundColor:color,width:40,position:'absolute',borderRadius:10}}>
                    <Text style={{fontWeight:'bold',color:'white',alignSelf:'center'}}>{discount}</Text>
                    
                </Pressable>
                <Text style={{ marginTop: 5 }}>{subTitle}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 2 }}>{title}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 2, }}>{price}</Text>
            </TouchableOpacity>
        </View>
    )
}