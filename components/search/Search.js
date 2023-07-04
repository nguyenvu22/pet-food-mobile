import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/styles';


const Search = () => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchInnerContainer}>
                <Ionicons name="search" size={24} color="black"
                    style={styles.iconSearch} />
                <TextInput placeholder='Search Store ' style={styles.textInputSearch} />
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 30,
        flexDirection: 'row',
    },
    searchInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.light,
        borderRadius: 13,
        alignItems: 'center',
    },
    iconSearch: {
        marginLeft: 20,
    },
    textInputSearch: {
        paddingLeft: 5,
        fontSize: 14,
        color: Colors.dark,
        flex: 1,
        fontWeight: '500'
    },
})