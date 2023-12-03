import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SafeViewAndroid from "../components/SafeViewAndroid";

import React, { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { app, auth } from "../FireBase";

const CreditScreen = ({ navigation }) => {
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const db = getFirestore(app);
  var id;
  var balance = 0;

  const creditmoney = async () => {
    console.log(Timestamp.now().toDate());
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        userId: auth.currentUser.uid,
        description: desc,
        amount: Number(amount),
        credited: true,
        date: Timestamp.now().toDate().toString(),
      });

      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().userId == auth.currentUser.uid) {
          balance = doc.data().balance;
          id = doc.id;
        }
      });

      const currDocRef = doc(db, "users", id);
      // Set the "capital" field of the city 'DC'
      await updateDoc(currDocRef, {
        balance: Number(Number(balance) + Number(amount)),
      });

      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
    } catch (e) {
      alert("Error adding document: ", e);
    }
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
          placeholder="Write Description"
          value={desc}
          onChangeText={(text) => setDesc(text)}
          underlineColorAndroid="#1D2D44"
          style={styles.input}
        />

        <TextInput
          placeholder="Enter amount"
          value={amount}
          underlineColorAndroid="#1D2D44"
          keyboardType="numeric"
          onChangeText={(num) => {
            setAmount(num);
          }}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={creditmoney}>
          <Text
            style={{
              fontSize: 16,
              color: "#F0EBD8",
            }}
          >
            Credit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreditScreen;

const styles = StyleSheet.create({
  input: {
    // backgroundColor: "#3E5C76",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    color: "#F0EBD8",
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
