import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RadioButton } from 'react-native-paper';
import { addOrderData } from '../../redux/slice/order.slice';
import { useRoute } from '@react-navigation/native';

export default function CheckOut({ navigation }) {

    const [selectValue, setSelectedValue] = useState(null)

    const dispatch = useDispatch()

    const route = useRoute()
    const total = route.params?.total
    const pData = route.params?.pData
    // console.log(pData, "llllllllllllllllllllllll");

    const authData = useSelector(state => state.auth)
    // console.log("okkkkkkkkkkkkkkkkkkkk", authData.user);
    
    const uid=authData.user.uid
    // console.log(uid,"uuuuuuiiiiiiiiiiiddddddddd");

    const oid = Math.floor(Math.random()*1000000)

    const handleRadio = (data) => {
        console.log(data, "radioooooooooooooooooooooo");
        dispatch(addOrderData({...data,uid: uid,pData : pData,total, orderId : oid}))
        setSelectedValue(data);
    }

    

    const goBack = () => {
        navigation.navigate('Address', {
            previousScreen: "CheckOut"
        })
    }
    return (
        <View>
            <RadioButton.Group 
            onValueChange={(value)=>setSelectedValue(value)}
            value={selectValue}>
                
            </RadioButton.Group>
            <ScrollView>
                {
                    authData.user.address.map((v, i) => {
                        // console.log(v,"vvvvvvvvvvvvvvvvvv");
                        return (
                            <View key={i} style={{ marginTop: 20, borderWidth: 1, borderRadius: 10, padding: 20, marginHorizontal: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value={i}
                                        status={selectValue === i ? 'checked' : 'unchecked'}
                                        onPress={() => handleRadio({i,v})}
                                        color='black'
                                    />
                                    <Text>Address {i + 1}</Text></View>

                                <Text>Name : {v.name}</Text>
                                <Text>Address : {v.address}</Text>
                                <Text>City : {v.city}</Text>
                                <Text>State : {v.state}</Text>
                                <Text>Country : {v.country}</Text>
                                <Text>Pincode : {v.pincode}</Text>
                            </View>
                        )

                    })
                }

                <TouchableOpacity onPress={() => { navigation.navigate('Address'), goBack() }} style={{
                    borderRadius: 20,
                    width: 370,
                    padding: 10,
                    marginHorizontal: 10,
                    backgroundColor: 'red',
                    marginTop: 15,
                    alignSelf: 'center'
                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Add Address</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Success')} style={{
                    borderRadius: 20,
                    width: 100,
                    padding: 10,
                    marginHorizontal: 10,
                    backgroundColor: 'black',
                    marginTop: 15,
                    alignSelf: 'center',
                    marginBottom: 10
                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Next</Text>
                </TouchableOpacity>
            </ScrollView>


        </View>
    )
}