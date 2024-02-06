
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShoppingButton from '../../component/Button/ShoppingButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCard from '../../component/Product/ProductCard';
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from '../../redux/slice/product.slice';
import { useRoute } from '@react-navigation/native';
import { getSubCatData } from '../../redux/slice/subCategory.slice';
import { getCategoryData } from '../../redux/slice/category.slice';

export default function ProductList({ navigation }) {
  const [sort, setSort] = useState('');
  const [data, setData] = useState([])
  const [modal, setmodel] = useState(false)
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('')
  console.log(category,"111111111111111111111111111111111111111111");
  // console.log(search);
  // let arr = [];

  const route = useRoute()
  const id = route.params?.id
  // console.log(id);

  const category_id = route.params?.category_id
  // console.log(category_id);
  

  const handlepress = () => {
    setmodel(true)
  }
  const handlecross = () => {
    setmodel(false)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    // GetData();
    dispatch(getProductData())
    dispatch(getSubCatData())
    dispatch(getCategoryData())
  }, [])

  const categoryData = useSelector(state => state.category)

  const subCatData = useSelector(state => state.subCategory)

  const productSel = useSelector(state => state.product)

  const searchSortData = () => {
    let fData;

    console.log(category,"cccccccccccccccccccccccccccccc");

    if(category){
      fData = productSel.product.filter((v)=>v.subCategory == category)
    }else if(category == ''){
      fData = fData
    }else {
      fData = productSel.product.filter((v) => v.subCategory == id)
    }

    console.log(fData,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    

    fData = fData.filter((v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase()) ||
      v.price.toString().includes(search.toLowerCase())
    );

    fData = fData.sort((a, b) => {
      if (sort === 'lh') {
        return a.price - b.price
      } else if (sort === 'hl') {
        return b.price - a.price
      } else if (sort === 'az') {
        return a.title.localeCompare(b.title)
      } else if (sort === 'za') {
        return b.title.localeCompare(a.title)
      }
    });

    return fData;
  }

  const finalData = searchSortData();


  // const a = subCatData.subCatData.filter((v) => v.category === id);
  // console.log("aaaaaaaaaaaa", a, id, subCatData.subCatData);

  return (
    <View>
      <ScrollView>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', }}>

            
            <ShoppingButton
              // key={i}
              title='All'
              onPress={() => setCategory('')}
            />


            {
              subCatData.subCatData.filter((v) => v.category === category_id).map((val, i) => {
                return (
                  <ShoppingButton
                    key={i}
                    title={val.subCatName}
                    onPress={() => setCategory(val.id)}
                  />
                )

              })
            }

          </View>
        </ScrollView>

        <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 16, justifyContent: 'space-between' }}>

          <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => navigation.navigate('Filter')}>
            <MaterialCommunityIcons name='filter-variant' color={'black'} size={25} />
            <Text style={{ marginLeft: 8, color: 'black' }}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => handlepress()}>
            <MaterialCommunityIcons name='swap-vertical' color={'black'} size={25} />
            <Text style={{ marginLeft: 8, color: 'black' }}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name='view-list' color={'black'} size={25} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={style.searchInput}
          placeholder='Search...'
          onChangeText={setSearch}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
        >
          <View style={{ width: '100%', marginTop: verticalScale(410), backgroundColor: 'white', }}>
            <TouchableOpacity onPress={handlecross} style={{ marginLeft: horizontalScale(150) }}>
              <MaterialCommunityIcons name='minus-thick' size={50} color={'black'} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setSort('popular'), setmodel(false) }} style={style.sortPress}>
              <Text style={style.sortText}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSort('az'), setmodel(false) }} style={style.sortPress}>
              <Text style={style.sortText}>A to Z</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSort('za'), setmodel(false) }} style={style.sortPress}>
              <Text style={style.sortText}>Z to A</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSort('lh'), setmodel(false) }} style={style.sortPress}>
              <Text style={style.sortText}>Price:low to high</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSort('hl'), setmodel(false) }} style={style.sortPress}>
              <Text style={style.sortText}>Price:high to low</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={{ flexDirection: 'row', marginHorizontal: 16, justifyContent: 'space-between', marginTop: 6, flex: 1, flexWrap: 'wrap', }}>

          {
            finalData.map((v) => {
              // console.log("vvvvvvvvvvvvvvvvvvvvv", v);
              return (
                <ProductCard
                  key={v.id}
                  image={v.image}
                  subTitle={v.description}
                  title={v.title}
                  price={v.price}
                  onPress={() => navigation.navigate('ProductDetails', { id: v.id })}
                />
              )

            })
          }

          {/* {
            finalData.map((v, i) => (
              <ProductCard
                key={v.id}
                image={v.images[0]}
                subTitle={v.description}
                title={v.title}
                price={v.price}
                onPress={() => navigation.navigate('ProductDetails',{id:v.id})}
              />
            ))
          } */}

        </View>

      </ScrollView>
    </View>
  )
}
const style = StyleSheet.create({
  sortPress: {
    width: '100%', height: verticalScale(55)
  },
  sortText: {
    fontSize: moderateScale(18), fontWeight: 'bold', marginTop: verticalScale(14), marginLeft: horizontalScale(20), color: 'black'
  },
  searchInput: {
    marginHorizontal: horizontalScale(16), marginTop: verticalScale(10)
  }
})