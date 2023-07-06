import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/styles';


const Search = () => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchInnerContainer}>
                <Ionicons name="search" size={18} color="black"
                    style={styles.iconSearch} />
                <TextInput placeholder='Search Store ' style={styles.textInputSearch} />
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
        position: 'relative',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingTop: 2
    },
    searchInnerContainer: {
        flexDirection: 'row',
        height: 30,
        backgroundColor: Colors.light,
        borderRadius: 8,
        alignItems: 'center',
        width: 320,
    },
    iconSearch: {
        marginLeft: 20,
    },
    textInputSearch: {
        paddingLeft: 5,
        fontSize: 14,
        color: Colors.dark,
        flex: 1,
        fontWeight: '500',

    },
})