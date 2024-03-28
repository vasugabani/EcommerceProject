import { View, Text, StatusBar, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../../component/Button/AppButton';
import LikeCard from '../../component/Card/LikeCard';
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from '../../redux/slice/product.slice';
import { addToCart } from '../../redux/slice/cart.slice';
import { addToFavourite } from '../../redux/slice/favourite.slice';

export default function ProductDetails({ navigation }) {
  const [data, setData] = useState([])
  const [model, Setmodel] = useState(false)
  const [colormodel, Setcolormodel] = useState(false)
  const [active, setActive] = useState(false)
  const [modal, setmodal] = useState(false)

  const handleOpen = () => {
    setmodal(true)
  }
  const handleClose = () => {
    setmodal(false)
  }
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getProductData())
  }, [])

  const reviewData = useSelector(state => state.review)
  // console.log(reviewData.review, "rrrrrrrrrrrrrrrrrrrrrrr");

  const productSel = useSelector(state => state.product)

  const favouriteData = useSelector(state => state.favourite)

  const handleActive = (id) => {
    setActive(!active);
    dispatch(addToFavourite(id))
  }
  const handlepress = () => {
    Setmodel(true)
  }
  const handleclose = () => {
    Setmodel(false)
  }
  const HandleColorPress = () => {
    Setcolormodel(true)
  }
  const HandleColorClose = () => {
    Setcolormodel(false)
  }

  const route = useRoute()
  const id = route.params?.id

  const filterData = productSel.product.filter((v) => v.id == id)

  const handleCart = (id) => {

    dispatch(addToCart(id))
  }

  return (
    <ScrollView style={style.cointener}>
      <StatusBar
        backgroundColor='#FFFFFF'
        barStyle='dark-content'
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        {
          filterData.map((v, i) => {

            return (
              <View key={i}>
                <View style={style.imagebox}>
                  <Image
                    source={{ uri: v.image }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>

              </View>
            )
          })
        }
      </ScrollView>

      <View style={style.disbox}>


        <View style={style.btnbox}>
          <TouchableOpacity style={style.sizebox} onPress={() => handlepress()}>
            <Text style={{ marginLeft: horizontalScale(30), color: 'black', fontSize: moderateScale(15) }}>Size</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.sizebox} onPress={() => HandleColorPress()}>
            <Text style={{ marginLeft: horizontalScale(25), color: 'black', fontSize: moderateScale(15) }}>Color</Text>
          </TouchableOpacity>

          {
            filterData.map((v) => (
              <TouchableOpacity onpress style={style.likebox} onPress={() => handleActive(v.id)}>
                <MaterialCommunityIcons name={favouriteData.favourite.includes(v.id) ? 'cards-heart' : 'cards-heart-outline'} color={favouriteData.favourite.includes(v.id) ? 'red' : 'black'} size={moderateScale(20)} />
              </TouchableOpacity>
            ))
          }


        </View>

        {
          filterData.map((v) => {
            return (
              <View>
                <View style={style.textbox}>
                  <View ><Text style={{ fontSize: moderateScale(30), color: 'black' }}>{v.brand}</Text></View>
                  <View style={{ marginLeft: horizontalScale(200), marginTop: verticalScale(10) }}><Text style={{ fontSize: moderateScale(20), color: 'black' }}>{v.price}</Text></View>
                </View>

                <Text>{v.title}</Text>

                <View style={{ flexDirection: 'row', marginTop: verticalScale(5) }}>
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Text>(10)</Text>
                </View>

                <Text style={{ fontSize: moderateScale(16), color: 'black', marginTop: verticalScale(5) }}>{v.description}</Text>
              </View>
            )
          })
        }

      </View>
      <View style={{ width: '100%', height: verticalScale(100), backgroundColor: 'white', padding: 30, marginTop: verticalScale(15) }}>
        <AppButton
          titel="ADD TO CART"
          onPress={() => {
            filterData.map((v) => {
              handleCart(v.id)
              navigation.navigate('Bag')
            })
          }}
        />
      </View>

      <View style={{ width: '100%', height: verticalScale(50), borderWidth: 0.5, flexDirection: 'row' }}>
        <View><Text style={{ fontSize: moderateScale(20), color: 'black', marginTop: verticalScale(15), marginLeft: horizontalScale(20) }}>Shipping info</Text></View>
      </View>
      <View style={{ width: '100%', height: verticalScale(50), borderWidth: 0.5, flexDirection: 'row' }}>
        <View><Text style={{ fontSize: moderateScale(20), color: 'black', marginTop: verticalScale(15), marginLeft: horizontalScale(20) }}>Support</Text></View>

      </View>
          
      <View style={{ width: '100%', height: verticalScale(50), borderWidth: 0.5, flexDirection: 'row' }}>
        <View><Text style={{ fontSize: moderateScale(20), color: 'black', marginTop: verticalScale(15), marginLeft: horizontalScale(20) }}>Review</Text></View>
        <View style={{ marginLeft: 300, marginTop: 15 }}>
          <TouchableOpacity onPress={() => handleOpen()}><Feather name="chevron-down" color='black' size={moderateScale(20)} /></TouchableOpacity></View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
        >
          <View style={{ width: '100%', marginTop: verticalScale(510), backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => handleClose()} style={{ marginLeft: horizontalScale(150)}}>
              <MaterialCommunityIcons name='minus-thick' size={50} color={'black'} />
            </TouchableOpacity>
            <ScrollView style={{ height: 180 }}>
              {
                reviewData.review.Productid === id ? <View style={{ marginBottom: 10 }}><Text style={{ color: 'black', marginHorizontal: 15 }}>Review : <Text style={{ color: 'black', fontWeight: 'bold', }}>{reviewData.review.Reviews}</Text></Text>
                  <Text style={{ color: 'black', marginHorizontal: 15 }}>Rating : <Text style={{ color: 'black', fontWeight: 'bold', }}>{reviewData.review.Rating} star</Text></Text></View> : null
              }
            </ScrollView>
          </View>
        </Modal>
      </View>

      <Text style={{ fontSize: moderateScale(25), marginLeft: horizontalScale(20), marginTop: verticalScale(20), color: 'black', fontWeight: 'bold' }}>You can also like this</Text>

      <View style={{ width: '100%', height: verticalScale(330), backgroundColor: 'white', marginTop: verticalScale(10) }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LikeCard
            imgurl={require('../../../assets/image/img1.png')}
            price="$15"
            product="Night-Dress"
            titel="Mens Product"
          />
          <LikeCard
            imgurl={require('../../../assets/image/front-view-smart-man-holding-his-glasses.jpg')}
            price="$20"
            product="T-shirt"
            titel="Mens Product"
          />
          <LikeCard
            imgurl={require('../../../assets/image/beautiful-young-woman-dress-walking-isolated-white-background.jpg')}
            price="$17"
            product="Night-Dress"
            titel="Girls Product"
          />
        </ScrollView>
      </View>


      <View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={model}
        >
          <View style={style.modlestyle}>
            <TouchableOpacity style={{ width: 90, height: 7, backgroundColor: 'gray', marginLeft: 150 }} onPress={() => handleclose()}>
              <Feather name='minus' color={'black'} size={40} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: 'black', marginLeft: 150, marginTop: 30 }}>Select Size</Text>

            <View style={{ width: '100%', height: 150, marginTop: 20 }}>

              <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={style.size}>
                  <Text style={{ marginLeft: 30, color: 'black', fontSize: 15 }}>XS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.size}>
                  <Text style={{ marginLeft: 36, color: 'black', fontSize: 15 }}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.size}>
                  <Text style={{ marginLeft: 36, color: 'black', fontSize: 15 }}>M</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', height: 40, flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                <TouchableOpacity style={style.size}>
                  <Text style={{ marginLeft: 36, color: 'black', fontSize: 15 }}>L</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.size}>
                  <Text style={{ marginLeft: 30, color: 'black', fontSize: 15 }}>XL</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', height: 40, borderWidth: 0.5, marginTop: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', marginTop: 10, marginLeft: 20 }}>Size info</Text>
                <View style={{ marginLeft: 270, marginTop: 12 }}><Feather name="chevron-right" color={'black'} size={15} /></View>
              </View>
              <View style={{ width: '100%', height: 100, backgroundColor: 'white', padding: 30, marginTop: 4 }}>
                <AppButton
                  titel="ADD TO CART"
                />
              </View>
            </View>

          </View>
        </Modal>
      </View>

      <View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={colormodel}
        >
          <View style={style.modlestyle}>
            <TouchableOpacity style={{ width: 90, height: 7, backgroundColor: 'gray', marginLeft: 150 }} onPress={() => HandleColorClose()}>
              <Feather name='minus' color={'black'} size={40} />
            </TouchableOpacity>

            <Text style={{ fontSize: 22, color: 'black', marginLeft: 140, marginTop: 20 }}>Select Color</Text>

            <View style={{ flexDirection: 'row', marginTop: 40 }}>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'black', borderRadius: 100, marginLeft: 30 }}></TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'blue', borderRadius: 100, marginLeft: 30 }}></TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'orange', borderRadius: 100, marginLeft: 30 }}></TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'green', borderRadius: 100, marginLeft: 30 }}></TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'red', borderRadius: 100, marginLeft: 30 }}></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'pink', borderRadius: 100, marginLeft: 30 }}></TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'skyblue', borderRadius: 100, marginLeft: 30 }}></TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'gray', borderRadius: 100, marginLeft: 30 }}></TouchableOpacity>
            </View>

            <View style={{ width: '100%', height: 40, borderWidth: 0.5, marginTop: 15, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, color: 'black', marginTop: 10, marginLeft: 20 }}>Color info</Text>
              <View style={{ marginLeft: 270, marginTop: 12 }}><Feather name="chevron-right" color={'black'} size={15} /></View>
            </View>
            <View style={{ width: '100%', height: 100, backgroundColor: 'white', padding: 30 }}>
              <AppButton
                titel="ADD TO CART"
              />
            </View>

          </View>
        </Modal>
      </View>

    </ScrollView>
  )
}
const style = StyleSheet.create({
  imagebox: {
    width: horizontalScale(275),
    height: verticalScale(413),
    flexDirection: 'row',
    margin: 10
  },
  disbox: {
    width: '100%',
    height: verticalScale(200),
    padding: 12,
    flexDirection: 'column',
  },
  btnbox: {
    width: '100%',
    height: verticalScale(40),
    flexDirection: "row",
  },
  sizebox: {
    width: horizontalScale(100),
    height: "100%",
    borderWidth: 0.5,
    borderColor: "black",
    marginLeft: horizontalScale(40),
    borderRadius: moderateScale(4),
    backgroundColor: 'white',
    padding: 8
  },
  colorbox: {
    width: horizontalScale(100),
    height: "100%",
    borderWidth: 0.5,
    borderColor: "black",
    marginLeft: horizontalScale(40),
    borderRadius: moderateScale(4),
    backgroundColor: 'white',
    padding: 8
  },
  likebox: {
    width: horizontalScale(37),
    height: '100%',
    borderWidth: 0.5,
    borderColor: "black",
    marginLeft: horizontalScale(30),
    borderRadius: moderateScale(160),
    backgroundColor: 'white',
    padding: 7,
    paddingRight: horizontalScale(4)
  },
  textbox: {
    width: "100%",
    height: verticalScale(35),
    marginTop: verticalScale(15),
    flexDirection: 'row'
  },
  addbtn: {
    backgroundColor: 'red'
  },
  modlestyle: {
    width: '100%',
    height: verticalScale(350),
    backgroundColor: 'white',
    borderRadius: moderateScale(40),
    shadowOpacity: 0.10,
    shadowRadius: 30,
    elevation: 9,
    marginTop: verticalScale(440)
  },
  size: {
    width: horizontalScale(100),
    height: verticalScale(40),
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: moderateScale(4),
    backgroundColor: 'white',
    padding: 8,
  }
})