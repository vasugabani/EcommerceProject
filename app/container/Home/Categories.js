import { View, Text, ScrollView } from 'react-native'
import React from 'react'
// import {  } from 'react-native-gesture-handler'
import Button from '../../component/Button/Button'
import CategoryButton from '../../component/Button/CategoryButton'

export default function Categories({navigation}) {
  return (
    <View>
      <ScrollView>
        <Button 
          title='VIEW ALL ITEMS'
          onPress={() => console.log('Pressed')}
        />

        <Text style={{marginTop:10,marginHorizontal:20, marginBottom:20}}>choose category</Text>

        <CategoryButton 
          title='Tops'
          onPress={()=>navigation.navigate('ProductList')}
        />
        <CategoryButton 
          title='Shirts & Blouses'
          onPress={()=>console.log('shirt & blouses')}
        />
        <CategoryButton 
          title='Cardigans & Sweaters'
          onPress={()=>console.log('Cardigans & Sweaters')}
        />
        <CategoryButton 
          title='Knitwear'
          onPress={()=>console.log('Knitwear')}
        />
        <CategoryButton 
          title='Blazers'
          onPress={()=>console.log('Blazers')}
        />
        <CategoryButton 
          title='Outerwear'
          onPress={()=>console.log('Outerwear')}
        />
        <CategoryButton 
          title='Pants'
          onPress={()=>console.log('Pants')}
        />
        <CategoryButton 
          title='Jeans'
          onPress={()=>console.log('Jeans')}
        />
        <CategoryButton 
          title='Shorts'
          onPress={()=>console.log('Shorts')}
        />
        <CategoryButton 
          title='Skirts'
          onPress={()=>console.log('Skirts')}
        />
        <CategoryButton 
          title='Dresses'
          onPress={()=>console.log('Dresses')}
        />
      </ScrollView>
    </View>
  )
}