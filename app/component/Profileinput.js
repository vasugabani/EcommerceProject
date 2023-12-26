import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { horizontalScale, moderateScale, verticalScale } from '../constant/Metrices';
export default function Profileinput({ name, titel, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={{ width: "94%", height: verticalScale(75), backgroundColor: 'white', marginLeft: horizontalScale(10), shadowOpacity: 0.25, shadowRadius: 20, elevation: 2, flexDirection: "row", marginTop: verticalScale(20) }}>
          <View style={{ padding: 10, marginLeft: horizontalScale(5) }}>
            <Text style={{ fontSize: moderateScale(20), color: 'black' }}>{name}</Text>
            <Text style={{ fontSize: moderateScale(15), color: 'gray', marginTop: verticalScale(3), }}>{titel}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}