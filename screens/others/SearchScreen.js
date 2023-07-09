import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from '../../constants/styles'
import { useSelector } from "react-redux";
import { getAllProduct } from "../../services/product";
import { getAllMeal } from "../../services/meal";
import filter from "lodash.filter";
import { Ionicons } from "@expo/vector-icons";
import CardSearch from "../../components/card/CardSearch";
import LoadingScreen from "../../components/loading/LoadingScreen";

export default function SearchScreen() {

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [dataProducts, setDataProducts] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [fullData, setFullData] = useState([]);

  const handSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();

    const filteredData = filter(fullData, (item) => {
      return contains(item.productName, formattedQuery) || contains(item.mealName, formattedQuery);
    });
    setDataProducts(filteredData.filter((item) => item.productName));
    setDataMeals(filteredData.filter((item) => item.mealName));
  };


  const contains = (item, query) => {
    return item && item.toLowerCase().includes(query);
  };

  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  )

  const getAllProducts = async (accessToken) => {
    try {
      const response = await getAllProduct(accessToken);
      if (response?.status === 'Success') {
        setDataProducts(response.data);
        setFullData((prevData) => [...prevData, ...response.data]);
        setIsLoading(false);
      } else {
        console.log('error in screen : ');
        // setIsLoading(false);
      }
    } catch (error) {
      // setIsLoading(false);
      console.log("error in screen : ", error);
    }
  }

  const getAllMeals = async (accessToken) => {
    try {
      const response = await getAllMeal(accessToken);
      if (response?.status === 'Success') {
        setDataMeals(response.data)
        setFullData((prevData) => [...prevData, ...response.data]);
        setIsLoading(false);
      } else {
        console.log('error in screen : ');
      }
    } catch (error) {
      // setIsLoading(false);
      console.log("error in screen : ", error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await getAllMeals(accessToken)
      await getAllProducts(accessToken);
    }

    fetchData()
  }, [accessToken])

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  const RenderItemProduct = (itemData) => {
    return (
      <View>
        <CardSearch
          image={itemData.item.image}
          productName={itemData.item.productName}
          expiredDate={itemData.item.expiredDate}
          id={itemData.item.id}
          price={itemData.item.price}
          type='product'
        />
      </View>

    )
  }

  const RenderItemMeal = (itemData) => {
    return (
      <View>
        <CardSearch
          image={itemData.item.image}
          productName={itemData.item.mealName}
          expiredDate={itemData.item.expiredDate}
          id={itemData.item.id}
          price={itemData.item.price}
          type='meal'
        />
      </View>

    )
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingVertical: 20,
      backgroundColor: Colors.pink100,

    }}>
      <ScrollView
      >
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInnerContainer}>
              <Ionicons
                name="search"
                size={18}
                color={Colors.transparentDark}
                style={styles.iconSearch}
              />
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
          </View>
          <View style={styles.productContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 10, marginLeft: 10, }}>Products</Text>
            <FlatList
              scrollEnabled={false}
              data={dataProducts}
              renderItem={RenderItemProduct}
              key={(item) => item.productName}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 10, marginLeft: 10, }}>Meals</Text>
            <FlatList
              scrollEnabled={false}
              data={dataMeals}
              renderItem={RenderItemMeal}
              key={(item) => item.mealName}
            />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  productContainer: {
    marginBottom: 30,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 30,
    marginTop: 10,

    elevation: 20,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,

  },
  searchInnerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.light,
    alignItems: "center",
    width: '100%'
  },
  searchBox: {
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconSearch: {
    marginLeft: 20,
  },
})
