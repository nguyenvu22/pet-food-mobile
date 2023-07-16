import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import CardArchive from "../../components/card/CardArchive";
import { useSelector } from "react-redux";
import { getAllMealCustomerFunction } from "../../services/meal";

const dWith = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const ArchiveCustomerScreen = () => {
  const navigation = useNavigation();
  const [mealCustomer, setMealCustomer] = useState([]);
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  useEffect(() => {
    getAllMealCustomer(accessToken);
  }, [accessToken]);

  const getAllMealCustomer = async (accessToken) => {
    try {
      const response = await getAllMealCustomerFunction(accessToken);
      if (response?.status === "Success") {
        setMealCustomer(response.data);
      } else {
        console.log("error in screen : ");
      }
    } catch (error) {
      console.log("error in screen : ", error);
    }
  };

  const renderItem = (itemData) => {
    return (
      <View>
        <CardArchive data={itemData.item} />
      </View>
    );
  };

  if (mealCustomer === [] || mealCustomer.length === 0) {
    return (
      <>
        <View style={styles.header}>
          <View style={styles.headerBtn}>
            <Ionicons
              name="chevron-back"
              size={25}
              color={Colors.dark}
              onPress={navigation.goBack}
            />
          </View>
          <View style={styles.innerHeader}>
            <View />
            <View>
              <Text style={styles.title}>Archive</Text>
            </View>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <AntDesign name="dropbox" size={150} color={Colors.purple400} />
          <View>
            <Text textEmpty>Your Archive Is Empty </Text>
          </View>
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerBtn}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={Colors.dark}
            onPress={navigation.goBack}
          />
        </View>
        <View style={styles.innerHeader}>
          <View />
          <View>
            <Text style={styles.title}>Archive</Text>
          </View>
        </View>
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          paddingBottom: 50,
          backgroundColor: Colors.white,
        }}
      >
        <View style={styles.container}>
          <View style={styles.productContainer}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                paddingBottom: 25,
                marginLeft: 10,
              }}
            >
              Meals Custom
            </Text>
            <FlatList
              data={mealCustomer}
              renderItem={renderItem}
              key={(item) => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ArchiveCustomerScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.pink100,
    paddingTop: dHeight * 0.065,
    paddingBottom: 10,
  },
  innerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: dWith * 0.54,
  },
  headerBtn: {
    height: 30,
    width: 30,
    borderRadius: 99999,
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 13,
  },
  title: {
    textAlign: "center",
    fontSize: 45,
    fontFamily: "SeaweedScript",
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  productContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textEmpty: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
