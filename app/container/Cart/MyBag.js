import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import BagCard from '../../component/Card/BagCard'
import Feather from 'react-native-vector-icons/Feather';
import AppButton from '../../component/Button/AppButton';
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';

export default function MyBag({ navigation }) {

  const HandleAction = () => {
    navigation.navigate('Address')
  }

  return (
    <View>
      <ScrollView>
        <Text style={{fontWeight:'bold',fontSize:32,marginTop: verticalScale(14), marginLeft: horizontalScale(20),color:'black'}}>My Bag</Text>
        <BagCard
          imgurl={require('../../../assets/image/beautiful-young-woman-dress-walking-isolated-white-background.jpg')}
          color="white"
          size="L"
          price="$27"
          contity="1"
          Product="T-Shirt"
        />
        <BagCard
          imgurl={require('../../../assets/image/beautiful-young-woman-dress-walking-isolated-white-background.jpg')}
          color="white"
          size="M"
          price="$18"
          contity="3"
          Product="T-Shirt"
        />
        <BagCard
          imgurl={require('../../../assets/image/beautiful-young-woman-dress-walking-isolated-white-background.jpg')}
          color="Blue"
          size="X"
          price="$25"
          contity="1"
          Product="Night Dress"
        />
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{
            width: horizontalScale(250), height: verticalScale(40), marginLeft: horizontalScale(20), marginTop: verticalScale(20), backgroundColor: "white", borderRadius: moderateScale(8), shadowOpacity: 0.10,
            shadowRadius: 30, elevation: 4
          }}
          placeholder="Enter Your Promo Code"
          keyboardType="numeric"
        />
        <TouchableOpacity style={{ width: horizontalScale(40), height: verticalScale(40), backgroundColor: 'black', borderRadius: moderateScale(100), marginTop: verticalScale(20), padding: 10,marginLeft:horizontalScale(45) }}>
          <Feather name='arrow-right' size={moderateScale(18)} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginTop: verticalScale(30), marginLeft: horizontalScale(20), }}>
        <Text style={{ fontSize: moderateScale(15), marginTop: 5 }}>Total Amount:</Text>
        <Text style={{ fontSize: moderateScale(18), marginLeft: 200, color: 'black',fontWeight:'bold' }}>$102</Text>
      </View>
      <View style={{ marginTop: verticalScale(10) }}>
        <AppButton
          titel="CHECK OUT"
          onPress={() => HandleAction()}
        />
      </View>



    </View>
  )
}