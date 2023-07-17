import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app, auth } from "../FireBase";

const CreditScreen = ({ navigation }) => {
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const db = getFirestore(app);
  const creditmoney = async() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    console.log(
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
      amount,
      desc
    );
    
    try {
        const docRef = await addDoc(collection(db, "transactions"), {
          userId:auth.currentUser.uid,
          description:desc,
          amount:amount,
          credited:true,
          date: date + "/" + month + "/" + year,
          actionTime: hours + ":" + min + ":" + sec,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        alert("Error adding document: ", e);
      }
    
  };
  return (
    <KeyboardAvoidingView>
      <View>
        <TextInput
          placeholder="description"
          value={desc}
          onChangeText={(text) => setDesc(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={(num) => {
            setAmount(num);
          }}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={creditmoney}>
          <Text>Credit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreditScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
});
