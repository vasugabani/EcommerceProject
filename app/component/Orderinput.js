import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../constant/Metrices'

export default function Orderinput({ordernumber,date,TNumber,Quantity,Amount,status}) {
  return (
    <View>
     <View style={{width:'95%',height:verticalScale(170),padding:15,marginTop:verticalScale(20),backgroundColor:'white',marginLeft:horizontalScale(10),borderRadius:moderateScale(10),shadowOpacity: 1,shadowRadius:20,elevation:4,}}>
        <View style={{flexDirection:'row',}}>
            <Text style={{color:'black',fontSize:moderateScale(18)}}>Order-No:{ordernumber}</Text>
            <Text style={{fontSize:moderateScale(15),marginLeft:horizontalScale(100)}}>{date}</Text>
        </View>
        <Text style={{fontSize:moderateScale(16),marginTop:verticalScale(8)}}>Tracking number: <Text  style={{fontSize:moderateScale(16),color:'black'}}>{TNumber}</Text></Text>
        <View style={{flexDirection:'row',marginTop:verticalScale(8)}}>
            <Text style={{fontSize:moderateScale(16),}}>Quantity:<Text  style={{fontSize:16,color:'black'}}>{Quantity}</Text></Text>
            <Text style={{fontSize:moderateScale(18),marginTop:verticalScale(5),marginLeft:horizontalScale(113)}}>Total Amount:<Text  style={{fontSize:moderateScale(18),color:'black',}}>{Amount}</Text></Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{width:horizontalScale(100),height:verticalScale(45),borderWidth:1,borderRadius:25,shadowOpacity: 0.25,shadowRadius: 30, elevation:4,backgroundColor:'white',padding:10,marginTop:5}}>
            <Text style={{fontSize:moderateScale(16),color:'black',alignSelf:'center'}}>Details</Text>
        </TouchableOpacity>
        <Text style={{color:'green',fontSize:moderateScale(18),marginLeft:horizontalScale(150),marginTop:verticalScale(15)}}>{status}</Text>
        </View>
        
      </View>
    </View>
  )
}