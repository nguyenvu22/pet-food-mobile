import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";

const CardShipping = ({image, name}) => {
  return (
    <View style={styles.oderCardContainer}>
      <View style={styles.oderCardInner}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.desContainer}>
          <Text style={styles.nameText}>Name</Text>
          <View style={styles.priceContainer}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                color: Colors.purple800,
              }}
            >
              $
            </Text>
            <Text style={styles.priceText}>Price</Text>
          </View>
          <Text style={styles.addressText}>Address</Text>
        </View>
      </View>
    </View>
  );
};

export default CardShipping;

const styles = StyleSheet.create({
  oderCardContainer: {
    backgroundColor: Colors.light,
    height: 120,
    borderRadius: 8,
  },
  oderCardInner: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  imageContainer: {
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "center",
    height: "100%",
    width: "100%",
  },
  desContainer: {
    marginLeft: 10,
  },
  nameText: {
    marginBottom: 2,
    fontSize: 17,
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.purple800,
    marginLeft: 3,
  },
  addressText: {
    marginTop: 13,
    fontSize: 13,
    fontWeight: "500",
    color: "gray",
  },
});
