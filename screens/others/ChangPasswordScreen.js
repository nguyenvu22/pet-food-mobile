import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Caption, Title, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons, Octicons, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { changePassWordHandler } from "../../services/user";
import { useNavigation } from "@react-navigation/native";

const ChangPasswordScreen = ({ route }) => {
  const accessToken = route.params.token;
  const [oldPass, setOldPass] = useState({ value: "", error: "" });
  const [newPass, setNewPass] = useState({ value: "", error: "" });
  const [confirmPass, setConfirmPass] = useState({ value: "", error: "" });
  const [apiRes, setApiRes] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation();

  function goToLogin() {
    navigation.replace("Login");
  }

  function setStateHandler(state, error) {
    state((current) => {
      return { ...current, error: error };
    });
  }

  function validate() {
    if (oldPass.value.length === 0) {
      setStateHandler(setOldPass, "Password is at least 6 characters");
      return false;
    } else {
      setStateHandler(setOldPass, "");
    }

    if (newPass.value.length < 6) {
      setStateHandler(setNewPass, "Password is at least 6 characters");
      return false;
    } else {
      setStateHandler(setNewPass, "");
    }

    if (confirmPass.value.length === 0) {
      setStateHandler(setConfirmPass, "Input your password to confirm!");
      return false;
    } else {
      setStateHandler(setConfirmPass, "");
    }

    return true;
  }

  const changePassword = async () => {
    if (validate) {
      const data = {
        oldPassword: oldPass.value,
        newPassword: newPass.value,
        confirmNewPassword: confirmPass.value,
      };
      console.log("data", data);
      const response = await changePassWordHandler(data, accessToken);
      console.log("res in screen :  ", response);
      if (response.status === "Success") {
        // setApiRes(response);
        setIsSuccess(true);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 3000);
      } else if (response.status === "Fail") {
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/358617917_2338932642955510_7479849569806966300_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=hyE2dpaemR0AX_6SIkb&_nc_oc=AQmNjIX6UyP3vA3SPp-wioEgkYNT7r3aleqg00DoDFSBajmnkBFN0I8YB-d6EYhEs24&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfC2yJNz9KAfEQe_aERu23dF3ZWSbPaJv5xOlI41vY9NQw&oe=64B5DB77",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20, marginTop: 5 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              Đùi Gà Sốt ĐẬU
            </Title>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="dot-fill" size={20} color="green" />
              <Caption style={styles.caption}>@user</Caption>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.action}>
        <MaterialCommunityIcons
          name="shield-key-outline"
          size={24}
          color={Colors.green}
        />
        <TextInput
          placeholder="Old Password"
          placeholderTextColor="#666666"
          autoCorrect={false}
          autoFocus={true}
          style={styles.textInput}
          value={oldPass.value}
          onChangeText={(input) =>
            setOldPass((current) => {
              return { ...current, value: input };
            })
          }
          onBlur={() => {
            if (oldPass.value.length === 0 || oldPass.value.length < 6) {
              setStateHandler(setOldPass, "Password is at least 6 characters!");
            } else {
              setStateHandler(setOldPass, "");
            }
          }}
        />
      </View>
      <Text style={styles.error}>
        {oldPass.error}
        {apiRes && oldPass.error === "" && apiRes.message[0]}
      </Text>

      <View style={styles.action}>
        <Ionicons name="key-outline" size={24} color={Colors.green} />
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          value={newPass.value}
          onChangeText={(input) =>
            setNewPass((current) => {
              return { ...current, value: input };
            })
          }
          onBlur={() => {
            if (newPass.value.length === 0 || newPass.value.length < 6) {
              setStateHandler(setNewPass, "Password is at least 6 characters!");
            } else {
              setStateHandler(setNewPass, "");
            }
          }}
        />
      </View>
      <Text style={styles.error}>
        {newPass.error}
        {apiRes && newPass.error === "" && apiRes.message[0]}
      </Text>

      <View style={styles.action}>
        <Ionicons name="key-outline" size={24} color={Colors.green} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          value={confirmPass.value}
          onChangeText={(input) =>
            setConfirmPass((current) => {
              return { ...current, value: input };
            })
          }
          onBlur={() => {
            if (
              newPass.value.length !== 0 &&
              confirmPass.value !== newPass.value
            ) {
              setStateHandler(setConfirmPass, "Unmatch Password!");
            } else if (confirmPass.value.length === 0) {
              setStateHandler(
                setConfirmPass,
                "Input your password to confirm!"
              );
            } else {
              setStateHandler(setConfirmPass, "");
            }
          }}
        />
      </View>
      <Text style={styles.error}>
        {confirmPass.error}
        {apiRes && confirmPass.error === "" && apiRes.message[0]}
      </Text>

      <TouchableRipple style={styles.commandButton} onPress={changePassword}>
        <Text style={{ color: Colors.green }}>Submit</Text>
      </TouchableRipple>
    </SafeAreaView>
  );
};

export default ChangPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink100,
  },
  userInfoSection: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    marginLeft: 5,
  },
  action: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: "#666666",
    borderBottomWidth: 1,
    paddingBottom: 5,
    alignItems: "center",
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    marginHorizontal: 3,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.pink200,
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 25,
  },
});
