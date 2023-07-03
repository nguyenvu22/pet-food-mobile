import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

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
    container: {
        height: 180,
    },
    bannerImage: {
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