import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import { useSelector } from "react-redux";
import { getAllProduct } from "../../services/product";
import { Octicons } from "@expo/vector-icons";

export default function CustomMealScreen({ navifation, route }) {
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  const meal = route.params.meal;
  const [openModal, setOpenModal] = useState(false);

  const [products, setProducts] = useState([]);
  const [session, setSession] = useState("Morning");
  const [morningProducts, setMorningProducts] = useState([]);
  const [afternoonProducts, setAfternoonProducts] = useState([]);
  const [eveningProducts, setEveningProducts] = useState([]);

  useEffect(() => {
    async function getAllProducts() {
      const response = await getAllProduct(accessToken);
      if (response.status === "Success") {
        if (response.data.length % 3 === 1) {
          setProducts([...response.data, null]);
        } else if (response.data.length % 3 === 2) {
          setProducts([...response.data, null, null]);
        } else setProducts(response.data);
      }
    }
    getAllProducts();

    setMorningProducts(meal.productMeals.Morning ?? []);
    setAfternoonProducts(meal.productMeals.Afternoon ?? []);
    setEveningProducts(meal.productMeals.Evening ?? []);
  }, []);

  function renderSessionItem({ item }) {
    return (
      <Pressable
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
          },
          session === item && { backgroundColor: Colors.purple400 },
        ]}
        onPress={() => {
          setSession(item);
        }}
      >
        <Text
          style={[
            { fontWeight: "bold", color: Colors.transparentDark },
            session === item && { color: "white" },
          ]}
        >
          {item}
        </Text>
      </Pressable>
    );
  }

  function renderProductItem({ item }) {
    var list;
    if (session === "Morning") list = morningProducts;
    else if (session === "Afternoon") list = afternoonProducts;
    else list = eveningProducts;

    function handlePress() {
      var newList;
      if (list.some((p) => p.product.id === item.id)) {
        newList = list.filter((p) => p.product.id != item.id);
      } else {
        newList = [...list, { amount: 1, product: item }];
        console.log(newList);
      }
      if (session === "Morning") setMorningProducts(newList);
      else if (session === "Afternoon") setAfternoonProducts(newList);
      else setEveningProducts(newList);
    }

    if (item === null) {
      return <View style={{ width: dWidth * 0.25 }} />;
    } else {
      const isSelected = list.some((p) => p.product.id === item.id);
      return (
        <Pressable
          style={[
            {
              width: dWidth * 0.25,
              backgroundColor: "transparent",
              borderRadius: 5,
              padding: 3,
            },
            isSelected && { backgroundColor: Colors.purple400 },
          ]}
          onPress={handlePress}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: dWidth * 0.25 - 6,
                height: dWidth * 0.25 - 6,
                borderRadius: 5,
              }}
            />

            <Text
              style={{
                flex: 1,
                color: "black",
                fontWeight: "500",
                fontSize: 12,
                textAlign: "center",
                marginVertical: 8,
              }}
            >
              {item.productName}
            </Text>
          </View>
        </Pressable>
      );
    }
  }

  function SelectorModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={openModal}>
        <TouchableWithoutFeedback
          onPress={() => {
            setOpenModal(false);
          }}
        >
          <View style={styles.modal}>
            <Text style={{ fontSize: 25, fontWeight: "600", color: "white" }}>
              Select your option
            </Text>
            <View style={{ height: 40 }} />
            <Pressable style={styles.modalItem} onPress={() => {}}>
              <Text style={styles.modalText}>Add to Cart</Text>
              <View style={styles.modalButton}>
                <Octicons name="plus" color={"white"} size={30} />
              </View>
            </Pressable>
            <View style={{ height: 20 }} />
            <Pressable style={styles.modalItem} onPress={() => {}}>
              <Text style={styles.modalText}>Custom this Meal</Text>
              <View style={styles.modalButton}>
                <Octicons name="plus" color={"white"} size={30} />
              </View>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <View>
      <SelectorModal />
      <Text>CustomMealScreen</Text>
      <Text>CustomMealScreen</Text>
      <Text>CustomMealScreen</Text>
      <Text>CustomMealScreen</Text>
      <Text>CustomMealScreen</Text>
      <Text>CustomMealScreen</Text>
      <Text>CustomMealScreen</Text>
      <Text>CustomMealScreen</Text>

      <View
        style={{
          width: dWidth * 0.55,
          height: 5,
          backgroundColor: Colors.purple400,
          borderRadius: 10,
          marginVertical: 20,
        }}
      />

      <View>
        <FlatList
          data={["Morning", "Afternoon", "Evening"]}
          renderItem={renderSessionItem}
          numColumns={3}
          contentContainerStyle={{ marginHorizontal: 25, marginBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>

      <View>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          // keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{ marginHorizontal: 25 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: Colors.purple400,
          paddingVertical: 20,
          paddingHorizontal: 40,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          Finish
        </Text>
      </View>
    </View>
  );
}

const dWidth = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalItem: {
    width: dWidth * 0.6,
    height: 60,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.purple800,
    marginRight: 30,
  },
  modalButton: {
    position: "absolute",
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.purple800,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
