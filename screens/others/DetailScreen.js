import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/styles";
import { Ionicons, Octicons, Feather, AntDesign } from "@expo/vector-icons";
import { getAllProduct, getProductByIdFunction } from "../../services/product";
import { getAllMeal, getMealByIdFunction } from "../../services/meal";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../redux/cart/cart";
import LoadingScreen from "../../components/loading/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmModal from "../../components/modal/ConfirmModal";

const DetailScreen = ({ navigation, route }) => {
  const type = route.params.itemType;
  const id = route.params.itemId;

  const cartInRedux = useSelector((state) => state.cartReducers.cart);
  const dispatch = useDispatch();

  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState();
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  let selectItem;
  if (type === "product") {
    selectItem = products?.find((item) => item.id === id);
  } else {
    selectItem = meals?.find((item) => item.id === id);
  }
  console.log(selectItem);

  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  //   const getProductById = async (idProduct, accessToken) => {
  //     try {
  //       const response = await getProductByIdFunction(idProduct, accessToken);
  //       if (response?.status === "Success") {
  //         setProducts(response.data);
  //       } else {
  //         console.log("error in screen : ");
  //       }
  //     } catch (error) {
  //       console.log("error in screen : ", error);
  //     }
  //   };

  //   const getMealById = async (idMeal, accessToken) => {
  //     try {
  //       const response = await getMealByIdFunction(idMeal, accessToken);
  //       if (response?.status === "Success") {
  //         setMeals(response.data);
  //       } else {
  //         console.log("error in screen : ");
  //       }
  //     } catch (error) {
  //       console.log("error in screen : ", error);
  //     }
  //   };

  const getAllProducts = async (accessToken) => {
    try {
      const response = await getAllProduct(accessToken);
      if (response?.status === "Success") {
        setProducts(response.data);
        setIsLoading(false);
      } else {
        console.log("error in screen : ");
      }
    } catch (error) {
      console.log("error in screen : ", error);
    }
  };

  const getAllMeals = async (accessToken) => {
    try {
      const response = await getAllMeal(accessToken);
      if (response?.status === "Success") {
        setMeals(response.data);
        setIsLoading(false);
      } else {
        console.log("error in screen : ");
      }
    } catch (error) {
      console.log("error in screen : ", error);
    }
  };

  const handlerAddToCart = async () => {
    console.log(cartInRedux);
    let addToCart;
    if (cartInRedux.some((item) => item.id === selectItem.id)) {
      addToCart = cartInRedux.map((item) => {
        if (item.id === selectItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      addToCart = [...cartInRedux, { ...selectItem, quantity: 1 }];
    }
    dispatch(updateCart({ cart: addToCart }));
    await AsyncStorage.setItem("cart", JSON.stringify(addToCart));

    setOpenModal(false);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  const handleCustomMeal = () => {
    setOpenModal(false);
    navigation.navigate("CustomMeal", { meal: selectItem });
  };

  const handlerLike = () => {
    console.log("click like");
  };

  useEffect(() => {
    setIsLoading(true);
    if (type === "product") {
      // getProductById(id, accessToken);
      getAllProducts(accessToken);
    } else {
      // getMealById(id, accessToken);
      getAllMeals(accessToken);
    }
  }, [accessToken]);

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
            <Pressable style={styles.modalItem} onPress={handlerAddToCart}>
              <Text style={styles.modalText}>Add to Cart</Text>
              <View style={styles.modalButton}>
                <Octicons name="plus" color={"white"} size={30} />
              </View>
            </Pressable>
            <View style={{ height: 20 }} />
            <Pressable style={styles.modalItem} onPress={handleCustomMeal}>
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={{
        paddingBottom: type === "product" ? 1 : 40,
        backgroundColor: Colors.pink100,
      }}
    >
      <SelectorModal />
      <ConfirmModal
        visible={visible}
        setVisible={setVisible}
        requireUrl="lottie_add_to_cart"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 40 }}
      >
        <View style={styles.ImgBgContainer}>
          <ImageBackground
            source={{ uri: selectItem?.image }}
            style={styles.image}
          >
            <View style={styles.header}>
              <View style={styles.headerBtn}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color="black"
                  onPress={navigation.goBack}
                />
              </View>
            </View>
          </ImageBackground>
          <View style={styles.desTag}>
            <Text
              style={styles.desTitle}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {/* {selectItem?.productName} */}
              {selectItem?.title}
            </Text>
          </View>
        </View>
        <View style={styles.desContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.desText}>{selectItem?.expiredDate}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{selectItem?.price}</Text>
              <Text style={styles.currencyUnit}>VND</Text>
            </View>
          </View>
          <View style={styles.quantity}>
            <Feather name="box" size={20} color="black" />
            <Text style={styles.desText2}>{selectItem?.remainQuantity}</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.innerBox}>
              <Text style={styles.titleBox}>Weight</Text>
              <Text style={styles.textBox}>200g</Text>
            </View>
            <View>
              <Text style={styles.titleBox}>Branch</Text>
              <Text style={styles.textBox}>Supereme</Text>
            </View>
            <View>
              <Text style={styles.titleBox}>Origin</Text>
              <Text style={styles.textBox}>US/UK</Text>
            </View>
          </View>
          <View style={styles.desDetailContainer}>
            <Text style={styles.desDetailText}>{selectItem?.description}</Text>
          </View>
          <View style={styles.instructContainer}>
            <Text style={styles.instructTitle}>Storage Instructions :</Text>
            <Text style={styles.instructText}>
              - Use about 30 days after opening
            </Text>
            <Text style={styles.instructText}>
              - Store the product at a cool temperature
            </Text>
            <Text style={styles.instructText}>
              -<Text style={{ fontSize: 15, fontWeight: "800" }}> Note </Text>Do
              not use products that show signs of damage
            </Text>
          </View>
          <View style={styles.instructContainer}>
            <Text style={styles.instructTitle}>Refund Instructions :</Text>
            <Text style={styles.instructText}>
              In case the customer receives a damaged product due to the
              transfer process, please take a photo of the product and contact
              it through the Pet Shop app via the following 2 ways for
              instructions on how to return it via the following 2 ways.
            </Text>
            <Text style={styles.instructText}>
              - <Text style={{ fontSize: 15, fontWeight: "800" }}> 1 </Text> Go
              to the app to choose a product, please leave a picture in the
              comment below
            </Text>
            <Text style={styles.instructText}>
              -<Text style={{ fontSize: 15, fontWeight: "800" }}> 2 </Text>At
              the Pet shop page, please contact us to leave a picture of the
              product name you want to support
            </Text>
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Review (12)</Text>
            <View style={styles.iconStarReview}>
              <AntDesign name="star" size={24} color={Colors.yellow200} />
              <AntDesign name="star" size={24} color={Colors.yellow200} />
              <AntDesign name="star" size={24} color={Colors.yellow200} />
              <AntDesign name="star" size={24} color={Colors.yellow200} />
              <AntDesign name="staro" size={24} color={Colors.yellow200} />
            </View>
          </View>
        </View>
      </ScrollView>
      {type === "meal" && (
        <View style={styles.footer}>
          <View style={styles.likeContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
              ]}
              android_ripple={{ color: "#cccccc" }}
              onPress={handlerLike}
            >
              <View style={styles.likeInnerContainer}>
                <Octicons name="feed-heart" size={27} color="black" />
              </View>
            </Pressable>
          </View>
          <View style={styles.addCartContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
              ]}
              android_ripple={{ color: "#cccccc" }}
              onPress={() => {
                setOpenModal(true);
              }}
            >
              <View style={styles.addCartInnerContainer}>
                <Text style={styles.addCartText}>Add To Cart</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;

const dWidth = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  ImgBgContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    elevation: 20,
    height: 350,
  },
  image: {
    resizeMode: "cover",
    borderRadius: 20,
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerBtn: {
    height: 35,
    width: 35,
    backgroundColor: Colors.white,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
  },
  desTag: {
    width: 200,
    backgroundColor: Colors.purple800,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    top: -20,
    elevation: 18,

    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // overflow: "hidden",
  },
  desTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.pink100,
  },
  desContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",

    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 10,
  },
  desText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.redPastel200,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.green,
    borderBottomLeftRadius: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.yellow100,
    marginRight: 5,
  },
  currencyUnit: {
    fontSize: 12,
    fontWeight: "400",
  },
  quantity: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  desText2: {
    color: "gray",
    fontSize: 14,
    marginLeft: 5,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginTop: 20,
  },
  innerBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    fontSize: 16,
    fontWeight: "400",
    color: "gray",
    marginBottom: 5,
  },
  textBox: {
    fontWeight: "600",
    color: Colors.dark,
  },
  desDetailContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  desDetailText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
  },
  instructContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  instructTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 10,
  },
  instructText: {
    marginBottom: 2,
  },
  reviewContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.dark,
    marginBottom: 10,
  },
  iconStarReview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  footer: {
    position: "absolute",
    height: dHeight * 0.11,
    backgroundColor: Colors.pink200,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    bottom: 0,
    right: 0,
    left: 0,
    // paddingTop: 10,
    // paddingBottom: 30,
  },
  likeContainer: {
    height: 50,
    width: 50,
    backgroundColor: Colors.white,
    borderRadius: 99999,
    elevation: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  likeInnerContainer: {
    height: 50,
    width: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addCartContainer: {
    height: 50,
    width: 240,
    backgroundColor: Colors.purple800,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,
    overflow: "hidden",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  addCartInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 240,
    borderRadius: 20,
  },
  addCartText: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: Colors.white,
  },

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
