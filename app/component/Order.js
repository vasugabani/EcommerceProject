import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { horizontalScale, moderateScale, verticalScale } from '../constant/Metrices';
// import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';
export default function Order({ Quantity, imgurl, size, price, Product, plusQty, minusQty, removeQty }) {
    return (
        <View>

            <View style={style.bagbox}>
                <View style={style.imgbox}>
                    <Image
                        source={{ uri: imgurl }}
                        style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    />
                </View>
                <View style={style.disbox}>
                    <Text style={{ fontSize: moderateScale(20), marginTop: verticalScale(10), marginLeft: horizontalScale(10), fontWeight: 'bold', color: 'black' }}>{Product}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: moderateScale(15), marginTop: verticalScale(10), marginLeft: horizontalScale(10) }}> qty: <Text style={{ fontSize: moderateScale(16), color: 'black' }}>{Quantity}</Text></Text>
                       
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        
                        <Text style={{ fontSize: moderateScale(15), marginTop: verticalScale(10), marginLeft: horizontalScale(10) }}>price:  <Text style={{ fontSize: moderateScale(16), color: "black", marginTop: verticalScale(50),  }}>{price}</Text></Text>
                    </View>
                </View>
                

            </View>

        </View>
    )
}
const style = StyleSheet.create({
    bagbox: {
        width: "90%",
        height: verticalScale(140),
        flexDirection: 'row',
        marginTop: verticalScale(20),
        marginLeft: horizontalScale(20),
        borderRadius: moderateScale(10),
        shadowOpacity: 0.10,
        shadowRadius: 30,
        backgroundColor: "white"

    },
    imgbox: {
        width: "30%",
        height: '100%',
        borderRadius: moderateScale(10)
    },
    disbox: {
        width: "60%",
        height: '100%',
    },
    iconbtn: {
        width: '10%',
        height: "100%",
    }
})