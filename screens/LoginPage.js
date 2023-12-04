import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../FireBase";
import SafeViewAndroid from "../components/SafeViewAndroid";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.navigate("home");
      }
    });
    return unsubscribe;
  }, []);

  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 40,
            fontSize: 24,
            fontWeight: 600,
            color: "#1D2D44",
          }}
        >
          Log In
        </Text>
      </View>
      <View
        style={{
          margin: "auto",
          width: "60%",
          height: 300,
          backgroundColor: "#5D7798",
          borderRadius: 5,
          padding: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Enter Email"
          underlineColorAndroid="#1D2D44"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid="#1D2D44"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={SignIn}>
          <Text
            style={{
              fontSize: 16,
              color: "#F0EBD8",
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#F0EBD8",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    // backgroundColor: "#3E5C76",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#1D2D44",
    width: "100%",
    padding: 15,

    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
});

export default LoginPage;
