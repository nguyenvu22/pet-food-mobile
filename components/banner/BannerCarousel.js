import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";

const BannerCarousel = () => {
  const carouselData = [
    {
      id: 1,
      image: require("../../assets/meme1.jpg"),
    },
    {
      id: 2,
      image: require("../../assets/meme2.jpg"),
    },
    {
      id: 3,
      image: require("../../assets/meme3.jpg"),
    },
    {
      id: 4,
      image: require("../../assets/meme4.jpg"),
    },
  ];

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.containerCarousel}>
        <Image
          source={item.image}
          style={styles.bannerImage}
          resizeMode="contain"
        />
        <View style={styles.carouselTextContainer}>
          <Text style={styles.carouselTextTitle}>Pet Sitter</Text>
          <Text style={styles.carouselTextTitle2}>Care Service</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carouselData}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
  },
  containerCarousel: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 325,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  bannerImage: {
    position: "absolute",
    borderRadius: 20,
    width: '100%'
  },
  carouselTextContainer: {
    backgroundColor: Colors.transparentDark,
    top: 43,
    maxWidth: 275,
    paddingHorizontal: 5,
    right: 85,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  carouselTextTitle: {
    padding: 5,
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.peach,
    lineHeight: 25,
    paddingLeft: 8,
  },
  carouselTextTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.browPastel100,
    lineHeight: 20,
    marginLeft: 40,
    paddingBottom: 7,
  },
});
