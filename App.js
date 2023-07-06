import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/auth/LoginScreen";
import RegistScreen from "./screens/auth/RegistScreen";
import HomeScreen from "./screens/store/HomeScreen";
import ProfileScreen from "./screens/store/ProfileScreen";
import CartScreen from "./screens/store/CartScreen";

import SplashScreen from "./screens/splash/SplashScreen";
import OnboardScreen from "./screens/onboard/OnboardScreen";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/redux";
import { initUser } from "./redux/user/user";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import SettingScreen from "./screens/store/SettingScreen";
import { Colors } from "./constants/styles";
// import imageHome from "./assets/homeTab.png";
// import cartTab from "./assets/cartTab.png";
// import settingTab from "./assets/settingTab.png";
// import userTab from "./assets/userTab.png";
import AddButtonTab from "./components/button/AddButtonTab";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const HAS_LAUNCH = "HAS_LAUNCH";

// const getIconSize = focused => ({
//   height: focused ? 64 : 40,
//   width: focused ? 64 : 40,
// });

function BottomTabsScreen() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.yellow,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarInactiveTintColor: Colors.purple100,
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              {/* <Image source={imageHome} resizeMode='contain'
                style={[styles.tabBarIcon, getIconSize(focused)]} /> */}
              <AntDesign name="home" size={size} color={color} />
            </View>
          ),
          tabBarItemStyle: {
            height: 0,
          },
        }}
      />

      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              {/* <Image source={cartTab} resizeMode='contain'
              style={[styles.tabBarIcon, getIconSize(focused)]} /> */}
              <AntDesign name="shoppingcart" size={size} color={color} />
            </View>
          ),
          tabBarItemStyle: {
            height: 0,
          },
        }}
      />

      <Tabs.Screen
        name="AddMeal"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Add Meal",
          tabBarIcon: ({ focused }) => <AddButtonTab />,
          tabBarItemStyle: {
            height: 0,
          },
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              {/* <Image source={userTab} resizeMode='contain'
              style={[styles.tabBarIcon, getIconSize(focused)]} /> */}
              <AntDesign name="user" size={size} color={color} />
            </View>
          ),
          tabBarItemStyle: {
            height: 0,
          },
        }}
      />
      <Tabs.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              {/* <Image source={settingTab} resizeMode='contain'
              style={[styles.tabBarIcon, getIconSize(focused)]} /> */}
              <AntDesign name="setting" size={size} color={color} />
            </View>
          ),
          tabBarItemStyle: {
            height: 0,
          },
        }}
      />
    </Tabs.Navigator>
  );
}

function StackScreen({ hasLaunched }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Splash"}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        initialParams={{ hasLaunched }}
        options={{}}
      />
      <Stack.Screen name="Onboard" component={OnboardScreen} options={{}} />
      <Stack.Screen name="Store" component={BottomTabsScreen} options={{}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{}} />
      <Stack.Screen name="Regist" component={RegistScreen} options={{}} />
    </Stack.Navigator>
  );
}

function Main({ hasLaunched, setHasLaunched }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const userFromStorage = await AsyncStorage.getItem("user");
      if (userFromStorage !== null) {
        dispatch(initUser({ user: JSON.parse(userFromStorage) }));
      }
    }
    getUser().catch((err) => console.log(err));

    async function getIsFirstLaunch() {
      const isLaunched = await AsyncStorage.getItem(HAS_LAUNCH);
      if (isLaunched) {
        console.log("not null => set state");
        setHasLaunched(true);
      } else {
        console.log("NULL => set storage");
        await AsyncStorage.setItem(HAS_LAUNCH, "true");
      }
      setLoading(false);
    }
    getIsFirstLaunch().catch((err) => console.log(err));
  }, []);

  if (loading) {
    return null; // Render a loading state or a placeholder component here
  }

  return (
    <NavigationContainer>
      <StackScreen hasLaunched={hasLaunched} />
    </NavigationContainer>
  );
}

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);
  // AsyncStorage.clear();
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
        style="auto"
      />
      <Provider store={store}>
        <Main hasLaunched={hasLaunched} setHasLaunched={setHasLaunched} />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 52,
    bottom: 20,
    borderRadius: 90,
    marginHorizontal: 4,
    alignItems: "center",

    justifyContent: "center",
    padding: 0,
    left: 16,
    right: 16,
    borderTopColor: "transparent",
    backgroundColor: Colors.purple400,
    shadowColor: Colors.dark,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },
  iconContainer: {
    position: "absolute",
    top: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red',
    borderRadius: 99999,
    padding: 1,
    height: 55,
    width: 55,
  },
  tabBarIcon: {
    height: 40,
    width: 40,
  },
  focusedIcon: {
    height: 70,
    width: 70,
  },
});
