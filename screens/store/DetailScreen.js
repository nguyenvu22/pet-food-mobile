import { ActivityIndicator, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/styles';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAllProduct, getProductByIdFunction } from '../../services/product';
import { getAllMeal, getMealByIdFunction } from '../../services/meal';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/loading/LoadingScreen';

const DetailScreen = ({ route }) => {

    const [isLoading, setIsLoading] = useState(false);
    const type = route.params.itemType;
    const navigation = useNavigation()
    const [products, setProducts] = useState()
    const [meals, setMeals] = useState()


    const id = route.params.itemId;

    let selectItem;
    if (type === 'product') {
        selectItem = products?.find((item) => item.id === id)
    } else {
        selectItem = meals?.find((item) => item.id === id)
    }

    const accessToken = useSelector(
        (state) => state.userReducers.user.accessToken
    )

    const getProductById = async (idProduct, accessToken) => {
        try {
            const response = await getProductByIdFunction(idProduct, accessToken);
            if (response?.status === 'Success') {
                setProducts(response.data)
            } else {
                console.log('error in screen : ');
            }
        } catch (error) {
            console.log('error in screen : ', error);
        }
    }

    const getMealById = async (idMeal, accessToken) => {
        try {
            const response = await getMealByIdFunction(idMeal, accessToken);
            if (response?.status === 'Success') {
                setMeals(response.data)
            } else {
                console.log('error in screen : ');
            }
        } catch (error) {
            console.log('error in screen : ', error);
        }
    }

    const getAllProducts = async (accessToken) => {
        try {

            const response = await getAllProduct(accessToken);
            console.log('response', response.data)
            if (response?.status === 'Success') {
                setProducts(response.data);
                setIsLoading(false);
            } else {
                console.log('error in screen : ');
            }
        } catch (error) {
            console.log("error in screen : ", error);
        }
    }
    const getAllMeals = async (accessToken) => {
        try {

            const response = await getAllMeal(accessToken);
            if (response?.status === 'Success') {
                setMeals(response.data);
                setIsLoading(false);
            } else {
                console.log('error in screen : ');
            }
        } catch (error) {
            console.log("error in screen : ", error);
        }
    }

    const handlerAddToCart = () => {
        console.log('click');
    }

    const handlerLike = () => {
        console.log('click like');
    }

    useEffect(() => {
        setIsLoading(true);
        if (type === "product") {
            // getProductById(id, accessToken);
            getAllProducts(accessToken);
        } else {
            // getMealById(id, accessToken);
            getAllMeals(accessToken)
        }

    }, [accessToken])

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.pink100, paddingBottom: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.ImgBgContainer}>
                    <ImageBackground source={{ uri: selectItem?.image }} style={styles.image} >
                        <View style={styles.header}>
                            <View style={styles.headerBtn}>
                                <Ionicons name="chevron-back" size={22} color="black"
                                    onPress={navigation.goBack} />
                            </View>
                            <View style={styles.headerBtn}>
                                <Ionicons name="cart-outline" size={22} color="black" />
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.desTag}>
                        <Text style={styles.desTitle} ellipsizeMode='tail' numberOfLines={1}>{selectItem?.productName}</Text>
                    </View>
                </View>
                <View style={styles.desContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.desText}>
                            {selectItem?.expiredDate}
                        </Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>
                                {selectItem?.price}
                            </Text>
                            <Text style={styles.currencyUnit}>
                                VND
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.desText2}>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: Colors.dark }}>quantity : </Text>
                        {selectItem?.remainQuantity}
                    </Text>
                    <View style={styles.desDetailContainer}>
                        <Text style={styles.desDetailText}>
                            {selectItem?.description}
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.likeContainer}>
                            <Pressable
                                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                                android_ripple={{ color: '#cccccc' }}
                                onPress={handlerLike}>
                                <View style={styles.likeInnerContainer}>
                                    <Octicons name="feed-heart" size={27} color="black" />
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.addCartContainer}>
                            <Pressable
                                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                                android_ripple={{ color: '#cccccc' }}
                                onPress={handlerAddToCart}
                            >
                                <View style={styles.addCartInnerContainer}>
                                    <Text style={styles.addCartText}>
                                        Add To Cart
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    ImgBgContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        // justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        height: 350,
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 20,
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerBtn: {
        height: 35,
        width: 35,
        backgroundColor: Colors.white,
        borderRadius: 99999,
        justifyContent: 'center',
        alignItems: 'center'
    },
    desTag: {
        width: 200,
        backgroundColor: Colors.purple800,
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top: -20,
        elevation: 18,

        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: 'hidden',
    },
    desTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.pink100,
    },
    desContainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        borderRadius: 20,
        overflow: 'hidden',

        elevation: 8,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        marginBottom: 30,
    },
    desText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: '600',
        color: Colors.redPastel200
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: Colors.green,
        // height: 35,
        borderBottomLeftRadius: 20,
        // borderTopLeftRadius: 20,
        // left: 30

    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.yellow100,
        marginRight: 5
    },
    currencyUnit: {
        fontSize: 12,
        fontWeight: '400',
    },
    desText2: {
        paddingHorizontal: 20,
        color: 'gray',
        fontSize: 14,
    },
    desDetailContainer: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    desDetailText: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20
    },
    footer: {
        height: 70,
        backgroundColor: Colors.light,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,

    },
    likeContainer: {
        height: 50,
        width: 50,
        backgroundColor: Colors.white,
        // padding: 10,
        borderRadius: 99999,
        elevation: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    likeInnerContainer: {
        height: 50,
        width: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCartContainer: {
        height: 50,
        width: 240,
        backgroundColor: Colors.purple800,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 20,
        overflow: 'hidden'
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    addCartInnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 240,
        borderRadius: 20,
    },
    addCartText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: Colors.white
    }
})