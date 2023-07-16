import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DetailNewScreen = ({ route }) => {

    const data = route.params.DataNew
  return (
    <View>
      <Text>DetailNewScreen - {data.name}</Text>
    </View>
  );
};

export default DetailNewScreen;

const styles = StyleSheet.create({});
