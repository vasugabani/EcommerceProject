import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import Order from '../../component/Order';

export default function OrderDetails({navigation}) {
  const orderData = useSelector(state => state.order)
  // console.log(orderData, "lllllllllllllllllllllllll");

  const route = useRoute()
  const orderNo = route.params?.orderid
  const total = route.params?.totalAmount
  // console.log(total, "9999999999999999");

  const data = orderData.order.order.filter((v) => v.orderId === orderNo)
  console.log(data);

  const productData = useSelector(state => state.product)

  return (
    <View>
      {
        data.map((v) => {
          return v.items.map((items) => {
            const filter = productData.product.filter((f) => f.id === items.id)
            return filter.map((va, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={()=>navigation.navigate('ProductDetails',{ id: va.id })}>
                  <Order
                    imgurl={va.image}
                    price={items.price * items.qty}
                    Quantity={items.qty}
                    Product={va.title}
                  />
                  </TouchableOpacity>
                </View>
              )
            })
          })
        })
      }
      <View style={{width:350,padding:10,marginTop:20,borderRadius:10,alignSelf:'center',backgroundColor:'white'}}>
        <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>Total Amount  :  <Text style={{color:'green'}}>{total}</Text></Text>
      </View>

      {
        data.map((v)=>{
          console.log(v);
          return(
            <View style={{padding:10,marginHorizontal:16,backgroundColor:'white',borderRadius:10,marginTop:20}}>
              <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>Shipping Address</Text>

              <View style={{flexDirection:'row',marginBottom:2,marginTop:5}}> 
              <Text style={{fontSize:16,fontWeight:'bold'}}>{v.address.name}</Text>
              </View>

              <View style={{flexDirection:'row',margin:2}}> 
              
              <Text>{v.address.address}</Text><Text>,{v.address.city}</Text><Text>- {v.address.pincode}</Text><Text>,{v.address.state}</Text><Text>,{v.address.country}</Text>
              </View>

            </View>
          )
        })
      }
    </View>
  )
}