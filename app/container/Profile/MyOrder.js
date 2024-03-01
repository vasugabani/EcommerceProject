import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Orderinput from '../../component/Orderinput'
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderData } from '../../redux/slice/order.slice';
// import Slider from 'react-native-slider';

export default function MyOrder({ navigation }) {
  const orderData = useSelector(state => state.order)
  // console.log(orderData, "lllllllllllllllllllllllll");

  const authData = useSelector(state => state.auth)
  // console.log(authData,"aaaaaaaaaaaaaaaaaaaaaaaaaaa");
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderData({ id: authData.user.uid }))
  }, [])
  return (
    <View>

      <View style={{ width: "100%", height: 50, padding: 5, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <TouchableOpacity style={{ width: '30%', height: '90%', borderRadius: 15, backgroundColor: 'black', padding: 5, marginLeft: 10 }}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '30%', height: '90%', borderRadius: 15, backgroundColor: 'white', padding: 5, marginLeft: 10 }}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>Processing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '30%', height: '90%', borderRadius: 15, backgroundColor: 'white', padding: 5, marginLeft: 10 }}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>

        {
          orderData.order.order?.map((v) => {

            console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvv", v);

            const totalQuantity = v.items.reduce((acc, item) => acc + item.qty, 0);
            console.log(totalQuantity,"tttttttttttttttttttttttttttt");
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
          })
        }

      </ScrollView>
    </View>
  )
}