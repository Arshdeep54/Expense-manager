import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  var balance=0;

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
     if(doc.data().userId==auth.currentUser.uid){
      balance=doc.data().balance;
      id=doc.id;
     }

        console.log(`${doc.id} => ${doc.data().balance}`);
      });

     

      const currDocRef = doc(db, "users",id);
      // Set the "capital" field of the city 'DC'
      await updateDoc(currDocRef, {
        
        balance:Number(Number(balance)+Number(amount)),
      });


      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
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
