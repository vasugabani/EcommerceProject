import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';
export default function FavouriteCard({img,color,Product,price,size,onPress,deletefav}) {
    return (
        <View>

            <View style={style.fevbox}>
                <View style={style.imgbox}>
                    <Image
                        source={{uri:img}}
                        style={{ width: '100%', height: '100%',borderRadius:moderateScale(10) }}
                    />
                </View>
                <View style={style.detailsbox}>
                    <Text style={{ fontSize:moderateScale(16), marginLeft:horizontalScale(10), marginTop:verticalScale(15) }}>Name : </Text>
                    <Text style={{ fontSize:moderateScale(16), color: 'black', marginLeft: horizontalScale(10), marginTop: verticalScale(5) }}>{Product}</Text>
                    <Text style={{ fontSize: moderateScale(15), marginLeft: 10, marginTop:verticalScale(5) }}>Color : <Text style={{ fontSize: 16, color: 'black' }}>{color}</Text></Text>
                    <Text style={{ fontSize: moderateScale(16), color: 'black', marginLeft:horizontalScale(10), marginTop:verticalScale(10) }}>{price}</Text>
                </View>
                <View style={style.rettingBox}>
                    <Text style={{ fontSize:moderateScale(16), marginLeft: horizontalScale(35), marginTop: verticalScale(30) }}>Size : <Text style={{ fontSize: moderateScale(18), color: 'black' }} >{size}</Text></Text>
                    <View style={{ flexDirection: 'row',marginLeft: horizontalScale(35),  marginTop: verticalScale(10)}}>
                        <Feather name='star' color='gold' size={moderateScale(16)}/>
                        <Feather name='star' color='gold' size={moderateScale(16)}/>
                        <Feather name='star' color='gold' size={moderateScale(16)}/>
                        <Feather name='star' color='gold' size={moderateScale(16)}/>
                        <Feather name='star' color='gold' size={moderateScale(16)}/>
                        <Text>(10)</Text>
                    </View>
                </View>
                <View style={style.iconbox}>
                    <TouchableOpacity onPress={deletefav} style={{paddingLeft:horizontalScale(10)}}>
                        <Feather name="x" size={moderateScale(25)} color="gray"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:horizontalScale(40),height:verticalScale(44),backgroundColor:'#DB3022',borderRadius:moderateScale(100),padding:13,marginTop:100,marginRight:5}} onPress={onPress}>
                        <Feather name="shopping-bag" size={moderateScale(17)} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
const style = StyleSheet.create({
    fevbox: {
        width: "95%",
        height:verticalScale(160),
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: verticalScale(30),
        marginLeft: horizontalScale(10),
        // marginHorizontal:horizontalScale(16),
        borderRadius:moderateScale(10),
    },
    imgbox: {
        width: "30%",
        height: "100%",
    },
    detailsbox: {
        width: "25%",
        height: "100%",
    },
    rettingBox: {
        width: "35%",
        height: "100%",
    },
    iconbox: {
        width: "10%",
        height: "100%",
        paddingRight:horizontalScale(2)
    }
})