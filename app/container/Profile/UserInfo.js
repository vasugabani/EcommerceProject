import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, verticalScale } from '../../constant/Metrices';

export default function UserInfo({ navigation }) {
    // const [modal, setmodel] = useState(false)

    const authData = useSelector(state => state.auth)
    console.log(authData, "==============================");

    const handleImage = () => {
        
    }

    
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <MaterialIcons style={style.icon} name="keyboard-arrow-left" color={'black'} size={34} /></TouchableOpacity>

            <View style={{ width: 150, height: 150, backgroundColor: 'black', borderRadius: 100, alignSelf: 'center', marginTop: 20, position: 'relative' }}>
                <Image
                    source={require('../../../assets/image/Profile.jpg')}
                    style={{ width: '100%', height: '100%', borderRadius: 100 }}
                />
                <TouchableOpacity onPress={handleImage()}>
                    <MaterialIcons style={style.camera} name="camera-alt" color={'black'} size={34} /></TouchableOpacity>
            </View>

            {/* {
                authData.user.map((v)=>{
                    console.log(v,">>>>>>>>>>>>>>>>>>>>>>>>>>>");
                })
            } */}

            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={{ backgroundColor: 'white', width: '100%', alignSelf: 'center', height: 150, borderRadius: 10, marginTop: verticalScale(650) }}>
                    <TouchableOpacity onPress={handlecross} style={{ marginLeft: horizontalScale(150) }}>
                        <MaterialCommunityIcons name='minus-thick' size={50} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleimage}>
                        <Text>OPEN CAMERA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>OPEN GALLERY</Text>
                    </TouchableOpacity>

                </View>
            </Modal> */}

            
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
        color: 'green',
        backgroundColor: 'white',
        width: 40,
        textAlign: 'center'
    }
})