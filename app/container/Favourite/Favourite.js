import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import FavouriteCard from '../../component/Card/FavouriteCard'
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite } from '../../redux/slice/favourite.slice';
import { addToCart } from '../../redux/slice/cart.slice';

export default function Favourite({ navigation }) {

  const dispatch = useDispatch()

  const favData = useSelector(state => state.favourite)
  // console.log(favData, "33333333333333333");
  const productData = useSelector(state => state.product)

  const favouriteData = favData.favourite.map((f) => {
    // console.log(f, "444444444444444");
    const productObj = productData.product.find((p) => p.id === f)
    return { ...productObj }
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",productObj);  
  })

  const handleDelete = (id) => {
    dispatch(addToFavourite(id))
  }

  const handleCart = (id) => {

    dispatch(addToCart(id))
  }

  // console.log(favData,"1111111111111",productData);
  return (
    <ScrollView style={{ marginBottom: verticalScale(4) }}>
      <Text style={{ fontWeight: 'bold', fontSize: 32, marginTop: verticalScale(14), marginLeft: horizontalScale(20), color: 'black' }}>Favourite</Text>

      {
        favouriteData.map((v,i) => (
          <View key={i}>
          <FavouriteCard
            img={v.image}
            color="White"
            Product={v.title}
            price={v.price}
            size='M'
            onPress={() => {navigation.navigate('Bag'),handleCart(v.id)}}
            deletefav={()=>handleDelete(v.id)}
          />
          </View>
        ))
      }
    </ScrollView>
  )
}