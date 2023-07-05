import { StatusBar } from "expo-status-bar";
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

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const HAS_LAUNCH = "HAS_LAUNCH";

function BottomTabsScreen() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} options={{}} />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={{}} />
      <Tabs.Screen name="Cart" component={CartScreen} options={{}} />
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
        initialParams={{hasLaunched}}
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
      <StatusBar style="auto" />
      <Provider store={store}>
        <Main hasLaunched={hasLaunched} setHasLaunched={setHasLaunched} />
      </Provider>
    </>
  );
}
