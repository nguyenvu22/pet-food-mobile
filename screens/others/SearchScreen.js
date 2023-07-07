import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from '../../constants/styles'
import { useSelector } from "react-redux";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([])

  const handSearch = (query) => {
    setSearchQuery(query);
  }

  // const getAllMeals = async () => {
  //   try {
  //     const response = await getAllMealsFunction();
  //     console.log('response in screen : ', response)

  //   } catch (error) {

  //   }
  // }

  // const userAccessToken = useSelector(
  //   (state) => state.userReducers.user.accessToken
  // )


  // const getAllProducts = async (userAccessToken) => {
  //   console.log('userAccessToken in secreen : ', userAccessToken)
  //   try {
  //     console.log('a: ')
  //     const response = await getAllProductsFunction(userAccessToken);
  //     console.log('response in screen : ', response)
  //     setFullData(response)
  //   } catch (error) {
  //   }
  // }

  // useEffect(() => {
  //   // getAllMeals();
  //   getAllProducts(userAccessToken);
  // }, [userAccessToken])

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingVertical: 20,
      backgroundColor: Colors.pink100,

    }}>
      <View style={styles.container}>

        <TextInput
          placeholder="Search "
          style={styles.searchBox}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handSearch(query)}
        />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#99969661',
    borderWidth: 1,
    borderRadius: 8
  }
});
