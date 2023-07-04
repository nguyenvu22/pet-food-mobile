import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import img from '../../assets/care.png'
import { Colors } from '../../constants/styles'


const CardCategory = ({ color, title, onPress, image }) => {
    return (
        <View style={styles.categoryContainer}>
            <Pressable
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                android_ripple={{ color: '#cccccc' }}
                onPress={onPress}>

                <View style={[styles.innerContainer, { backgroundColor: color }]}>
                    <View style={{
                        height: 50,
                        width: 60,
                        marginTop: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={image} style={styles.ImgCategory} />
                    </View>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            </Pressable>

        </View>
    )
}

export default CardCategory

const styles = StyleSheet.create({
    categoryContainer: {
        marginHorizontal: 10,
        height: 74,
        width: 74,
        marginRight: 8,
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        elevation: 8,//android
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: 'hidden',

    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 13,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // gap: 4
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#545151',
        marginBottom: 3
    }
})