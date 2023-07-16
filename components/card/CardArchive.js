import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const CardArchive = ({ data }) => {
  const navigation = useNavigation();
  const SelectItem = () => {
    navigation.navigate("Detail", {
      data: data,
    });
  };

  return (
    <Pressable
      onPress={SelectItem}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      android_ripple={{ color: "#cccccc" }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: `${data.image}` }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{data.title}</Text>
          <Text style={styles.textDes}>{data.description}</Text>
          <View style={styles.starContainer}>
            <AntDesign name="star" size={16} color={Colors.yellow100} />
            <AntDesign name="star" size={16} color={Colors.yellow100} />
            <AntDesign name="star" size={16} color={Colors.yellow100} />
            <AntDesign name="star" size={16} color={Colors.yellow100} />
            <AntDesign name="star" size={16} color={Colors.yellow100} />
            <Text style={styles.textStart}>( 5 )</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardArchive;

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  itemContainer: {
    flexDirection: "row",

    backgroundColor: Colors.white,
    paddingVertical: 20,
    borderWidth: 1,
    borderBottomColor: "#cdcdcd",
    borderTopColor: Colors.white,
    borderLeftColor: Colors.white,
    borderRightColor: Colors.white,
    overflow: "hidden",
  },
  innerContainer: {},
  imageContainer: {
    height: 86,
    width: 86,
    borderWidth: 1,
    marginLeft: 20,
    borderColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
  textContainer: {
    height: 86,
    width: "100%",
    marginLeft: 10,
  },
  textName: {
    fontSize: 17,
    fontWeight: "600",
  },
  textDes: {
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 15,
    color: "gray",
    marginTop: 5,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 12,
  },
  textStart: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 2,
  },
});
