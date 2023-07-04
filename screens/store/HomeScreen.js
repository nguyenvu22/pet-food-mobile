import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/styles";
import BannerCarousel from "../../components/banner/BannerCarousel";
import ListCard from "../../components/listCard/ListCard";
import ListCardCategory from "../../components/listCard/ListCardCategory";
import Header from "../../components/header/Header";
import avatar from '../../assets/meme1.jpg'
import Search from "../../components/search/Search";
import BannerSale from "../../components/banner/BannerSale";

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: 10,
      }}>
        <View style={styles.container}>
          <Header name='Hương Bơ' image={avatar} />

          <Search />

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
    marginVertical: 100,
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
