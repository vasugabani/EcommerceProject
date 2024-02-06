import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { horizontalScale, verticalScale } from '../../constant/Metrices'
import ColorCard from '../../component/ColorDesign/ColorCard'
import SizeCard from '../../component/SizeCard/SizeCard'
import BrandCard from '../../component/BrandName/BrandCard'
import CheckBox from 'react-native-check-box'
// import {  } from 'react-native-gesture-handler'

export default function Filter() {
  
  return (
    <ScrollView>
      <View style={{ marginHorizontal: horizontalScale(16), flex: 1, backgroundColor: 'white' }}>
        

        <Text style={style.subTitle}>Price range</Text>

        <Text style={style.subTitle}>Colors</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
          <ColorCard
            colour='black'
            onPress={() => console.log("colorcard")}
          />
          <ColorCard
            colour='grey'
            onPress={() => console.log("colorcard")}
          />
          <ColorCard
            colour='red'
            onPress={() => console.log("colorcard")}
          />
          <ColorCard
            colour='purple'
            onPress={() => console.log("colorcard")}
          />
          <ColorCard
            colour='yellow'
            onPress={() => console.log("colorcard")}
          />
          <ColorCard
            colour='skyblue'
            onPress={() => console.log("colorcard")}
          />
        </View>

        <Text style={style.sizeTitle}>Sizes</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
          <SizeCard
            title='XS'
            onPress={() => console.log('XS')}
          />
          <SizeCard
            title='S'
            onPress={() => console.log('S')}
          />
          <SizeCard
            title='M'
            onPress={() => console.log('M')}
          />
          <SizeCard
            title='L'
            onPress={() => console.log('L')}
          />
          <SizeCard
            title='XL'
            onPress={() => console.log('XL')}
          />
        </View>

        <Text style={style.sizeTitle}>Brands</Text>

        {/* <View>
          <BrandCard
            title='adidas'
            onPress={() => console.log("adidas")}
          />
          <BrandCard
            title='adidas Originals'
            onPress={() => console.log("adidas originals")}
          />
          <BrandCard
            title='Blend'
            onPress={() => console.log("Blend")}
          />
          <BrandCard
            title='Boutique Moschino'
            onPress={() => console.log("Boutique Moschino")}
          />
          <BrandCard
            title='Champion'
            onPress={() => console.log("champion")}
          />
          <BrandCard
            title='Diesel'
            onPress={() => console.log("diesel")}
          />
          <BrandCard
            title='Jack & Jones'
            onPress={() => console.log("Jack & Jones")}
          />
          <BrandCard
            title='Naf Naf'
            onPress={() => console.log("Naf Naf")}
          />
          <BrandCard
            title='s.Oliver'
            onPress={() => console.log("s.Oliver")}
          />
        </View> */}

        <View>
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("adidas")}
            leftText={"adidas"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("adidas originals")}
            leftText={"adidas Originals"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("Blend")}
            leftText={"Blend"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("Boutique Moschino")}
            leftText={"Boutique Moschino"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("Champion")}
            leftText={"Champion"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("Diesel")}
            leftText={"Diesel"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("Jack & Jones")}
            leftText={"Jack & Jones"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("Naf Naf")}
            leftText={"Naf Naf"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("Red Valentino")}
            leftText={"Red Valentino"}
          />
          <CheckBox
            style={{ flex: 1, padding: 10, }}
            onClick={() => console.log("s.Oliver")}
            leftText={"s.Oliver"}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "#f1f1f1", marginTop: verticalScale(10), paddingTop: verticalScale(10), paddingBottom: verticalScale(20) }}>
          <TouchableOpacity onPress={() => console.log("discard")}
            style={style.btn}>
              
            <Text style={{ color: 'white', alignSelf: 'center' }}>Discard</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("discard")}
            style={style.btn}>

            <Text style={{ color: 'white', alignSelf: 'center' }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

  )
}
const style=StyleSheet.create({
  subTitle : {
    paddingTop: verticalScale(8), fontWeight: 'bold', fontSize: 15, paddingBottom: verticalScale(8), backgroundColor: '#f1f1f1'
  },
  sizeTitle : {
    marginTop: verticalScale(8), paddingTop: verticalScale(8), fontWeight: 'bold', fontSize: 15, marginBottom: verticalScale(8), backgroundColor: '#f1f1f1', paddingBottom: verticalScale(8)
  },
  btn : {
    paddingTop: verticalScale(8), fontWeight: 'bold', fontSize: 15, paddingBottom: verticalScale(8), backgroundColor: 'black', borderWidth: 1, width: 120, borderRadius: 15
  }
})