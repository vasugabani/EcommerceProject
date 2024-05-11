import { View, Text, StyleSheet, StatusBar, TextInput, Button, Pressable, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
// import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { errorReset, loginEmailPass } from '../redux/slice/auth.slice';

export default function Login({ navigation }) {

  const dispatch = useDispatch()

  const authData = useSelector(state=>state.auth)
  console.log(authData.loginError,"eeeeeeeeeeeeeeeeeeeeeeeeee");

  const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, "enter strong password").required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(loginEmailPass(values))
      resetForm();
    },
  });

  const emailAlert = () => {
    
    Alert.alert('Login Failed', 'your email is not verify', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(errorReset());
          console.log('user verify');
        }
      }
    ]);
}

  const { handleChange, handleBlur, handleSubmit, errors, touched, values } = formik

  return (
  
    <>
    {
      authData.loginError !== null ? emailAlert() :
    
    <View style={style.container}>
      <StatusBar
        animated={true}
        backgroundColor="#f5f5f5"
        barStyle="dark-content"
      />

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <MaterialIcons style={style.icon} name="keyboard-arrow-left" color={'black'} size={34} /></TouchableOpacity>
      <Text style={style.text}>Login</Text>

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
        placeholderTextColor="grey"
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
      />
      {touched.password && errors.password ? <Text style={style.error}>{errors.password}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('Password')}>
        <Text style={{ color: 'black', marginLeft: 184, marginTop: 8 }}>Forget Your Password <FontAwesome style={style.icon} name="long-arrow-right" color={'red'} size={19} /></Text>
      </TouchableOpacity>

      <Pressable
        style={style.buttontxt}
        onPress={handleSubmit}>
        <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>

      </Pressable>
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
          <MaterialIcons name="facebook" color={'darkblue'} size={26} marginLeft={15} />
        </Pressable>
      </View>
    </View>
    }
    </>
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

  input1: {
    marginTop: 70,
    // borderWidth : 1,
    marginHorizontal: 16,
    padding: 20,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5

  },
  inputtext: {
    marginTop: 15,
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
    alignItems: 'center',
    marginTop: 70
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
    padding: 25,
    width: 90,
    borderRadius: 30,
    marginRight: 90,
  },
  btnparent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop : 80
  },
  error: {
    fontWeight: 'bold',
    color: 'red'
  }
})