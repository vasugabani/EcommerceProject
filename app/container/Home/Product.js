import { View, Text, Image, ScrollView, Pressable, StyleSheet, TouchableOpacity, RefreshControl, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import Button from '../../component/Button/Button'
import Card from '../../component/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../redux/action/counter.action'
import { getCategoryData } from '../../redux/slice/category.slice'
import { getProductData } from '../../redux/slice/product.slice'
import MasonryList from '@react-native-seoul/masonry-list';

export default function Product({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryData())
    dispatch(getProductData())
  }, [])
  const categorySel = useSelector(state => state.category);
  // console.log("selector dataaaaaaaaaaaaaaaa", categorySel);

  const productSel = useSelector(state => state.product)
  // console.log("selectorrrrrrrrrrrrrrr",productSel);

  const tempArr = [...productSel.product]

  const sortedArr = tempArr.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
    .slice(0, 5);
  console.log(sortedArr, "4444444444444444444444444444444444");

  const saleData = productSel.product.filter((v) => v.discount >= 30)
  console.log(saleData, "222222222222222222222222222222222");

  const handleCheck = () => {
    categorySel.category.map((v)=>{
      if(v.id == 'ppPlL2kXX5eBOTztFtzX'){
        navigation.navigate('ProductList',{categoryID:'ppPlL2kXX5eBOTztFtzX'})
      }
    })
  }

  const handleNew = () => {
    productSel.product.map((v)=>{
      navigation.navigate('ProductList',{pid:v.id})
    })
    
  }

  const handleSale = () => {
    productSel.product.map((v)=>{
      navigation.navigate('ProductList',{sid:v.id})
    })
  }
  return (

    <View style={style.containor}>
    
      <ScrollView
        scrollEventThrottle={16}
      >
        <Image
          style={{ position: 'relative', width: '100%' }}
          source={require('../../../assets/image/BigBanner.png')}
        />

        <View style={{ position: 'absolute', }}>
          <Text style={{ color: 'white', marginTop: 310, fontSize: 50 }}>Fashion</Text>
          <Text style={{ color: 'white', fontSize: 50 }}>Sale</Text>
          <Pressable
            style={{ backgroundColor: '#DB3022', padding: 10, borderRadius: 20, marginTop: 20 }}
            onPress={() => handleCheck()}>
            <Text style={{ color: 'white', textAlign: 'center', }}>Check</Text>
          </Pressable>
        </View>

        <View style={{ position: 'relative', marginTop: 12 }}>
          <Text style={style.text}>New</Text>
          <Text style={style.subhead}>You’ve never seen it before!</Text>
          <TouchableOpacity style={{position: 'absolute',}} onPress={()=>handleNew()}>
          <Text style={{  color: 'black', marginLeft: 300, marginTop: 35 }}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            sortedArr.map((v, i) => (
              <View key={i}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails',{id:v.id})}>
                  <Card
                    imgref={v.image}
                    title={v.title}
                    mainTitle={v.brand}
                    Dollar={v.price}
                    discount={'New'}
                    disColor='black'
                  />
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>


        {/* //--------------------------------------------------------------------------------------------- */}


        <View style={{ flex: 1, marginTop: 30 }}>
          <Text style={style.text}>Sale</Text>
          <Text style={style.subhead}>Super Summer Sale</Text>
          <TouchableOpacity style={{position: 'absolute',}} onPress={()=>handleSale()}>
          <Text style={{  color: 'black', marginLeft: 300, marginTop: 35 }}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            saleData.map((v, i) => (
              <View key={i}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails',{id:v.id})}>
                  <Card
                    imgref={v.image}
                    title={v.title}
                    mainTitle={v.brand}
                    Dollar={v.price}
                    discount={v.discount}
                    disColor='black'
                  />
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>

        {/* {
          <MasonryList 
          data={categorySel.category}
          keyExtractor={(item)  => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            
          <View style={style.deco3}>
            <Image
              style={style.imgBox3}
              source={{uri:item.image}}
            />
            <Text style={style.deco3txt}>{item.name}</Text>
          </View>
        </TouchableOpacity>}
          // refreshing={RefreshControl}
          onRefresh={() => refetch({first: ITEM_CNT})}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadNext(ITEM_CNT)}
          />
        } */}

        <View style={style.mainDiv}>
          {
            categorySel.category.map((v, i) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('Categories',{id:v.id})} style={style[`category${i % 3 + 1}`]}>
                  <Image
                    style={style.imagBox}
                    source={{ uri: v.image }}
                  />
                  <Text style={style[`deco${i % 3 + 1}`]}>{v.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>

        
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
  },
  image1: {
    width: 140,
    height: 180,
    borderRadius: 8,
    resizeMode: 'cover'
  },
  parentBox: {
    marginHorizontal: 16,
  },
  box: {
    width: 140,
    height: 180,
    marginTop: 24,
    borderRadius: 6,
    backgroundColor: '#DADADA',
    position: 'relative',

  },
  deatilBox: {
    marginTop: 10,
    color: 'black',
    width: 140,

  },
  title: {
    color: 'black',
    fontSize: 10
  },
  mainTitle: {
    color: 'black',
    fontSize: 16
  },
  Dollar: {
    color: 'black',
    fontSize: 14,
    color: '#DB3022'
  },
  deco1: {
    color: 'white', position: 'absolute', fontSize: 30, marginLeft: 110, textAlign: 'center', fontWeight: 'bold', width: 200,backgroundColor:"rgba(0,0,0,0.5)"
  },
  deco2: {
    color: 'white', position: 'absolute', fontSize: 30, textAlign: 'center', fontWeight: 'bold',left:60
  }, 
  deco3: {
    color: 'white', position: 'absolute', fontSize: 30, textAlign: 'center', fontWeight: 'bold',left:60
  },
  imagBox: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  category1: {
    width: '100%',
    height: 300,
  },
  category2: {
    width: '50%',
    height: 300,
  },
  category3: {
    width: '50%',
    height: 300,
  },
  mainDiv: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})