import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/auth/LoginScreen";
import RegistScreen from "./screens/auth/RegistScreen";
import HomeScreen from "./screens/store/HomeScreen";
import ProfileScreen from "./screens/store/ProfileScreen";
import CartScreen from "./screens/store/CartScreen";
import { AntDesign } from '@expo/vector-icons';
import SettingScreen from './screens/store/SettingScreen';
import { Colors } from './constants/styles';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabsScreen() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarStyle: { height: 60, position: 'absolute', bottom: 20, borderRadius: 90, marginHorizontal: 25 }
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="Cart" component={CartScreen} options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="shoppingcart" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="Setting" component={SettingScreen} options={{
        tabBarLabel: 'Setting',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="setting" size={size} color={color} />
        )
      }} />
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
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
