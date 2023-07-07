import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from '../../constants/styles'
import { useSelector } from "react-redux";
import { getAllProduct } from "../../services/product";
import { getAllMeal } from "../../services/meal";
import filter from "lodash.filter";
import { Ionicons } from "@expo/vector-icons";

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
      return contains(item.productName, formattedQuery)
    });
    setDataProducts(filteredData);

    const filteredMeals = fullData.filter((item) => {
      return contains(item.mealName, formattedQuery);
    });
    setDataMeals(filteredMeals);
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
        setFullData(response.data)
      } else {
        console.log('error in screen : ');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error in screen : ", error);
    }
  }


  const getAllMeals = async (accessToken) => {
    try {
      const response = await getAllMeal(accessToken);
      if (response?.status === 'Success') {
        setDataMeals(response.data)
      } else {
        console.log('error in screen : ');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error in screen : ", error);
    }
  }

  useEffect(() => {
    getAllMeals(accessToken)
    setIsLoading(true);
    getAllProducts(accessToken);
  }, [accessToken])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} color={Colors.brown700} />
      </View>
    )
  }
  const RenderItemProduct = (itemData) => {
    return (
      <View>
        <Pressable style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
          android_ripple={{ color: "#cccccc" }}>
          <View style={styles.itemContainer}>
            {/* <View style={styles.innerContainer}> */}
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: itemData.item.image }} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{itemData.item.productName}</Text>
              <Text style={styles.textPriedDate}>{itemData.item.expiredDate}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.textPrice}>{itemData.item.price}</Text>
                <Text style={{ fontSize: 10, fontWeight: '400' }}>VND</Text>
              </View>
            </View>
            {/* </View> */}
          </View>
        </Pressable>
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
              key={(item) => item.id.toString()}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 10, marginLeft: 10, }}>Meals</Text>
            <FlatList
              scrollEnabled={false}
              data={dataMeals}
              renderItem={RenderItemProduct}
              key={(item) => item.id}
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
    borderWidth: 1
  },
  innerContainer: {

  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 50
  },
  image: {
    width: '100%',
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
});
