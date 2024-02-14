
import { View, Text, StyleSheet, StatusBar, TextInput, Button, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { signupEmailPass } from '../redux/slice/auth.slice';


export default function SignUp({ navigation }) {

  const accountSchema = yup.object({
    name:yup.string().matches(/^[a-zA-z]{2,16}$/,'Name must be between 2 characters').required('Please enter your Name'),
    email:yup.string().email().required(),
    password:yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, "enter strong password").required(),
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
    },
    validationSchema:accountSchema,
    onSubmit: (values,{resetForm}) => {
      console.log(values);

      dispatch(signupEmailPass(values));
      resetForm();
    },
  });

  const {handleChange,handleBlur,handleSubmit,errors,touched,values} = formik

  return (
    <View style={style.container}>
      <StatusBar
        animated={true}
        backgroundColor="#f5f5f5"
        barStyle="dark-content"

      />
      {/* <MaterialIcons style={style.icon} name="keyboard-arrow-left" color={'black'} size={20} /> */}
      <Text style={style.text}>Sign up</Text>

      <TextInput
        style={style.input}
        name='name'
        placeholder='Name'
        placeholderTextColor="grey"
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        value={values.name}
      />
      {touched.name && errors.name ? <Text style={style.error}>{errors.name}</Text> : null}

      <TextInput
        style={style.input1}
        name='email'
        placeholder='Email'
        placeholderTextColor="grey"
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
      />
      {touched.email && errors.email ? <Text style={style.error}>{errors.email}</Text> : null}

      <TextInput
        style={style.inputtext}
        name='password'
        placeholder='Password'
        value={values.password}
        placeholderTextColor="grey"
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}

      />
      {touched.password && errors.password ? <Text style={style.error}>{errors.password}</Text> : null}

      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style={{ color: 'black', marginLeft: 170, marginTop: 8 }}>Alreay have an account? </Text>
      </TouchableOpacity>
      {/* <View style = {style.buttontxt}>
            <Button
                title='Sign up'
                color  = 'red'
                style = {{backgroundColor : 'red'}}
            />
            </View> */}

      <TouchableOpacity style={style.buttontxt} onPress={handleSubmit}>
        <Text style={{ color: 'white' }}>SIGN UP</Text>
        </TouchableOpacity>
      <View style={style.parent}>
        <Text style={style.textStyle}>Or sign up with social account</Text>
      </View>

      <View style={style.btnparent}>
        <Pressable
          style={style.btnstyle}
          onPress={() => ('')}>
        </Pressable>
        <Pressable
          style={style.btn}
          onPress={() => ('')}>
          <MaterialIcons name="facebook" color={'darkblue'} size={45} marginLeft={2} />
        </Pressable>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    // height : 'auto',
    height: 1000,
    backgroundColor: '#f5f5f5',
    // marginHorizontal : 16,
  },
  text: {
    color: 'black',
    fontSize: 30,
    marginTop: 20,
    // fontWeight : 'bold'
    marginHorizontal: 16,
    fontFamily: 'METRO POLICE BOLD'
  },
  icon: {
    marginTop: 15,
    marginHorizontal: 16,
  },
  buttontxt: {
    // color : 'white',
    backgroundColor: 'red',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 30,
    marginTop: 24,
    // alignContent : 'center'
    alignItems: 'center',
    color: 'white',
  },
  input: {
    marginTop: 56,
    // borderWidth : 1,
    marginHorizontal: 16,
    padding: 20,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5
  },
  input1: {
    marginTop: 10,
    // borderWidth : 1,
    marginHorizontal: 16,
    padding: 20,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5

  },
  inputtext: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 16,
    color: 'black',
    borderRadius: 5
  },
  textStyle: {
    color: 'black',
    marginHorizontal: 16,
    marginTop: 130,
    alignItems: 'center'
  },
  parent: {
    alignItems: 'center'
  },
  btnstyle: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 25,
    width: 90,
    marginHorizontal: 16,
    borderRadius: 30,
    marginLeft: 80,
  },
  btn: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 20,
    width: 85,
    borderRadius: 30,
    marginRight: 90,

  },
  btnparent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  error:{
    fontWeight:'bold',
    color:'red'
  }
})