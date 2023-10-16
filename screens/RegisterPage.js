import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <KeyboardAvoidingView>
      <View>
        <TextInput
          placeholder="Name"
          value={name.toString()}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email.toString()}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Enter balance"
          value={Number(balance)}
          keyboardType="numeric"
          onChangeText={(num) => {
            setBalance(num);
          }}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={RegisterUser}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
