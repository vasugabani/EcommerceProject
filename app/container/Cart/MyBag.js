import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import BagCard from '../../component/Card/BagCard'
import Feather from 'react-native-vector-icons/Feather';
import AppButton from '../../component/Button/AppButton';
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, decrementCart, getCart, incrementCart, removeCart } from '../../redux/slice/cart.slice';

export default function MyBag({ navigation }) {

  const dispatch = useDispatch()

  const auth=useSelector(state=>state.auth)
  // console.log("1111111111111111111111111111111",auth.user.uid);
const userid=auth.user.uid;
  useEffect(()=>{
    dispatch(getCart(userid))
    
  },[])

  const product = useSelector(state => state.product)
  const cart = useSelector(state => state.cart)
  // console.log(cart.cart,"::::::::::::::::::::::::::::::::");



  const allData = cart.cart.map((c) => {
    const productObj = product.product.find((p) => p.id == c.id)
    
    return { ...productObj, qty: c.qty, }
  });
console.log(allData,"jjjjjjjjjjjj888888888888888");

  const priceData = allData.map((p)=>{
    // console.log(p,"qqqqqqqqqqqqqqqqqqqqqqqqqqqq");
    const cdata=cart.cart.find((c)=>c.id === p.id)

    return {...cdata, price : p.price}
  })
  console.log(priceData,"jjjjjjjjjjjjjjjjjjjjjjj");

  const totalAmount = allData.reduce((acc, v, i) => acc + (v.price*v.qty) ,0)

  const HandleAction = () => {
    navigation.navigate('CheckOut',{total:totalAmount,pData:priceData})
  }

  const handleIncrement = (data) => {
    // console.log(data,"iiiiiiiiiiiiiiiiiiiiiiiiiii");
    dispatch(incrementCart({...data,uid:auth.user.uid}))
    
  }

  const handleDecrement = (data) => {
    dispatch(decrementCart({...data,uid:auth.user.uid}))
  }

  const handleRemove = (data) => {
    console.log(data,"iiiiiiiiiiiiiiiiiiiiiiiiiii");
    dispatch(removeCart({data,uid:auth.user.uid}))
  }
  return (
    <View>
      <ScrollView>
        <Text style={{ fontWeight: 'bold', fontSize: 32, marginTop: verticalScale(14), marginLeft: horizontalScale(20), color: 'black' }}>My Bag</Text>

        {
          allData== ''? <View style={{flex:1,marginTop:20}}><Text style={style.empty}>Not any product in your bag</Text></View>:
          cart.isLoading?
          <ActivityIndicator size={'large'} color={'red'}/>:
          cart.error?<Text>{cart.error.message}</Text>:
          allData.map((v, i) => (
            <View key={i}>
              <BagCard
                imgurl={v.image}
                color="white"
                size="L"
                price={v.price*v.qty}
                Quantity={v.qty}
                Product={v.title}
                plusQty={()=>handleIncrement(v)}
                minusQty={()=>handleDecrement(v)}
                removeQty={()=>handleRemove(v.id)}
              />
            </View>
          ))
        }

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{
              width: horizontalScale(250), height: verticalScale(40), marginLeft: horizontalScale(20), marginTop: verticalScale(20), backgroundColor: "white", borderRadius: moderateScale(8), shadowOpacity: 0.10,
              shadowRadius: 30, elevation: 4
            }}
            placeholder="Enter Your Promo Code"
            keyboardType="numeric"
          />
          <TouchableOpacity style={{ width: horizontalScale(40), height: verticalScale(40), backgroundColor: 'black', borderRadius: moderateScale(100), marginTop: verticalScale(20), padding: 10, marginLeft: horizontalScale(45) }}>
            <Feather name='arrow-right' size={moderateScale(18)} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', marginTop: verticalScale(30), marginLeft: horizontalScale(20), }}>
          <Text style={{ fontSize: moderateScale(15), marginTop: 5 }}>Total Amount:</Text>
          <Text style={{ fontSize: moderateScale(18), marginLeft: 200, color: 'black', fontWeight: 'bold' }}>{totalAmount}</Text>
        </View>
        <View style={{ marginTop: verticalScale(10) }}>
          <AppButton
            titel="CHECK OUT"
            onPress={() => HandleAction()}
          />
        </View>
      </ScrollView>
    </View>
  )
}
const style = StyleSheet.create({
  empty:{
    fontSize:18,
    color:'grey',
    textAlign:'center',
    
  }
})