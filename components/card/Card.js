import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get("screen").width;
const Card = ({ id, image, remainQuantity, expiredDate, price, productName }) => {

  const navigation = useNavigation();

  const SelectMeal = () => {
    navigation.navigate('Detail', {
      mealId: id
    })
  }

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "#ccccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={SelectMeal}
      >
        <View
          style={{
            overflow: "hidden",
            height: 235,
          }}
        >
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri: image }} />
          </View>
          <View style={styles.title}>
            <Text style={styles.name} numberOfLines={1}>
              {productName}
            </Text>
            <View style={styles.desContainer}>
              <Text style={styles.descriptionText}>{expiredDate} ,</Text>
              <Text style={styles.descriptionText}>{remainQuantity}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{price}</Text>
              <Text style={styles.vnd}>VND</Text>
            </View>
            <View style={styles.iconAdd}>
              <Entypo name="plus" size={24} color="black" />
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    //   height: 235,
    width: width / 2 - 30,
    // marginVertical: 10,
    backgroundColor: "white",
    // marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.75,
    borderRadius: 10,
  },
  imgContainer: {
    height: 110,
    width: 155,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
    marginHorizontal: 6,
    marginVertical: 6,
    borderRadius: 8,
  },
  img: {
    resizeMode: "cover",
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  title: {
    marginTop: 2,
    marginBottom: 18,
    marginHorizontal: 8,
    padding: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
  desContainer: {
    flexDirection: "row",
  },
  descriptionText: {
    color: "gray",
    fontSize: 10,
    fontWeight: 500,
    paddingRight: 3,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 3,
  },
  vnd: {
    paddingTop: 3,
    fontSize: 11,
    color: "gray",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconAdd: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,

    elevation: 12,
    borderRadius: 8,
    // shadown dung cho ios
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
  },
});
