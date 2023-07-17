import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import image1 from "../../assets/meme1.jpg";
import { Ionicons } from "@expo/vector-icons";
import { cancelOrder } from "../../services/order";
import { useSelector } from "react-redux";

const CardShipping = ({ item, selectedButton }) => {
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  function handleCancelOrder() {
    Alert.alert("Are you sure?", "You are removing an order", [
      {
        text: "No",
        style: "destructive",
      },
      {
        text: "Yes",
        onPress: () => {
          // async function handleCancel() {
          //   const response = await cancelOrder(accessToken, item.id);
          //   console.log(response);
          // }
          // handleCancel();
        },
      },
    ]);
  }

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
            marginVertical: 10,
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
        <View
          style={{ flex: 1, marginLeft: 10, justifyContent: "space-between" }}
        >
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            Order code : {item.orderCode}
          </Text>
          <View style={{ height: 5 }} />
          <Text>{item.orderDate}</Text>
          <Text>
            Qty :{" "}
            {item.orderDetails.reduce((value, item) => {
              return (value += item.amount);
            }, 0)}{" "}
            item
          </Text>
          <Text>Transactions : {item.transactions[0].paymentType}</Text>
          <View style={{ height: 5 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>${(item.totalPrice / 24000).toFixed(1)}</Text>
            {/* {selectedButton === "Delivery" ? (
              <TouchableOpacity onPress={handleCancelOrder}>
                <Ionicons name="trash-outline" size={25} color={"#f36d10"} />
              </TouchableOpacity>
            ) : (
              <View style={{ height: 27 }} />
            )} */}
          </View>
        </View>
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
    paddingHorizontal: 20,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
});
