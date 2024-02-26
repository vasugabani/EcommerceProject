import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AppInput from '../../component/InputBox/AppInput'
import AppButton from '../../component/Button/AppButton'
import { verticalScale } from '../../constant/Metrices'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, updateAddress } from '../../redux/slice/auth.slice'
export default function Address({ navigation }) {

  const [ update, setUpdate] = useState(false)
  const [oldData, setOldData] = useState(null)
  

  const addressSchema = yup.object({
    name: yup.string().required('Please enter your Name'),
    address: yup.string().required(),
    city: yup.string().required('Please enter your Name'),
    state: yup.string().required(),
    pincode: yup.string().required(),
    country: yup.string().required(),
  });

  const dispatch = useDispatch();

  const authData = useSelector(state => state.auth)
  
  
  

  const handleDelete = (data) => {
    console.log(data);
    dispatch(deleteAddress({address: data, uid:authData.user.uid}))
  }

  const handleEdit = (data) => {
    console.log(data,"eeeeeeeeeeeeeeeeeeeeeeeeee");
    setValues(data)
    setOldData(data)
    setUpdate(true)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: ''
    },
    validationSchema: addressSchema,
    onSubmit: (values, { resetForm }) => {
    

      if(update){
        console.log("user updateddddddddd");
        dispatch(updateAddress({address:values,oldData,uid:authData.user.uid}))
      }else{
        dispatch(addAddress({address: values, uid:authData.user.uid}))
      }
      
      resetForm();
      setUpdate(false)
    },
  });


  const { handleChange, handleBlur, handleSubmit, errors, touched, values, setValues } = formik
  
  

  return (
    <ScrollView>
      <AppInput
        name='name'
        placeholder="Full Name"
        type="default"
        onChangeTxt={handleChange('name')}
        onBlr={handleBlur('name')}
        value={values.name}
      />
      {touched.name && errors.name ? <Text>{errors.name}</Text> : null}

      <AppInput
        placeholder="Address"
        type="default"
        name='address'
        onChangeTxt={handleChange('address')}
        onBlr={handleBlur('address')}
        value={values.address}
      />
      {touched.address && errors.address ? <Text>{errors.address}</Text> : null}

      <AppInput
        placeholder="City"
        type="default"
        name='city'
        onChangeTxt={handleChange('city')}
        onBlr={handleBlur('city')}
        value={values.city}
      />
      {touched.city && errors.city ? <Text>{errors.city}</Text> : null}

      <AppInput
        placeholder="State/Province/Region"
        type="default"
        name='state'
        onChangeTxt={handleChange('state')}
        onBlr={handleBlur('state')}
        value={values.state}
      />
      {touched.state && errors.state ? <Text>{errors.state}</Text> : null}

      <AppInput
        placeholder="Zip Code(Postel Code)"
        type="numeric"
        name='pincode'
        onChangeTxt={handleChange('pincode')}
        onBlr={handleBlur('pincode')}
        value={values.pincode}
      />
      {touched.pincode && errors.pincode ? <Text>{errors.pincode}</Text> : null}

      <AppInput
        placeholder="Country"
        type="default"
        name='country'
        onChangeTxt={handleChange('country')}
        onBlr={handleBlur('country')}
        value={values.country}
      />
      {touched.country && errors.country ? <Text>{errors.country}</Text> : null}

      <View style={{ marginTop: verticalScale(40) }}>
        <AppButton
          titel="SAVE ADDRESS"
          onPress={handleSubmit}
        />
      </View>

      {
        authData.user.address.map((v,i)=>{
          console.log("=======================",v);
          return(
            <View key={i} style={{marginTop:20}}>
              <Text>{v.name}</Text>
              <Text>{v.address}</Text>
              <Text>{v.city}</Text>
              <Text>{v.state}</Text>
              <Text>{v.pincode}</Text>
              <Text>{v.country}</Text>
              <TouchableOpacity onPress={()=>handleEdit(v)} style={{backgroundColor:'blue',width:80,padding:10,borderRadius:5}}>
                <Text style={{color:'white',textAlign:'center'}}>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleDelete(v)} style={{backgroundColor:'red',width:80,padding:10,borderRadius:5,marginTop:10}}>
                <Text style={{color:'white',textAlign:'center'}}>DELETE</Text>
              </TouchableOpacity>
            </View>
          )
        })
      }

    </ScrollView>
  )
}