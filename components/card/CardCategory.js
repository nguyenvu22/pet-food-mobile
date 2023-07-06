import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";

const CardCategory = ({ color, title, onPress, image }) => {
  return (
    <View style={styles.categoryContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#cccccc" }}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <View
            style={{
              height: 50,
              width: 60,
              marginTop: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={image} style={styles.ImgCategory} />
          </View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CardCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    height: 75,
    width: 75,
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#545151",
  },
});
