import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FavouriteCard from '../../component/Card/FavouriteCard'
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite, getFav, removeFav } from '../../redux/slice/favourite.slice';
import { addToCart } from '../../redux/slice/cart.slice';

export default function Favourite({ navigation }) {

  const dispatch = useDispatch()

  const favData = useSelector(state => state.favourite)
  
  const authData = useSelector(state=>state.auth)
  const productData = useSelector(state => state.product)

  const userId=authData.user.uid;

  useEffect(()=>{
    dispatch(getFav(userId))
  },[])

  const favouriteData = favData.favourite.map((f) => {
    
    const productObj = productData.product.find((p) => p.id === f)
    return { ...productObj }
    
  })
  console.log(  "fffav dataaaaa",favouriteData);
  

  const handleDelete = (id) => {
    console.log("handledelete   ",id);
    dispatch(removeFav({id,uid:authData.user.uid}))
  }

  const handleCart = (id) => {

    dispatch(addToCart(id))
  }

  
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