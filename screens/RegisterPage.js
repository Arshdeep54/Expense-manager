import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import SafeViewAndroid from "../components/SafeViewAndroid";

import { TextInput } from "react-native-gesture-handler";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app, auth } from "../FireBase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
export default function RegisterPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "back To Login",
    });
  }, [navigation]);

  const RegisterUser = () => {
    // const auth = getAuth(app);
    const db = getFirestore(app);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (authUser) => {
        console.log(authUser);

        try {
          const docRef = await addDoc(collection(db, "users"), {
            userId: authUser.user.uid,
            name: name,
            balance: Number(balance),
            email: email,
          });
          console.log("Document written with ID: ", docRef.id);
          navigation.navigate("Login");
        } catch (e) {
          alert("Error adding document: ", e.message);
        }
        auth.currentUser.displayName = name;
        console.log(auth.currentUser.displayName);
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
      {/* <View>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 40,
            fontSize: 24,
            fontWeight: 600,
            color: "#1D2D44",
          }}
        >
          Register
        </Text>
      </View> */}
      <View
        style={{
          margin: "auto",
          width: "60%",
          height: 325,
          backgroundColor: "#5D7798",
          borderRadius: 7,
          padding: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TextInput
          underlineColorAndroid="#1D2D44"
          placeholder="Name"
          value={name.toString()}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          underlineColorAndroid="#1D2D44"
          placeholder="Email"
          value={email.toString()}
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
        <TextInput
          placeholder="Enter balance"
          underlineColorAndroid="#1D2D44"
          value={Number(balance)}
          keyboardType="numeric"
          onChangeText={(num) => {
            setBalance(num);
          }}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={RegisterUser}>
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
}
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
