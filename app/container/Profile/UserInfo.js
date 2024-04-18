import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, verticalScale } from '../../constant/Metrices';
import ImagePicker from 'react-native-image-crop-picker';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { addUserInfo } from '../../redux/slice/auth.slice';
export default function UserInfo({ navigation }) {

    const dispatch=useDispatch()

    const [modal, setmodel] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);

    const authData = useSelector(state => state.auth)
    console.log(authData, "==============================");

    const handleToggle = () => {
        setmodel(true)
    }

    const handlecross = () => {
        setmodel(false)
    }

    const handleModal = () => {
        setModalVisible(true)
    }

    const handleclose = () => {
        setModalVisible(false);
    }

    const handleGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            setFieldValue('image',image)
          }).catch(error=>console.log(error))
    }

    const handleCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setFieldValue('image',image)
          }).catch(error=>console.log(error))
    }

    const userSchema = yup.object({
        image:yup.mixed().required(),
        number:yup.string().matches(/^[0-9]{10}$/, "enter valid number").required(),
    });

    const formik=useFormik({
        initialValues:{
            image:'',
            number:'',
        },
        validationSchema:userSchema,
        onSubmit:(values,{resetForm})=>{
            console.log(values);

            dispatch(addUserInfo({...authData.user,...values,uid:authData.user.uid}))
            resetForm()
        }
    });

    const {handleChange,handleBlur,handleSubmit,touched,errors,setFieldValue,values}=formik
 
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <MaterialIcons style={style.icon} name="keyboard-arrow-left" color={'black'} size={34} /></TouchableOpacity>

            <View style={{ width: 150, height: 150, backgroundColor: 'black', borderRadius: 100, alignSelf: 'center', marginTop: 20, position: 'relative' }}>
                <TouchableOpacity onPress={handleModal}>
                <Image
                    source={{uri:authData.user.imageURL}}
                    style={{ width: '100%', height: '100%', borderRadius: 100 }}
                /></TouchableOpacity>
                <TouchableOpacity onPress={handleToggle}>
                    <MaterialIcons style={style.camera} name="camera-alt" color={'black'} size={34} /></TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={{ backgroundColor: 'white', width: '100%', alignSelf: 'center', height: 150, borderRadius: 10, marginTop: verticalScale(650) }}>
                    <TouchableOpacity onPress={handlecross} style={{ marginLeft: horizontalScale(150) }}>
                        <MaterialCommunityIcons name='minus-thick' size={50} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCamera}>
                        <Text><MaterialCommunityIcons name='camera' size={50} color={'black'} /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGallery}>
                    <Text><MaterialCommunityIcons name='camera-burst' size={50} color={'black'} /></Text>
                    </TouchableOpacity>

                </View>
            </Modal>

            <TextInput 
                value={authData.user.name}
                style={{borderWidth:1, paddingHorizontal:20,marginHorizontal:40,marginTop:20,fontWeight:'bold',color:'black',borderRadius:5}}
            />
            <TextInput 
                value={authData.user.email}
                style={{borderWidth:1, paddingHorizontal:20,marginHorizontal:40,marginTop:20,fontWeight:'bold',color:'black',borderRadius:5}}
            />

            <TextInput 
                name='number'
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                placeholder='enter mobile number'
                value={values.number}
                style={{borderWidth:1, paddingHorizontal:20,marginHorizontal:40,marginTop:20,fontWeight:'bold',color:'black',borderRadius:5}}
            />
            {touched.number && errors.number ? <Text>{errors.number}</Text> : null}

            <TouchableOpacity onPress={handleSubmit} style={{width:100,padding:10,backgroundColor:'black',alignSelf:'center',marginTop:40,borderRadius:5}}>
                <Text style={{fontWeight:'bold',color:'white',textAlign:'center'}}>SUBMIT</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
            >
                <View style={{ backgroundColor: 'white', width: '100%', alignSelf: 'center', height: 800, borderRadius: 10 }}>
                    <TouchableOpacity onPress={handleclose} style={{ marginLeft: horizontalScale(150) }}>
                        <MaterialIcons style={style.icon1} name="keyboard-arrow-left" color={'black'} size={34} />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: authData.user.imageURL }}
                        style={{ width: 400, height: 500, marginTop: 100, alignSelf: 'center' }}
                    />
                </View>
            </Modal>
        </View>
    )
}

const style = StyleSheet.create({
    icon: {
        marginTop: 15,
        marginHorizontal: 16,

    },
    camera: {
        position: 'absolute',
        // borderWidth:1,
        borderRadius: 20,
        bottom: 10,
        right: 0,
        color: 'black',
        backgroundColor: 'white',
        width: 40,
        textAlign: 'center'
    },
    icon1: {
        marginTop: 15,
        marginHorizontal: 16,
        marginRight: 150,
    },
})