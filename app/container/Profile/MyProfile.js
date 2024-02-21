import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Profileinput from '../../component/Profileinput'
import { verticalScale } from '../../constant/Metrices'
import Address from '../Cart/Address'

export default function MyProfile({ navigation }) {
  return (

    <View style={{ marginTop: verticalScale(15) }}>


      <View style={{ flexDirection: 'row', width: "90%", height: 80, marginLeft: 10, marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
          <View style={{ width: 80, height: 80, backgroundColor: 'black', borderRadius: 100 }}>
            <Image
              source={require('../../../assets/image/Profile.jpg')}
              style={{ width: '100%', height: '100%', borderRadius: 100 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ padding: 20, marginLeft: 10 }}>
          <Text style={{ fontSize: 22, color: 'black', fontWeight: '900' }}>Vasu Gabani</Text>
          <Text style={{ fontSize: 15, marginTop: 2 }}>vasugabani@Gmail.com</Text>
        </View>
      </View>


      <Profileinput
        name="My Orders"
        titel="Alredy have 12 Orders"
        onPress={() => navigation.navigate('MyOrder')}
      />

      <Profileinput
        name="ShippingAddracs"
        titel="3 ddresses"
        onPress={() => navigation.navigate('Address')}
      />

      <Profileinput
        name="Paymntmethods"
        titel="Visa **34"
      />

      <Profileinput
        name="Promocodes"
        titel="You have promocodes"
      />

      <Profileinput
        name="My  reviews"
        titel="Reviews for 4 items"
      />

      <Profileinput
        name="Settings"
        titel="Notifications"
      />
    </View>
  )
}