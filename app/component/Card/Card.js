import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Card({imguri, title, mainTitle, Dollar, discount, disColor }) {
    return (
      
            <View style={style.parentBox}>
                <View style={style.box}>
                    <Image
                        style={style.image1}
                        source={imguri}
                    />
                    <Pressable style={{ margin: 6, padding: 1, backgroundColor: disColor, width: 25, position: 'absolute', borderRadius: 10 }}>
                        <Text style={{ fontSize: 9, color: 'white', textAlign: 'center' }}>{discount}</Text>
                    </Pressable>

                </View>
                <View style={style.deatilBox}>
                    <Text style={style.title}>{title}</Text>
                    <Text style={style.mainTitle}>{mainTitle}</Text>
                    <Text style={style.Dollar}> {Dollar}</Text>
                </View>
            </View>
    
    )
}

const style = StyleSheet.create({
    image1: {
        width: 140,
        height: 180,
        borderRadius :8, 
        resizeMode: 'cover'
    },
    parentBox: {
        marginHorizontal: 16,
    },
    box: {
        width: 140,
        height: 180,
        marginTop: 24,
        borderRadius: 6,
        backgroundColor: '#DADADA',
        position: 'relative',

    },
    deatilBox: {
        marginTop: 10,
        color: 'black',
        width: 140,

    },
    title: {
        color: 'black',
        fontSize: 10
    },
    mainTitle: {
        color: 'black',
        fontSize: 16
    },
    Dollar: {
        color: 'black',
        fontSize: 14,
        color: '#DB3022'
    }
})