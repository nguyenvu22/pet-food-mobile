import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import image from "../../assets/meme1.jpg";
import CardShipping from "../../components/card/CardShipping";
import { getOrderByStatus } from "../../services/order";

const ShippingScreen = ({ navigation }) => {
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );
  const [selectedButton, setSelectedButton] = useState("Delivery");
  const [orderData, setOrderData] = useState([]);
  console.log(orderData);

  useEffect(() => {
    async function getOrders() {
      let statusToAPI;
      if (selectedButton === "Delivery") statusToAPI = "delivering";
      else if (selectedButton === "Succeeded") statusToAPI = "completed";
      else statusToAPI = "canceled";

      const response = await getOrderByStatus(accessToken, statusToAPI);

      if (response.status === "Success") setOrderData(response.data);
      else setOrderData([]);
    }
    getOrders();
  }, [selectedButton]);

  const handlerPressDelivery = () => {
    setSelectedButton("Delivery");
  };
  const handlerPressSuccess = () => {
    setSelectedButton("Succeeded");
  };
  const handlerPressCancel = () => {
    setSelectedButton("Canceled");
  };

  return (
    <View style={styles.shippingContainer}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="bird"
          size={24}
          color={Colors.white}
          style={{ paddingLeft: 10 }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: Colors.white,
          }}
        >
          Pet Shop
        </Text>
      </View>
      <View style={styles.buttonHeader}>
        <View style={styles.btn}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#cccccc" }}
            onPress={handlerPressDelivery}
          >
            <View style={styles.btnInner}>
              <Text
                style={[
                  styles.title,
                  selectedButton === "Delivery" && { color: Colors.green },
                ]}
              >
                Delivery
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.btn}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#cccccc" }}
            onPress={handlerPressSuccess}
          >
            <View style={styles.btnInner}>
              <Text
                style={[
                  styles.title,
                  selectedButton === "Succeeded" && { color: Colors.green },
                ]}
              >
                Succeeded
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.btn}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#cccccc" }}
            onPress={handlerPressCancel}
          >
            <View style={styles.btnInner}>
              <Text
                style={[
                  styles.title,
                  selectedButton === "Canceled" && { color: Colors.green },
                ]}
              >
                Canceled
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.orderContainer}>
        {/* <View style={styles.orderSummary}>
          <Text style={styles.summaryText}>Order Summary</Text>
        </View> */}
        <View style={styles.listCardShipping}>
          <FlatList
            data={orderData}
            renderItem={({ item }) => {
              return <CardShipping item={item} />;
            }}
          />
        </View>
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default ShippingScreen;

const styles = StyleSheet.create({
  shippingContainer: {
    backgroundColor: Colors.light,
  },
  header: {
    height: 120,
    backgroundColor: Colors.redPastel200,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  footer: {
    // height: 120,
    // backgroundColor: Colors.redPastel200,
  },
  buttonHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 30,
    height: 70,
    backgroundColor: Colors.white,
    borderRadius: 18,
    top: -35,
    overflow: "hidden",
  },
  btn: {
    height: "100%",
    width: 113,
  },
  btnInner: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.dark,
  },
  orderContainer: {
    marginHorizontal: 10,
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginLeft: 5,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark,
  },

  listCardShipping: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
  },
});
