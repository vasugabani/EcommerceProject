import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReview } from '../../redux/slice/review.slice'
import { getUserProfile, getUsers } from '../../redux/slice/auth.slice'
import { verticalScale } from '../../constant/Metrices'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function MyReview() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getReview())
        dispatch(getUserProfile(authData.user.uid))
    }, [])

    const authData = useSelector(state => state.auth)
    // console.log("qaaaaaaaaaaaaaaaaaaaa",authData);

    const review = useSelector(state => state.review)

    const productData = useSelector(state => state.product)
    console.log(productData.product, "ppppppppppppppppppppppppp");


    const fData = review.review.filter((f) => f.Userid === authData.user.uid)
    console.log(fData, "fffffffffffffffffffff");


    return (
        <ScrollView>
            {
                fData.map((v) => {

                    const filterData = productData.product.filter((f) => f.id === v.Productid)
                    console.log(filterData, " fffffffffff1111111111111111");

                    return filterData.map((v1, index) => {
                        return (
                            <View key={index} style={styles.container}>
                                <View>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: v1.image }}
                                    />
                                </View>
                                <View style={{ marginHorizontal: 5, }}>

                                    <View style={{ flexDirection: 'row',marginTop: 35 }}>
                                        <Text style={{ color: 'black', marginLeft: 15, fontSize: 16 }}>Product :</Text>
                                        <Text style={styles.title}>{v1.title}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row',marginTop: 5 }}>
                                        <Text style={{ color: 'black', marginLeft: 15, fontSize: 16 }}>Review :</Text>
                                        <Text style={styles.reviews}>{v.Reviews}</Text>

                                    </View>

                                    <View style={{ flexDirection: 'row',marginTop: 5 }}>
                                        <Text style={{ color: 'black', marginLeft: 15, fontSize: 16 }}>Rating :</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            
                                            <View style={{ flexDirection: 'row', marginTop: verticalScale(3) }}>
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

                                </View>
                            </View>
                        )
                    })


                })
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop:10,
        marginBottom: 10,
        width: 400,
        flexDirection: 'row',
        marginHorizontal: 16,
        backgroundColor: 'white',
    },
    image: {
        width: 160,
        height: 150,
        resizeMode: 'cover',

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
        marginleft: 5,
    },
    reviews: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        // flexDirection: 'row'

    },
});