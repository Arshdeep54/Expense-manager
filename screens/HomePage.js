import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

import LoginPage from "./LoginPage";
import { getAuth } from "firebase/auth";
import { app } from "../FireBase";
const HomePage = ({ navigation }) => {
  const auth = getAuth(app);
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("user signed out");
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View>
      <View>
        <Text>Home</Text>
        <Pressable style={styles.btn} onPress={logOut}>
          <Text>Log out</Text>
        </Pressable>
      </View>

    <Pressable>
        add money
    </Pressable>
    </View>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
});
