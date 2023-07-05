import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import BannerCarousel from "../../components/banner/BannerCarousel";
import ListCard from "../../components/listCard/ListCard";
import ListCardCategory from "../../components/listCard/ListCardCategory";
import BannerSale from "../../components/banner/BannerSale";
import HeaderHome from "../../components/header/HeaderHome";

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Colors.pink100,
        paddingBottom: 10,
      }}>
        <HeaderHome />
        <View style={styles.container}>
          <View style={styles.banner}>
            <BannerCarousel />
          </View>
          <View style={styles.listCard}>
            <ListCardCategory />
          </View>

          <View style={styles.listCard}>
            <ListCard title='Popular Food' />
          </View>

          <View style={styles.sale}>
            <BannerSale title='Sale this Week' />
          </View>

          <View style={styles.listCard}>
            <ListCard title='Best Seller Food' />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },

  banner: {
    marginTop: 30,
  },
  listCard: {
    marginTop: 5,
  },
  sale: {
    marginTop: 5,
    position: 'relative'
  }

});
