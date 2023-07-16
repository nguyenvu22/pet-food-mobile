import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import image1 from "../../assets/meme1.jpg";

const CardShipping = ({ item }) => {
  console.log("CardShipping");
  console.log(item);
  console.log(item.orderDetails[0]);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "white",
            shadowColor: "black",
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: { width: 0 },
            marginLeft: 10,
          }}
        >
          <Image
            source={require("../../assets/images/delivery.png")}
            resizeMode="cover"
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
};

export default CardShipping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
