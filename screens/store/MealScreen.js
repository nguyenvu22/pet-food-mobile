import { useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";
import { getAllBird } from "../../services/bird";
import { getAllProduct } from "../../services/product";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import MealModal from "../../components/modal/MealModal";

export default function MealScreen({}) {
  const [birds, setBirds] = useState([]);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [birdId, setBirdId] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const userAccessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  useLayoutEffect(() => {
    async function getBirds() {
      setisLoading(true);
      const response = await getAllBird(userAccessToken);
      if (response.status === "Success") setBirds(response.data);
      setisLoading(false);
    }
    getBirds();

    async function getProducts() {
      setisLoading(true);
      const response = await getAllProduct(userAccessToken);
      if (response.status === "Success") {
        if (response.data.length % 3 === 1) {
          const list = [...response.data, null];
          console.log(list);
          setProducts([...response.data, null]);
        } else if (response.data.length % 3 === 2) {
          setProducts([...response.data, null, null]);
        } else setProducts(response.data);
      }
      setisLoading(false);
    }
    getProducts();
  }, []);

  function submitMeal() {
    if (title.length === 0) {
      Alert.alert("Please named your own meal", "It's empty!");
      return;
    }
    if (description.length === 0) {
      Alert.alert("What is the description?", "It's empty!");
      return;
    }
    if (!birdId) {
      Alert.alert("What is your bird?", "This meal is create for that bird!");
      return;
    }
    if (selectedProducts.length === 0) {
      Alert.alert(
        "Please choose some products",
        "This meal need some products!"
      );
    }
    setOpenModal(true);
  }

  function selectBird(id) {
    setBirdId(id);
  }

  function selectProducts(item) {
    if (selectedProducts.some((product) => product.id == item.id)) {
      const updatedList = selectedProducts.filter(
        (product) => product.id !== item.id
      );
      setSelectedProducts(updatedList);
    } else {
      setSelectedProducts((current) => [
        ...current,
        { id: item.id, image: item.image },
      ]);
    }
  }

  function renderBirds({ item }) {
    return (
      <TouchableOpacity
        onPress={selectBird.bind(this, item.id)}
        style={[
          styles.birdItem,
          item.id === birdId && {
            borderColor: "black",
            backgroundColor: "white",
          },
        ]}
      >
        <Image
          source={require("../../assets/icons/icon_bird.png")}
          style={[
            styles.birdImage,
            item.id === birdId && { tintColor: "black" },
          ]}
        />
        <Text
          style={[styles.birdText, item.id === birdId && { color: "black" }]}
        >
          {item.birdName}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderProducts({ item }) {
    if (item === null) {
      return <View style={{ width: 100, height: 100 }} />;
    } else {
      return (
        <TouchableOpacity
          key={item.id}
          style={{
            width: 100,
          }}
          onPress={selectProducts.bind(this, item)}
        >
          <View style={styles.productItem}>
            <Image
              source={{ uri: `${item.image}` }}
              defaultSource={require("../../assets/images/loading_image_horizontally.png")}
              style={styles.productImage}
            />
            {selectedProducts.some((product) => product.id === item.id) && (
              <View style={styles.selectedProduct} />
            )}
          </View>
          <Text
            style={[
              styles.productText,
              selectedProducts.some((product) => product.id === item.id) && {
                fontWeight: "700",
              },
            ]}
          >
            {item.productName}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function renderSelectedProducts(item, index) {
    return (
      <View style={styles.selectedItem} key={index}>
        <Image
          source={{
            uri: "https://www.vinehousefarm.co.uk/media/catalog/prod…b6eb94955e5f4da4e6727/h/-/h-sunfl.heart_chips.jpg",
          }}
          defaultSource={require("../../assets/images/loading_image_horizontally.png")}
          resizeMode="contain"
          style={{ width: 60, height: 60 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <MealModal
        isVisible={openModal}
        setIsVisible={setOpenModal}
        title={title}
        description={description}
        birdId={birdId}
        products={selectedProducts}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Prepare your own meal</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Meal name</Text>
          <TextInput
            style={styles.input}
            placeholder="Meal1"
            value={title}
            onChangeText={(value) => {
              setTitle(value);
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Meal description</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={description}
            onChangeText={(value) => {
              setDescription(value);
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Which bird?</Text>
          {isLoading ? (
            <LoadingOverlay />
          ) : (
            <FlatList
              data={birds}
              keyExtractor={(item) => item.id}
              renderItem={renderBirds}
              numColumns={6}
              columnWrapperStyle={{
                flexWrap: "wrap",
              }}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={[styles.section, { marginBottom: 120, minHeight: 200 }]}>
          <Text style={styles.label}>What products contained in a meal?</Text>
          {isLoading ? (
            <LoadingOverlay />
          ) : (
            <FlatList
              data={products}
              renderItem={renderProducts}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 20,
              }}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.selectedcontainer}>
        <View style={styles.selected}>
          <FlatList
            data={selectedProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return renderSelectedProducts(item, index);
            }}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            scrollEnabled
          />
        </View>
        {selectedProducts.length !== 0 && (
          <>
            <View style={styles.countProduct}>
              <Text style={styles.countText}>x{selectedProducts.length}</Text>
            </View>
            <TouchableOpacity
              style={[styles.countProduct, { right: -20, top: 30 }]}
              onPress={submitMeal}
            >
              <Ionicons name="chevron-forward-outline" size={25} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const dWidth = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.purple200,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    color: "white",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },

  birdItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  birdImage: { width: 28, height: 28, tintColor: Colors.transparentDark },
  birdText: {
    color: "rgba(0,0,0,0.3)",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 5,
  },

  productItem: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.4)",
  },
  productImage: { width: "100%", height: 94, borderRadius: 5 },
  productText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 3,
  },
  selectedProduct: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  selectedcontainer: {
    position: "absolute",
    bottom: 30,
    left: dWidth * 0.1,
    right: dWidth * 0.1,
    height: 100,
    borderRadius: 20,
    backgroundColor: Colors.purple400,
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 10 },
  },
  selected: {
    margin: 20,
  },
  selectedItem: {
    borderRadius: 10,
    overflow: "hidden",
  },
  countProduct: {
    position: "absolute",
    right: 30,
    top: -20,
    backgroundColor: "white",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: Colors.purple400,
  },
  countText: { fontSize: 15, fontWeight: "600" },
});
