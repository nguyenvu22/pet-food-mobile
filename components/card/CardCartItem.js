import {
  Alert,
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/cart/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartProduct({
  dataItem,
  data,
  setMeals,
  selectedProducts,
  setSelectedProducts,
}) {
  const dispatch = useDispatch();

  const [scaleValue, setScaleValue] = useState(new Animated.Value(1));

  function animationButton() {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    if (selectedProducts.some((item) => item.id === dataItem.id)) {
      setSelectedProducts(
        selectedProducts.filter((item) => item.id !== dataItem.id)
      );
    } else {
      const newValue = [...selectedProducts, dataItem];
      setSelectedProducts(newValue);
    }
  }

  async function changeQuantity(method) {
    //Update in cart
    const newValue = data.map((item) => {
      if (item.id === dataItem.id) {
        let newQuantity = dataItem.quantity;
        if (method === "increase") {
          newQuantity += 1;
        } else {
          if (dataItem.quantity > 1) {
            newQuantity -= 1;
          } else {
            Alert.alert("Removing from cart", "Are you sure?", [
              {
                text: "No",
                style: "destructive",
              },
              {
                text: "Yes",
                onPress: () => {
                  const newCart = data.filter((item) => item.id !== dataItem.id)
                  setMeals(newCart);
                  dispatch(updateCart({ cart: newCart }));
                  AsyncStorage.setItem("cart", JSON.stringify(newCart));

                  setSelectedProducts(
                    selectedProducts.filter((item) => item.id !== dataItem.id)
                  );
                },
              },
            ]);
          }
        }
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setMeals(newValue);
    // setSelectedProducts(newValue);
    dispatch(updateCart({ cart: newValue }));
    await AsyncStorage.setItem("cart", JSON.stringify(newValue));

    //Update in checkout
    if (dataItem.quantity > 1) {
      const newSelectedValue = selectedProducts.map((item) => {
        if (item.id === dataItem.id) {
          let newQuantity = dataItem.quantity;
          if (method === "increase") {
            newQuantity += 1;
          } else {
            newQuantity -= 1;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setSelectedProducts(newSelectedValue);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={animationButton}>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: scaleValue }] },
          selectedProducts.some((item) => item.id === dataItem.id) && {
            borderColor: Colors.pink800,
          },
        ]}
      >
        <View style={styles.innercontainer}>
          <View style={styles.left}>
            <View>
              <Image
                source={{ uri: `${dataItem.image}` }}
                defaultSource={require("../../assets/images/loading_image_horizontally.png")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.header}>
              <Text numberOfLines={1} style={styles.name}>
                {dataItem.title}
              </Text>
              <View
                style={[
                  styles.check,
                  !selectedProducts.some((item) => item.id === dataItem.id) && {
                    backgroundColor: "white",
                  },
                ]}
              >
                <Ionicons
                  name="checkmark-sharp"
                  color={
                    selectedProducts.some((item) => item.id === dataItem.id)
                      ? "white"
                      : "transparent"
                  }
                  size={20}
                />
              </View>
            </View>

            <View style={styles.body}>
              {/* <FlatList
                data={dataItem.productMeals}
                renderItem={renderProductImage}
                horizontal
              /> */}
              <Text numberOfLines={2}>{dataItem.description}</Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.price}>
                $
                {dataItem.productMeals.reduce((value, item) => {
                  return (value += item.amount * item.product.price);
                }, 0)}
              </Text>
              <View style={styles.plus}>
                <Pressable onPress={changeQuantity.bind(this, "decrease")}>
                  <Text style={styles.button}>-</Text>
                </Pressable>
                <Text style={styles.amount}>{dataItem.quantity}</Text>
                <Pressable onPress={changeQuantity.bind(this, "increase")}>
                  <Text style={styles.button}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 146,
    marginBottom: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "transparent",
  },
  innercontainer: {
    padding: 10,
    flexDirection: "row",
    borderRadius: 20,
  },
  left: {},
  right: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
  },
  check: {
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: Colors.pink800,
    borderRadius: 50,
    backgroundColor: Colors.pink800,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  plus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    width: 26,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});
