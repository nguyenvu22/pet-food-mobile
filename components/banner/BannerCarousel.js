import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/styles'
const BannerCarousel = () => {
    const carouselData = [
        {
            id: 1,
            image: require('../../assets/meme1.jpg')
        },
        {
            id: 2,
            image: require('../../assets/meme2.jpg')
        },
        {
            id: 3,
            image: require('../../assets/meme3.jpg')
        },
        {
            id: 4,
            image: require('../../assets/meme4.jpg')
        },
    ]

    const renderCarouselItem = ({ item }) => {
        return (
            <View style={styles.containerCarousel} >
                <Image source={item.image} style={styles.bannerImage} />
                <View style={styles.carouselTextContainer}>
                    <Text style={styles.carouselTextTitle}>Pet Sitter</Text>
                    <Text style={styles.carouselTextTitle2}>Care Service</Text>
                    {/* <Text style={styles.carouselTextDes}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci ipsum  </Text> */}
                </View>
            </View>
        )
    }
    return (
        <View
            style={styles.container}>
            <View style={{
                height: 180,

            }}>
                <FlatList data={carouselData}
                    renderItem={renderCarouselItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false} />
            </View>
        </View>
    )
}

export default BannerCarousel

const styles = StyleSheet.create({
    carouselTextContainer: {
        backgroundColor: Colors.transparentDark,
        top: 43,
        maxWidth: 275,
        // marginRight: 80,
        paddingHorizontal: 5,
        // borderRadius: 8,
        right: 85,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 40,
        overflow: 'hidden'
    },
    carouselTextTitle: {
        padding: 5,

        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.peach,
        lineHeight: 25,
        paddingLeft: 8
    },
    carouselTextTitle2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.browPastel100,
        lineHeight: 20,
        marginLeft: 40,
        paddingBottom: 7,
    },
    carouselTextDes: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.light,
        textAlign: 'right',
    },
    container: {
        height: 180,
    },
    bannerImage: {
        position: 'absolute',
        height: 150,
        // width: 343,
        width: 325,
        borderRadius: 20,
        resizeMode: 'cover',

    },
    containerCarousel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 325,
        // backgroundColor: 'red',
        marginHorizontal: 10,
        borderRadius: 20,

        elevation: 14,
        // shadown dung cho ios
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: 'hidden',
    },

})