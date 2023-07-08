import { useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../constants/styles";
import ListCardCart from "../../components/listCard/ListCardCart";

export default function CartScreen() {
  // const cartInRedux = useSelector((state) => state.cartReducers.cart);
  const cartInRedux = [
    {
      id: "0763121c-dd57-479b-a760-4bca61e9c593",
      productName: "Premium Peanuts",
      description:
        "Our premium peanuts for birds are rich in essential oils and proteins, making them a favourite of many garden bird species including the tit family, Nuthatch and Great spotted woodpecker.",
      expiredDate: "2023-07-03",
      price: 450000,
      image:
        "https://www.vinehousefarm.co.uk/media/catalog/prod…9833b6eb94955e5f4da4e6727/p/r/premium-peanuts.jpg",
      remainQuantity: 100,
      status: true,
      quantity: 1,
      type: "Product",
    },
    {
      id: "0763121c-dd57-479b-a760-4bca61e9c590",
      productName: "Vu",
      description:
        "Our premium peanuts for birds are rich in essential oils and proteins, making them a favourite of many garden bird species including the tit family, Nuthatch and Great spotted woodpecker.",
      expiredDate: "2023-07-03",
      price: 450000,
      image:
        "https://www.vinehousefarm.co.uk/media/catalog/prod…9833b6eb94955e5f4da4e6727/p/r/premium-peanuts.jpg",
      remainQuantity: 100,
      status: true,
      quantity: 1,
      type: "Product",
    },
    {
      id: "2452e1ea-beb9-4cf0-b136-0a931d26a1c9",
      title: "Test1",
      description: "desc1",
      image:
        "https://halotravel.vn/wp-content/uploads/2020/03/cong-thuc-chinh-anh-do-an-vsco-3.jpg",
      productMeals: [
        {
          amount: 2,
          product: {
            id: "1f2bfdd6-24ba-405f-b487-085c14c4ef19",
            productName: "Waxworms for Birds",
            expiredDate: "2023-07-03",
            price: 10,
            image:
              "https://vn-live-01.slatic.net/p/c071309622920e3f6e8d50b277803e3c.jpg",
            status: true,
          },
        },
        {
          amount: 2,
          product: {
            id: "346e6909-de80-4f74-b7fb-027d5ae4f787",
            productName: "Robin and Friends Mix",
            expiredDate: "2023-07-03",
            price: 250,
            image:
              "https://salt.tikicdn.com/cache/280x280/ts/product/19/13/73/a7c13821640b5f3cdb7c20c870fb8bfe.jpg",
            status: true,
          },
        },
      ],
      quantity: 1,
      type: "Meal",
    },
    {
      id: "9f8ea4ae-f295-44e9-83c0-507eca1f836d",
      title: "Test2",
      description: "desc2",
      image:
        "https://halotravel.vn/wp-content/uploads/2020/03/cong-thuc-chinh-anh-do-an-vsco-3.jpg",
      productMeals: [
        {
          amount: 2,
          product: {
            id: "346e6909-de80-4f74-b7fb-027d5ae4f787",
            productName: "Robin and Friends Mix",
            expiredDate: "2023-07-03",
            price: 250,
            image:
              "https://salt.tikicdn.com/cache/280x280/ts/product/19/13/73/a7c13821640b5f3cdb7c20c870fb8bfe.jpg",
            status: true,
          },
        },
        {
          amount: 2,
          product: {
            id: "1f2bfdd6-24ba-405f-b487-085c14c4ef19",
            productName: "Waxworms for Birds",
            expiredDate: "2023-07-03",
            price: 10,
            image:
              "https://vn-live-01.slatic.net/p/c071309622920e3f6e8d50b277803e3c.jpg",
            status: true,
          },
        },
      ],
      quantity: 1,
      type: "Meal",
    },
  ];

  const [meals, setMeals] = useState(
    cartInRedux.filter((item) => item.type === "Meal")
  );
  const [products, setProducts] = useState(
    cartInRedux.filter((item) => item.type === "Product")
  );
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Text style={styles.title}>Cart</Text>

      {meals.length !== 0 && (
        <View style={styles.section}>
          <ListCardCart
            data={meals}
            label="Meals"
            type="Meal"
            stateData={setMeals}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </View>
      )}

      {products.length !== 0 && (
        <View style={styles.section}>
          <ListCardCart
            data={products}
            label="Products"
            type="Product"
            stateData={setProducts}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </View>
      )}
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
    fontSize: 35,
    // fontFamily: "Seaweed Script",
    margin: 30,
  },
  section: {
    flex: 1,
    marginBottom: 30,
  },
});
