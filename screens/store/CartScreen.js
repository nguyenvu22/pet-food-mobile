import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../constants/styles";
import ListCardCart from "../../components/listCard/ListCardCart";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen({ navigation }) {
  const cartInRedux = useSelector((state) => state.cartReducers.cart);

  const [meals, setMeals] = useState(cartInRedux);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const animatedValue = useRef(
    new Animated.Value(-(dWidth * 0.08 + dWidth * 0.4))
  ).current;

  useEffect(() => {
    if (selectedProducts.length === 0) {
      Animated.timing(animatedValue, {
        toValue: -(dWidth * 0.08 + dWidth * 0.4),
        duration: 800,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -(dWidth * 0.08),
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedProducts]);

  useEffect(() => {
    setMeals(cartInRedux);
    setSelectedProducts([]);
  }, [cartInRedux]);

  function goToCheckout() {
    navigation.navigate("Checkout", { selectedProducts: selectedProducts });
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Text style={styles.title}>Cart</Text>
      {meals.length !== 0 && (
        <View style={styles.section}>
          <ListCardCart
            data={meals}
            setMeals={setMeals}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </View>
      )}
      <Animated.View style={[styles.buttonContainer, { right: animatedValue }]}>
        <Pressable onPress={goToCheckout} style={styles.button}>
          <Text style={styles.buttonText}>Checkout </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const dWidth = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.pink100,
    paddingHorizontal: dWidth * 0.08,
    paddingTop: dHeight * 0.04,
  },
  title: {
    textAlign: "center",
    fontSize: 45,
    fontFamily: "SeaweedScript",
    marginTop: 30,
    marginBottom: 10,
  },
  section: {},
  buttonContainer: {
    position: "absolute",
    top: dHeight * 0.75,
    // right: -dWidth * 0.08,
    height: 60,
    width: dWidth * 0.4,
    backgroundColor: Colors.purple400,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
});
