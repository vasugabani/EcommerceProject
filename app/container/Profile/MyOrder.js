import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Orderinput from '../../component/Orderinput'
import Feather from 'react-native-vector-icons/Feather';
// import Slider from 'react-native-slider';

export default function MyOrder({ navigation }) {
  // const handleBack = () => {
  //   navigation.goBack();
  // }
  return (
    <View>
     
      <View style={{ width: "100%", height: 50, padding: 5, flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
        <TouchableOpacity style={{ width: '30%', height: '90%', borderRadius: 15, backgroundColor: 'black', padding: 5, marginLeft: 10 }}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize:16 }}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '30%', height: '90%', borderRadius: 15, backgroundColor: 'white', padding: 5, marginLeft: 10 }}>
          <Text style={{ textAlign: 'center', color: 'black',fontSize:16 }}>Processing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '30%', height: '90%', borderRadius: 15, backgroundColor: 'white', padding: 5, marginLeft: 10 }}>
          <Text style={{ textAlign: 'center', color: 'black',fontSize:16 }}>Cancelled</Text>
        </TouchableOpacity>
      </View>
  
      <ScrollView>

        <Orderinput
          ordernumber="91457387"
          date="11/02/2022"
          TNumber="IW4553256776"
          Quantity="3"
          Amount="$122"
        />
        <Orderinput
          ordernumber="78649086"
          date="11/02/2022"
          TNumber="IW4553256887"
          Quantity="2"
          Amount="$120"
        />
        <Orderinput
          ordernumber="9764377"
          date="11/02/2022"
          TNumber="IW4553256789"
          Quantity="3"
          Amount="$115"
        />
        <Orderinput
          ordernumber="9764377"
          date="11/02/2022"
          TNumber="IW4553256789"
          Quantity="3"
          Amount="$115"
        />
        <Orderinput
          ordernumber="9764377"
          date="11/02/2022"
          TNumber="IW4553256789"
          Quantity="3"
          Amount="$115"
        />
        <Orderinput
          ordernumber="9764377"
          date="11/02/2022"
          TNumber="IW4553256789"
          Quantity="3"
          Amount="$115"
        />
        <Orderinput
          ordernumber="9764377"
          date="11/02/2022"
          TNumber="IW4553256789"
          Quantity="3"
          Amount="$115"
        />

      </ScrollView>
    </View>
  )
}