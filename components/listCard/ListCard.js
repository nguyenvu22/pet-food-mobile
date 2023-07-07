import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../card/Card";
import { Colors } from "../../constants/styles";

const popularData = [
  {
    id: 1,
    image: require("../../assets/meme1.jpg"),
    title: "mèo ngu",
    specificWeight: "1kg",
    brand: "Trung Quốc ",
    price: "23.3",
  },
  {
    id: 2,
    image: require("../../assets/meme2.jpg"),
    title: "mèo thông minh",
    specificWeight: "2kg",
    brand: "Việt Nam ",
    price: "103.3",
  },
  {
    id: 3,
    image: require("../../assets/meme3.jpg"),
    title: "mèo đần",
    specificWeight: "3kg",
    brand: "Việt Nam ",
    price: "103.3",
  },
  {
    id: 4,
    image: require("../../assets/meme4.jpg"),
    title: "mèo đần",
    specificWeight: "4kg",
    brand: "lào ",
    price: "13.3",
  },
];

const ListCard = ({ title }) => {
  const renderItem = (itemData) => {
    function pressHandler() {
      console.log("click");
    }
    return (
      <Card
        id={itemData.item.id}
        brand={itemData.item.brand}
        image={itemData.item.image}
        price={itemData.item.price}
        title={itemData.item.title}
        specificWeight={itemData.item.specificWeight}
        onPress={pressHandler}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.moreText}>See all </Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={popularData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        />
      </View>
    </View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    // backgroundColor: 'red'
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 20,
    marginRight: 25,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
  },
  moreText: {
    color: "green",
  },
  list: {
    paddingLeft: 1,
    marginHorizontal: 5,
  },
});
