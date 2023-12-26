import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AppButton from '../../component/Button/AppButton'
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices'

export default function Payment({navigation}) {
  return (
    <>
    <View style={{ padding: 6,marginHorizontal:horizontalScale(16), }}>
      <Text style={{ fontSize:moderateScale(16), marginTop:verticalScale(10), color: 'black',fontWeight:'bold' }}>Shipping address :</Text>
      <View style={style.addressbox}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: moderateScale(20), color: "black" }}>Vasu Gabani</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: moderateScale(18), color: '#DB3022', marginLeft: 110 }}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: moderateScale(18), marginTop: moderateScale(15) }}>3 Newbridge Court</Text>
        <Text style={{ fontSize: moderateScale(18), }}>Chino Hills, CA 91709,United States</Text>
      </View>

      <View style={{ flexDirection: 'row', marginTop: moderateScale(30) }}>
        <Text style={{ fontSize: moderateScale(16), color: "black",fontWeight:'bold' }}>Payment</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: moderateScale(18), color: '#DB3022', marginLeft: horizontalScale(170) }}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{width:"28%",height:verticalScale(60),backgroundColor:"white", shadowRadius: 30, elevation: 4, shadowOpacity: 0.10,borderRadius: 10,marginTop:verticalScale(15) }}>
        <Image
          source={require('../../../assets/image/MasterCard.jpg')}
          style={{ width: "100%", height: "100%", borderRadius: moderateScale(10), shadowRadius: 30, elevation: 4, shadowOpacity: 0.10, }}
        />
        </View>
       
        <Text style={{ fontSize: moderateScale(22), color: "black", marginTop: verticalScale(40), marginLeft: horizontalScale(20) }}>**** **** ****3947</Text>
      </View>

      <Text style={{ fontSize: moderateScale(18), color: "black", marginTop: verticalScale(35),fontWeight:'bold' }}>Delivery method</Text>

      <View style={{ flexDirection: 'row' }}>

        <View style={{width:"30%",height:verticalScale(70),borderRadius:moderateScale(10),shadowRadius: 30, elevation: 4, shadowOpacity: 0.10, marginTop: 25,}}>
        <Image
          source={require('../../../assets/image/ss1.png')}
          style={{ width:"100%", height: verticalScale(70), borderRadius: 10, }}
        />
        </View>

        <View style={{width:"30%",height:verticalScale(70),borderRadius:moderateScale(10),shadowRadius: 30, elevation: 4, shadowOpacity: 0.10, marginTop:verticalScale(25),marginLeft:horizontalScale(15)}}>
        <Image
          source={require('../../../assets/image/ss2.png')}
          style={{ width:"100%", height: verticalScale(70), borderRadius: moderateScale(10), }}
        />
        </View>
        
        <View style={{width:"30%",height:verticalScale(70),borderRadius:moderateScale(10),shadowRadius: 30, elevation: 4, shadowOpacity: 0.10, marginTop: verticalScale(25),marginLeft:horizontalScale(15)}}>
        <Image
          source={require('../../../assets/image/ss3.png')}
          style={{ width:"100%", height: verticalScale(70), borderRadius: moderateScale(10), }}
        />
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Text style={{ fontSize: moderateScale(16), }}>Order :</Text>
        <Text style={{ fontSize: moderateScale(18), color: 'black', marginLeft: horizontalScale(240) }}>112$</Text>      
      </View>

      <View style={{ flexDirection: 'row', marginTop: verticalScale(5) }}>
        <Text style={{ fontSize: moderateScale(16), }}>Delivery :</Text>
        <Text style={{ fontSize: moderateScale(18), color: 'black', marginLeft: horizontalScale(224) }}>015$</Text>      
      </View>

      <View style={{ flexDirection: 'row', marginTop:  verticalScale(5)}}>
        <Text style={{ fontSize: moderateScale(16), }}>Summary :</Text>
        <Text style={{ fontSize: moderateScale(18), color: 'black', marginLeft: horizontalScale(213) }}>227$</Text>      
      </View>

      

    </View>
    <>
    <View style={{marginTop: verticalScale(15)}}>
        <AppButton 
          titel="SUBMIT-ORDER"
          onPress={() => navigation.navigate('Success')}
        />
      </View>
    </>
    </>
  )
}
const style = StyleSheet.create({
  addressbox: {
    width: "100%",
    height:  verticalScale(140),
    backgroundColor: 'white',
    marginTop:  verticalScale(20),
    borderRadius: moderateScale(10),
    shadowOpacity: 0.10,
    shadowRadius: 30,
    elevation: 4,
    padding: 20
  }
})