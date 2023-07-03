import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/styles";
import BannerCarousel from "../../components/banner/BannerCarousel";
import ListCard from "../../components/listCard/ListCard";

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: 10,
      }}>
        <View style={styles.container}>

          <View style={styles.header}>
            <View style={styles.headerUser}>
              <Image source={require('../../assets/meme1.jpg')} style={styles.avatar} />
              <View >
                <Text style={styles.headerTitle}> Hi Jame 👋  </Text>
                <Text style={styles.welcomeText}>Welcome back to Food Pet </Text>
              </View>
            </View>
            <View style={styles.headerNotification}>
              <Ionicons name="ios-notifications-outline" size={25} color="black" />
            </View>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInnerContainer}>
              <Ionicons name="search" size={24} color="black"
                style={styles.iconSearch} />
              <TextInput placeholder='Search Store ' style={styles.textInputSearch} />
            </View>
          </View>

          <View style={styles.banner}>
            <BannerCarousel />
          </View>

          <View style={styles.listCard}>
            <ListCard title='Popular Food' />
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
    marginVertical: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerUser: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    aspectRatio: 1, //định rõ tỷ lệ khung hình cho một phần tử giao diện nghĩa là tỷ lệ giữa chiều rộng và chiều cao là 1:1, tức là phần tử sẽ có kích thước hình vuông.
    borderRadius: 52,
    resizeMode: 'cover'
  },
  headerTitle: {
    fontSize: 18,
    marginBottom: 1,
    fontWeight: '600'
  },
  welcomeText: {
    color: 'gray',
    opacity: 0.75,
  },
  headerNotification: {
    width: 52,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 52,
    borderWidth: 1,
    borderColor: Colors.grey
  },
  searchContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  searchInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.light,
    borderRadius: 13,
    alignItems: 'center',
  },
  iconSearch: {
    marginLeft: 20,
  },
  textInputSearch: {
    paddingLeft: 5,
    fontSize: 14,
    color: Colors.dark,
    flex: 1,
    fontWeight: '500'
  },
  banner: {
    marginTop: 30,
  },
  listCard: {
    marginTop: 5,
  }
});
