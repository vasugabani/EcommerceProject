import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
// import {  } from 'react-native-gesture-handler'
import Button from '../../component/Button/Button'
import CategoryButton from '../../component/Button/CategoryButton'
import { useDispatch, useSelector } from 'react-redux'
// import { getCategoryData } from '../../redux/slice/category.slice'
import { getSubCatData } from '../../redux/slice/subCategory.slice'
import { getProductData } from '../../redux/slice/product.slice'
import { useRoute } from '@react-navigation/native'

export default function Categories({ navigation }) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubCatData())
    
  }, [])

  const route = useRoute()
  const id = route.params?.id
  console.log(id);

  const subCatSel = useSelector(state => state.subCategory)
  console.log("selector dataaaaaaaaaaa", subCatSel);

  const subCatFilData = subCatSel.subCatData.filter((v)=>v.category == id)
  console.log(subCatFilData,"00000000000000000000000000");

  return (
    <View>
      <ScrollView>
        <Button
          title='VIEW ALL ITEMS'
          onPress={() => console.log('Pressed')}
        />

        <Text style={{ marginTop: 10, marginHorizontal: 20, marginBottom: 20 }}>choose category</Text>

        {
          subCatFilData.map((v) => {
            console.log("vvvvvvvvvvvvvvvvvvvvvvvv0", v);
            return (
              <CategoryButton
                title={v.subCatName}
                onPress={() => navigation.navigate('ProductList',{id:v.id, category_id: id})}
              />
            )
          })
        }
        
      </ScrollView>
    </View>
  )
}