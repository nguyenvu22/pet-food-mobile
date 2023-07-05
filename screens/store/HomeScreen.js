import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const user = useSelector((state) => state.userReducers.user);
  console.log(user)
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
