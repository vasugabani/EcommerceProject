import { View, Text, Image, ScrollView, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '../../component/Button/Button'
import Card from '../../component/Card/Card'

export default function Product({ navigation }) {
  return (
    <View style={style.containor}>
      {/* <Text>Product</Text> */}
      <ScrollView
        scrollEventThrottle={16}
      >
        <Image
          style={{ position: 'relative' , width:'100%' }}
          source={require('../../../assets/image/BigBanner.png')}
        />

        <View style={{ position: 'absolute', }}>
          <Text style={{ color: 'white', marginTop: 310, fontSize: 50 }}>Fashion</Text>
          <Text style={{ color: 'white', fontSize: 50 }}>Sale</Text>
          <Pressable
            style={{ backgroundColor: '#DB3022', padding: 10, borderRadius: 20, marginTop: 20 }}
            onPress={() => { }}>
            <Text style={{ color: 'white', textAlign: 'center', }}>Check</Text>
          </Pressable>
        </View>

        <View style={{ position: 'relative', marginTop: 12 }}>
          <Text style={style.text}>New</Text>
          <Text style={style.subhead}>You’ve never seen it before!</Text>
          <Text style={{ position: 'absolute', color: 'black', marginLeft: 300, marginTop: 35 }}>View all</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >

          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
            <Card
              imguri={require('../../../assets/image/fashion.jpg')}
              title="Dorothy Perkins"
              mainTitle='Evening Dreese'
              Dollar={'12$'}
              discount='NEW'
              disColor='black'
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
            <Card
              imguri={require('../../../assets/image/mens.jpg')}
              title="Sitlly"
              mainTitle='Denim Jacket'
              Dollar={'19$'}
              discount='NEW'
              disColor='black'

            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
            <Card
              imguri={require('../../../assets/image/girls.jpg')}
              title="Dorothy Perkins"
              mainTitle='Evening Dreese'
              Dollar={'20$'}
              discount='NEW'
              disColor='black'

            />
          </TouchableOpacity>
        </ScrollView>


        {/* //--------------------------------------------------------------------------------------------- */}


        <View style={{ flex: 1, marginTop: 30 }}>
          <Text style={style.text}>Sale</Text>
          <Text style={style.subhead}>Super Summer Sale</Text>
          <Text style={{ position: 'absolute', color: 'black', marginLeft: 300, marginTop: 35 }}>View all</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
            <Card
              imguri={require('../../../assets/image/mens3.jpg')}
              title="Dorothy Perkins"
              mainTitle='Denim Jacket'
              Dollar={'12$'}
              discount='-20%'
              disColor='#DB3022'
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>

            <Card
              imguri={require('../../../assets/image/newfashion.jpg')}
              title="Sitlly"
              mainTitle='Sport Dress'
              Dollar={'19$'}
              discount='-15%'
              disColor='#DB3022'
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>

            <Card
              imguri={require('../../../assets/image/mens.jpg')}
              title="Dorothy Perkins"
              mainTitle='Denim Jacket'
              Dollar={'20$'}
              discount='-20%'
              disColor='#DB3022'
            />
          </TouchableOpacity>

        </ScrollView>

        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <Image
            style={{ marginTop: 20 ,width:'100%'}}
            source={require('../../../assets/image/main.png')}
          />
          <Text style={{ color: 'white', position: 'absolute', marginTop: 1580, fontSize: 30, marginLeft: 135 }}>New Collection</Text>
        </TouchableOpacity>


        <View style={style.collectionBox}>

          <View style={{ width: 180, height: 380 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <View style={{ width: 180, height: 170, }}>
                <Text style={{ color: '#DB3022', fontSize: 35, marginTop: 35, marginLeft: 16 }}>Summer </Text>
                <Text style={{ color: '#DB3022', fontSize: 35, marginLeft: 16 }}>Sale </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <View style={{ width: 170, height: 200 }}>
                <Image
                  style={{ width: 180, height: 200 }}
                  source={require('../../../assets/image/Black.png')}
                />
                <Text style={{ position: 'absolute', color: 'white', left: 0, bottom: 0, marginBottom: 16, marginHorizontal: 16, fontSize: 35 }}>Black</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <View style={{ width: 180, height: 380, }}>
              <Image
                style={{ width: 220, height: "100%" }}
                source={require("../../../assets/image/mensHoodie.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* <Button
          title='Go to Categories'
          onPress={() => navigation.navigate('Categories')}
        /> */}
      </ScrollView>
    </View>

  )
}
const style = StyleSheet.create({
  containor: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 12,
    marginHorizontal: 16
  },
  subhead: {
    color: '#9B9B9B',
    marginHorizontal: 16
  },
  saletxt: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 30,
    marginHorizontal: 16
  },
  collectionBox: {
    // width: 370,
    height: 370,
    flexDirection: 'row',
   
  },
  imgStyle: {
    resizeMode: 'contain',
    marginLeft: 176,
    width: '100%',
    height: '100%',
  }
})