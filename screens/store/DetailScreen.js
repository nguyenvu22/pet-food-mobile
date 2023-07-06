import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/styles';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
    const navigation = useNavigation()

    const popularData = [
        {
            id: 1,
            image: require('../../assets/meme1.jpg'),
            title: 'mèo ngu',
            specificWeight: "1kg",
            brand: 'Trung Quốc ',
            price: '23.3'
        },
        {
            id: 2,
            image: require('../../assets/meme2.jpg'),
            title: 'mèo thông minh',
            specificWeight: "2kg",
            brand: 'Việt Nam ',
            price: '103.3'
        },
        {
            id: 3,
            image: require('../../assets/meme3.jpg'),
            title: 'mèo đần',
            specificWeight: "3kg",
            brand: 'Việt Nam ',
            price: '103.3'
        },
        {
            id: 4,
            image: require('../../assets/meme4.jpg'),
            title: 'mèo đần',
            specificWeight: "4kg",
            brand: 'lào ',
            price: '13.3'
        },
    ]

    const idMeal = route.params.mealId;
    const selectMeal = popularData.find((item) => item.id === idMeal)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.pink100, paddingBottom: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.ImgBgContainer}>
                    <ImageBackground source={selectMeal.image} style={styles.image} >
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
                        <Text style={styles.desTitle} ellipsizeMode='tail' numberOfLines={1}>{selectMeal.title}</Text>
                    </View>
                </View>
                <View style={styles.desContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.desText}>
                            {selectMeal.brand}
                        </Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>
                                {selectMeal.price}
                            </Text>
                            <Text style={styles.currencyUnit}>
                                VND
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.desText2}>{selectMeal.specificWeight}</Text>
                    <View style={styles.desDetailContainer}>
                        <Text style={styles.desDetailText}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptate architecto dolorum similique doloremque ratione saepe amet velit ipsum, incidunt corrupti enim quas quos voluptatem animi tempore, fugiat esse quidem!
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.likeContainer}>
                            <Octicons name="feed-heart" size={27} color="black" />
                        </View>
                        <View style={styles.addCartContainer}>
                            <Pressable
                                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                                android_ripple={{ color: '#cccccc' }}
                            // onPress={onPress}
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
        color: Colors.yellow,
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
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 99999,
        elevation: 8,
        overflow: 'hidden'
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