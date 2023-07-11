import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CardCartItem from "../card/CardCartItem";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useState } from "react";

export default function ListCardCart({
  data,
  setMeals,
  selectedProducts,
  setSelectedProducts,
}) {

  function dataSelection() {
    if (selectedProducts.length === data.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(data);
    }
  }

  function renderItemCard({ item }) {
    return (
      <CardCartItem
        data={data}
        dataItem={item}
        stateData={setMeals}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Selected ({selectedProducts.length})</Text>
        <Pressable
          style={[
            styles.check,
            selectedProducts.length === 0 && {
              backgroundColor: "transparent",
            },
          ]}
          onPress={dataSelection}
        >
          <Ionicons
            name="checkmark-sharp"
            color={selectedProducts.length !== 0 ? "white" : "transparent"}
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 14,
    marginRight: 10,
  },
  check: {
    marginRight: 13,
    borderWidth: 1.5,
    borderColor: Colors.pink800,
    borderRadius: 50,
    backgroundColor: Colors.pink800,
  },
});
