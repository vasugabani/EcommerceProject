import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import ShoppingButton from '../../component/Button/ShoppingButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCard from '../../component/Product/ProductCard';
import { horizontalScale, moderateScale, verticalScale } from '../../constant/Metrices';


export default function ProductList({ navigation }) {

  const [modal, setmodel] = useState(false)

  const handlepress = () => {
    setmodel(true)
  }
  const handlecross = () => {
    setmodel(false)
  }

  return (
    <View>
      <ScrollView>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', }}>
            <ShoppingButton
              title='T-Shirts'
              onPress={() => console.log("t shirts")}
            />
            <ShoppingButton
              title='Crop tops'
              onPress={() => console.log("Crop tops")}
            />
            <ShoppingButton
              title='Blouses'
              onPress={() => console.log("Blouses")}
            />
            <ShoppingButton
              title='Skirts'
              onPress={() => console.log("Skirts")}
            />
            <ShoppingButton
              title='Dresses'
              onPress={() => console.log("Dresses")}
            />
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
        >
          <View style={{ width: '100%', marginTop: verticalScale(410), backgroundColor: 'white', }}>
            <TouchableOpacity onPress={handlecross} style={{marginLeft:horizontalScale(150)}}>
              <MaterialCommunityIcons name='minus-thick' size={50} color={'black'} />
            </TouchableOpacity>

            <TouchableOpacity style={{ width: '100%', height: verticalScale(55) }}>
              <Text style={{ fontSize: moderateScale(18),fontWeight:'bold', marginTop: verticalScale(14), marginLeft: horizontalScale(20), color: 'black' }}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', height: verticalScale(55) }}>
              <Text style={{ fontSize: moderateScale(18),fontWeight:'bold', marginTop: verticalScale(14), marginLeft: horizontalScale(20), color: 'black' }}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', height: verticalScale(55) }}>
              <Text style={{ fontSize: moderateScale(18),fontWeight:'bold', marginTop: verticalScale(14), marginLeft: horizontalScale(20), color: 'black' }}>Custom Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', height: verticalScale(55) }}>
              <Text style={{ fontSize: moderateScale(18),fontWeight:'bold', marginTop: verticalScale(14), marginLeft: horizontalScale(20), color: 'black' }}>Price:low to high</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', height: verticalScale(55) }}>
              <Text style={{ fontSize: moderateScale(18),fontWeight:'bold', marginTop: verticalScale(14), marginLeft: horizontalScale(20), color: 'black' }}>Price:high to low</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={{ flexDirection: 'row', marginHorizontal: 16, justifyContent: 'space-between', marginTop: 6, flex: 1, flexWrap: 'wrap', }}>
          <ProductCard
            image={require('../../../assets/image/Image.png')}
            subTitle='Mango'
            title='T-Shirt SPANISH'
            price='9$'
            onPress={()=>navigation.navigate('ProductDetails')}
          />
          <ProductCard
            image={require('../../../assets/image/photo2.png')}
            subTitle='Dorothy perkins'
            title='Blouse'
            price='9$'
            color='red'
            discount='20%'
          />
          <ProductCard
            image={require('../../../assets/image/Image.png')}
            subTitle='Mango'
            title='Shirt'
            price='9$'
          />
          <ProductCard
            image={require('../../../assets/image/photo2.png')}
            subTitle='Dorothy perkins'
            title='Light Blouse'
            price='9$'
            color='red'
            discount='30%'
          />
        </View>

      </ScrollView>
    </View>
  )
}