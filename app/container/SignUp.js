
import { View, Text, StyleSheet, StatusBar, TextInput, Button, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
// import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function SignUp({navigation}) {
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');



  return (
    <View style={style.container}>
      <StatusBar
        animated={true}
        backgroundColor="#f5f5f5"
        barStyle="dark-content"

      />
      <MaterialIcons style={style.icon} name="keyboard-arrow-left" color={'black'} size={20} />
      <Text style={style.text}>Sign up</Text>

      <TextInput
        style={style.input}
        onChangeText={setname}
        value={name}
        placeholder='Name'
        placeholderTextColor="grey"
      />

      <TextInput
        style={style.input1}
        onChangeText={setemail}
        value={email}
        placeholder='Email'
        placeholderTextColor="grey"

      />
      <TextInput
        style={style.inputtext}
        onChangeText={setpassword}
        value={password}
        placeholder='Password'
        keyboardType='numeric'
        placeholderTextColor="grey"

      />
      <Text style={{ color: 'black', marginLeft: 170, marginTop: 8 }}>Alreay have an account? <FontAwesome style={style.icon} name="long-arrow-right" color={'red'} size={19} /></Text>

      {/* <View style = {style.buttontxt}>
            <Button
                title='Sign up'
                color  = 'red'
                style = {{backgroundColor : 'red'}}
            />
            </View> */}

      <Pressable
        style={style.buttontxt}
        onPress={() =>navigation.navigate('Product')}>
        <Text style={{ color: 'white' }}>SIGN UP</Text>

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
          <MaterialIcons name="facebook" color={'darkblue'} size={45} marginLeft={2}/>
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
      borderRadius : 5
  },
  input1: {
      marginTop: 10,
      // borderWidth : 1,
      marginHorizontal: 16,
      padding: 20,
      color: 'black',
      backgroundColor: 'white',
      borderRadius : 5

  },
  inputtext: {
      marginTop: 10,
      backgroundColor: 'white',
      padding: 20,
      marginHorizontal: 16,
      color: 'black',
      borderRadius : 5
  },
  textStyle: {
      color: 'black',
      marginHorizontal: 16,
      marginTop: 130,
      alignItems: 'center'
  }, 
  parent : {
      alignItems : 'center'
  },
  btnstyle :{
      marginTop : 10,
      backgroundColor : 'white',
      padding : 25,
      width : 90,
      marginHorizontal : 16,
      borderRadius : 30,
      marginLeft : 80,
  },
  btn :{
      marginTop : 10,
      backgroundColor : 'white',
      padding : 20,
      width : 85,
      borderRadius : 30,
      marginRight : 90,
      
  },
  btnparent : {
      flexDirection : 'row',
      justifyContent : 'space-between'
  }
})