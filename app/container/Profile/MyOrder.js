import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Orderinput from '../../component/Orderinput'
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderData } from '../../redux/slice/order.slice';
import styles from 'rn-range-slider/styles';
// import Slider from 'react-native-slider';

export default function MyOrder({ navigation }) {

  const [selStatus , setStatus] = useState('pending')
  

  const orderData = useSelector(state => state.order)
  // console.log(orderData, "lllllllllllllllllllllllll");

  const authData = useSelector(state => state.auth)
  console.log(authData.user,"aaaaaaaaaaaaaaaaaaaaaaaaaaa");
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderData({ id: authData.user.uid }))
  }, [])
  return (
    <View>

      <View style={{ width: "100%", height: 50, padding: 5, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <TouchableOpacity onPress={()=>setStatus('pending')} style={[style.btn1,selStatus == 'pending' ? {backgroundColor:'black'}:{backgroundColor:'white'}]}>
          <Text style={[style.btnTxt, selStatus == 'pending' ? {color:'white'}:{color:'black'}]}>pending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setStatus('Delievery')} style={[style.btn1,selStatus == 'Delievery' ? {backgroundColor:'black'}:{backgroundColor:'white'}]}>
          <Text style={[style.btnTxt, selStatus == 'Delievery' ? {color:'white'}:{color:'black'}]}>Delievery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setStatus('Cancelled')} style={[style.btn1,selStatus == 'Cancelled' ? {backgroundColor:'black'}:{backgroundColor:'white'}]}>
          <Text style={[style.btnTxt, selStatus == 'Cancelled' ? {color:'white'}:{color:'black'}]}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>

        {
          orderData.order.order?.map((v) => {

            // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvv", v);

            const totalQuantity = v.items.reduce((acc, item) => acc + item.qty, 0);
            // console.log(totalQuantity,"tttttttttttttttttttttttttttt");

            if(v.status === selStatus){
              return(
                <Orderinput
                      ordernumber={v.orderId}
                      date={v.orderDate}
                      // TNumber="jjjj"
                      Quantity={totalQuantity}
                      Amount={v.totalAmount}
                      status={v.status}
                      onPress={()=>navigation.navigate('OrderDetails',{orderid:v.orderId,totalAmount:v.totalAmount})}
                    />
                )
            }
           
          })
        }

      </ScrollView>
    </View>
  )
}
const style = StyleSheet.create({
  btn1:{ 
    width: '30%',
   height: '90%', borderRadius: 15, padding: 5, marginLeft: 10 },
   btnTxt:{ textAlign: 'center',  fontSize: 16 },
})

//Surat@123456789