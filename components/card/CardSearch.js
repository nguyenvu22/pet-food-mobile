import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/styles';

const CardSearch = ({ image, productName, expiredDate, price, id, type }) => {

    const navigation = useNavigation();
    const SelectItem = () => {
        navigation.navigate('Detail', {
            itemId: id,
            itemType: type
        })
    }


    return (
        <Pressable
            onPress={SelectItem}
            style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#cccccc" }}>
            <View style={styles.itemContainer}>

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textName}>{productName}</Text>
                    <Text style={styles.textPriedDate}>{expiredDate}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.textPrice}>{price}</Text>
                        <Text style={{ fontSize: 10, fontWeight: '400' }}>VND</Text>
                    </View>
                </View>

            </View>
        </Pressable>
    )
}

export default CardSearch

const styles = StyleSheet.create({
    button: {
        flex: 1,
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 5,
        // backgroundColor: 'red'
    },
    buttonPressed: {
        opacity: 0.5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: Colors.white,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cdcdcd'
    },
    innerContainer: {
    },
    imageContainer: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        marginLeft: 20,
        borderColor: Colors.grey,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.light,
    },
    image: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
        borderRadius: 50,
    },
    textContainer: {
        marginLeft: 10,
    },
    textName: {
        fontSize: 15,
        fontWeight: '600',
    },
    textPriedDate: {
        fontSize: 10,
        fontWeight: '400',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textPrice: {
        fontSize: 12,
        fontWeight: '500',
        marginRight: 2
    }
})