import { View, Text, StatusBar, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppButton from '../../component/Button/AppButton';
import LikeCard from '../../component/Card/LikeCard';
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from '../../redux/slice/product.slice';
import { addCart, addToCart } from '../../redux/slice/cart.slice';
import { addToFav, addToFavourite, removeFav } from '../../redux/slice/favourite.slice';
import { getReview } from '../../redux/slice/review.slice';
import { addUserInfo, getUsers } from '../../redux/slice/auth.slice';


export default function ProductDetails({ navigation }) {
  const [data, setData] = useState([])
  const [model, Setmodel] = useState(false)
  const [colormodel, Setcolormodel] = useState(false)
  const [active, setActive] = useState(false)
  const [modal, setmodal] = useState(false)

  useEffect(() => {

    dispatch(getProductData())
    dispatch(getReview())
    dispatch(getUsers())

    navigation.setOptions({
      title : route.params.title
    })
  }, [])

  const handleOpen = () => {
    setmodal(true)
  }
  const handleClose = () => {
    setmodal(false)
  }
  const dispatch = useDispatch()

  const reviewData = useSelector(state => state.review)
  // console.log("rrrrrrrrrrrrrrrrrrrrrrr", reviewData.review);

  const productSel = useSelector(state => state.product)

  const authData = useSelector(state => state.auth)
  // console.log("rrrrrrrrrrrrrrrrrrrrrrr111111111111111111111", authData.user.uid);

  const favouriteData = useSelector(state => state.favourite)



  const handleActive = (id) => {
    setActive(!active);

    const isFavorite = favouriteData.favourite.includes(id);

    if (isFavorite) {
      dispatch(removeFav({ id, uid: authData.user.uid }));
    } else {
      dispatch(addToFav({ id, uid: authData.user.uid }))
    }
    // console.log("handle activeeeeeeee",v);


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

  const handleCart = (data) => {
    console.log(data, "dddddddddddddddddddddddddd");
    // dispatch(addToCart(data.id))
    dispatch(addCart({ ...data, uid: authData.user.uid }))
  }

  const filterReview = reviewData.review.filter((v) => v.Productid === id)
  // console.log("ffffffffffffffffffffffff", filterReview);

  let totalRating = 0;
  let totalUser = filterReview.length;

  filterReview.forEach(review => {
    totalRating += review.Rating;
  });

  let averageRating = totalUser > 0 ? totalRating / totalUser : 0;

  const stars = [];
  let remainingRating = averageRating;
  for (let i = 0; i < 5; i++) {
    if (remainingRating >= 1) {
      stars.push({ type: 'star', color: 'gold' });
      remainingRating -= 1;
    } else if (remainingRating >= 0.5) {
      stars.push({ type: 'star-half', color: 'gold' });
      remainingRating -= 0.5;
    } else {
      stars.push({ type: 'star-border', color: 'gold' });
    }
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
            // console.log(v,"uuuuuuuuuuuuuuuuuuu555555555555555555555555");
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

                {/* <View style={{ flexDirection: 'row', marginTop: verticalScale(5) }}>
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Feather name="star" color='#FFBA49' size={moderateScale(16)} />
                  <Text>(10)</Text>
                </View> */}

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
              handleCart(v)
              navigation.navigate('BagStack')
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
          <View style={{ width: '100%', marginTop: verticalScale(430), backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => handleClose()} style={{ marginLeft: horizontalScale(150) }}>
              <MaterialCommunityIcons name='minus-thick' size={50} color={'black'} />
            </TouchableOpacity>
            <ScrollView style={{ height: 300, marginBottom: 25 }}>

              <View style={{ marginTop: 20, }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  {stars.map((star, index) => (
                    <MaterialIcons
                      key={index}
                      name={star.type}
                      color={star.color}
                      size={35}
                      style={{ marginLeft: 10 }}
                    />
                  ))}
                </View>
                <Text style={{ fontSize: 16, color: 'black', marginTop: 5, textAlign: 'center' }}>
                  Average Rating: {averageRating.toFixed(1)}/5
                </Text>
              </View>



              {
                reviewData.review.map((v) => {
                  // console.log("33333333333333333333332222222222222", v);

                  return (
                    v.Productid === id ?

                      <View style={{ marginTop: 35, }}>
                        <View style={{ marginBottom: 5 }}>
                          <Text style={{ color: 'black', marginHorizontal: 15 }}>Review By
                            {
                              authData.allUser.map((v1) => {
                                // console.log("vvvvvvvvvvvvvvv", v1);
                                if (v1.uid === v.Userid) {
                                  return (
                                    <>
                                      <Text style={{ color: 'black', fontWeight: 'bold', }}> {v1.name},
                                      </Text></>
                                  )
                                }
                              })
                            }
                          </Text></View>

                        <View style={{ marginBottom: 5 }}>
                          <Text style={{ color: 'black', marginHorizontal: 15 }}>Review :
                            <Text style={{ color: 'black', fontWeight: 'bold', }}>{v.Reviews}
                            </Text></Text></View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ color: 'black', marginLeft: 15 }}>Rating :</Text>
                          <View style={{ flexDirection: 'row', marginTop: verticalScale(2) }}>
                            {[...Array(v.Rating)].map((_, index) => (
                              <MaterialIcons key={index} name="star" color='#FFBA49' size={16} />
                            ))}
                            {[...Array(5 - v.Rating)].map((_, index) => (
                              <MaterialIcons key={index} name="star-border" color='#FFBA49' size={16} />
                            ))}
                            <Text style={{ color: 'grey' }}>({v.Rating})</Text>
                          </View>
                        </View>
                      </View>

                      : null
                  )
                })
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