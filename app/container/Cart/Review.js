import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import StarRating from '../../component/StarRating'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addReview, getReview } from '../../redux/slice/review.slice'


export default function Review() {

  useEffect(()=>{
    dispatch(getReview())
  },[])

  const dispatch = useDispatch()

  const [rating, setRating]=useState(0)
  const [review, setreview]=useState(null)
  // console.log(review,"rrrrrrrrrrrrrrrrrrrrrrr");
  // console.log(rating,"rrrrrrrrrrrrrrrrrrrrrrrrrrr");

  const authData = useSelector(state=>state.auth)
  console.log(authData.user.uid);

  const handleRate = (newRating) => {
    setRating(newRating)
  }

  const route=useRoute()

  const img=route.params?.image
  const pId=route.params?.pid
  const name=route.params?.title

  const handleSubmit = () => {
    dispatch(addReview({Rating:rating,Reviews:review,Userid:authData.user.uid,Productid:pId}))
  }
  // console.log(img,name,pId,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  return (
    <View style={{backgroundColor:'white'}}>
      <View style={{ width: 400, height: 300, alignSelf: 'center', borderBottomEndRadius: 20, borderBottomLeftRadius: 20, backgroundColor: 'red' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30, alignSelf: 'center', marginTop: 20 }}>Ecommerce</Text>
        <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', marginTop: 20 }}>Hello User...!</Text>
        <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', marginTop: 20 }}>You've recently bought <Text style={{fontWeight:'bold',fontSize: 18,}}>{name}</Text></Text>
        <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', marginTop: 20 }}>Tell us about your experience!</Text>
      </View>

      <View style={{ width: 180, height: 200, alignSelf: 'center', borderRadius: 20, backgroundColor: 'white', position: 'absolute', top: 220 }}>
        <Image 
          source={{uri:img}}
          style={{height:'100%',width:'100%',resizeMode:'center'}}
        />
      </View>

      <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center', marginTop: 150, fontWeight: 'bold',marginBottom:10 }}>Rate this product :</Text>
      <StarRating 
      rating={rating} onRate={handleRate}
      />

      <TextInput
      value={review}
      onChangeText={(text)=>setreview(text)}
        placeholder='Enter your review about product'
        style={{ marginTop: 20, borderWidth: 1, marginHorizontal: 16, borderRadius: 5, padding: 15 }}
      />

      <TouchableOpacity onPress={()=>handleSubmit()} style={{ marginTop: 20, borderRadius: 5, width: 100, padding: 10, alignSelf: 'center', backgroundColor: 'red',marginBottom:20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  )
}