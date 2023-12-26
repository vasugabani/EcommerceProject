import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import FavouriteCard from '../../component/Card/FavouriteCard'
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';

export default function Favourite({navigation}) {
  return (
    <ScrollView style={{marginBottom: verticalScale(4)}}>
      <Text style={{fontWeight:'bold',fontSize:32,marginTop: verticalScale(14), marginLeft: horizontalScale(20),color:'black'}}>Favourite</Text>
      <FavouriteCard
        img={require('../../../assets/image/beautiful-young-woman-dress-walking-isolated-white-background.jpg')}
        color="White"
        Product="T-Shirt"
        price="$15"
        size='M'
        onPress={() => navigation.navigate('Bag')}
      />
      <FavouriteCard
        img={require('../../../assets/image/front-view-smart-man-holding-his-glasses.jpg')}
        color="White"
        Product="T-Shirt"
        price="$12"
        size='L'
        onPress={() => navigation.navigate('Bag')}
      />
      <FavouriteCard
        img={require('../../../assets/image/beautiful-young-woman-dress-walking-isolated-white-background.jpg')}
        color="Blue"
        Product="Dress"
        price="$18"
        size='XL'
        onPress={() => navigation.navigate('Bag')}
      />
      <FavouriteCard
        img={require('../../../assets/image/front-view-smart-man-holding-his-glasses.jpg')}
        color="SkyBlue"
        Product="Koti"
        price="$8"
        size='XXL'
        onPress={() => navigation.navigate('Bag')}
      />
      <FavouriteCard
        img={require('../../../assets/image/man-gray-pajamas-comfy-sleepwear-apparel-full-body.jpg')}
        color="black"
        Product="Shirt"
        price="$16"
        size='S'
        onPress={() => navigation.navigate('Bag')}
      />
      <FavouriteCard
        img={require('../../../assets/image/man-gray-pajamas-comfy-sleepwear-apparel-full-body.jpg')}
        color="black"
        Product="Shirt"
        price="$16"
        size='S'
        onPress={() => navigation.navigate('Bag')}
      />
    </ScrollView>
  )
}