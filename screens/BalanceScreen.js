import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { app, auth } from "../FireBase";
import SafeViewAndroid from "../components/SafeViewAndroid";
// import { SafeAreaView } from "react-native-safe-area-context";
//import { KeyboardAvoidingView } from 'react-native-web';

const BalanceScreen = ({ navigation }) => {
  const [balance, setBalance] = useState("Loading..");
  var id;
  const db = getFirestore(app);
  useEffect(() => {
    //code with await keyword here
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().userId == auth.currentUser.uid) {
          setBalance(doc.data().balance);
          console.log(doc.data().balance);
          id = doc.id;
        }
      });
    }
    fetchData();
  }, []);
  //const [balance,setBalance]=useState(' ');

  //console.log(`${doc.id} => ${doc.data().balance}`);

  console.log(balance);
  return (
    // <KeyboardAvoidingView style={{ backgroundColor: "#3E5C76" }}>
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View
        style={{
          marginTop: 15,
          marginLeft: 45,
          backgroundColor: "#1D2D44",
          borderRadius: 15,
          padding: 10,
          width: "75%",
          height: 75,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#F0EBD8",
          }}
        >
          Balance
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#F0EBD8",
          }}
        >
          ₹{balance}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default BalanceScreen;

//const styles = StyleSheet.create({})
