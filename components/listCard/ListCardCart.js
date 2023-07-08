import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CartProduct from "../../components/card/CartProduct";
import CartMeal from "../../components/card/CartMeal";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useState } from "react";

export default function ListCardCart({
  data,
  label,
  type,
  stateData,
  selectedProducts,
  setSelectedProducts,
}) {
  const [chosenProduct, setchosenProduct] = useState(
    selectedProducts.filter((item) => item.type === type)
  );

  function dataSelection() {
    if (chosenProduct.length === data.length) {
      console.log("chosenProduct.length === data.length");
      setSelectedProducts([]);
      setchosenProduct([]);
    } else {
      console.log("Add all");
      setSelectedProducts(data);
      setchosenProduct(data);
    }
  }

  function renderItemCard({ item }) {
    if (type === "Product") {
      return (
        <CartProduct
          data={data}
          dataItem={item}
          stateData={stateData}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          setchosenProduct={setchosenProduct}
        />
      );
    } else if (type === "Meal") {
      return <CartMeal data={data} dataItem={item} stateData={stateData} />;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Pressable
          style={[
            styles.check,
            chosenProduct.length === 0 && {
              backgroundColor: "transparent",
            },
          ]}
          onPress={dataSelection}
        >
          <Ionicons
            name="checkmark-sharp"
            color={chosenProduct.length !== 0 ? "white" : "transparent"}
            size={20}
          />
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={renderItemCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
  },
  check: {
    marginRight: 13,
    borderWidth: 1.5,
    borderColor: Colors.pink800,
    borderRadius: 50,
    backgroundColor: Colors.pink800,
  },
});
