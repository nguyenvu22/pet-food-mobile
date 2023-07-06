import 'react-native-gesture-handler';
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
import { AntDesign } from '@expo/vector-icons';
import SettingScreen from './screens/store/SettingScreen';
import { Colors } from './constants/styles';
import imageHome from './assets/homeTab.png'
import cartTab from './assets/cartTab.png'
import settingTab from './assets/settingTab.png'
import userTab from './assets/userTab.png'
import AddButtonTab from './components/button/AddButtonTab';



const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

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
        tabBarInactiveTintColor: Colors.purple100
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              {/* <Image source={imageHome} resizeMode='contain'
                style={[styles.tabBarIcon, getIconSize(focused)]} /> */}
              <AntDesign name="home" size={size} color={color} />
            </View>
          ),
          tabBarItemStyle: {
            height: 0
          }
        }} />

      <Tabs.Screen name="Cart" component={CartScreen} options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ focused, size, color }) => (
          <View style={[styles.iconContainer]}>
            {/* <Image source={cartTab} resizeMode='contain'
              style={[styles.tabBarIcon, getIconSize(focused)]} /> */}
            <AntDesign name="shoppingcart" size={size} color={color} />
          </View>
        ),
        tabBarItemStyle: {
          height: 0
        }
      }} />

      <Tabs.Screen name="AddMeal" component={ProfileScreen} options={{
        tabBarLabel: 'Add Meal',
        tabBarIcon: ({ focused }) => (
          <AddButtonTab />
        ),
        tabBarItemStyle: {
          height: 0
        }
      }} />




      <Tabs.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused, size, color }) => (
          <View style={[styles.iconContainer]}>
            {/* <Image source={userTab} resizeMode='contain'
              style={[styles.tabBarIcon, getIconSize(focused)]} /> */}
            <AntDesign name="user" size={size} color={color} />
          </View>
        ),
        tabBarItemStyle: {
          height: 0
        }
      }} />
      <Tabs.Screen name="Setting" component={SettingScreen} options={{
        tabBarLabel: 'Setting',
        tabBarIcon: ({ focused, size, color }) => (
          <View style={[styles.iconContainer]}>
            {/* <Image source={settingTab} resizeMode='contain'
              style={[styles.tabBarIcon, getIconSize(focused)]} /> */}
            <AntDesign name="setting" size={size} color={color} />
          </View>
        ),
        tabBarItemStyle: {
          height: 0
        }
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
      <StatusBar translucent backgroundColor={Colors.transparent} />
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 52,
    bottom: 20,
    borderRadius: 90,
    marginHorizontal: 4,
    alignItems: 'center',

    justifyContent: 'center',
    padding: 0,
    left: 16,
    right: 16,
    borderTopColor: 'transparent',
    backgroundColor: Colors.purple400,
    shadowColor: Colors.dark,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },
  iconContainer: {
    position: 'absolute',
    top: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }

});
