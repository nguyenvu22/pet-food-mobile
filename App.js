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
import { Provider } from "react-redux";
import { store } from "./redux/redux";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

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

function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{}} />
      <Stack.Screen name="Onboard" component={OnboardScreen} options={{}} />
      <Stack.Screen name="Store" component={BottomTabsScreen} options={{}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{}} />
      <Stack.Screen name="Regist" component={RegistScreen} options={{}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <StackScreen />
        </NavigationContainer>
      </Provider>
    </>
  );
}
