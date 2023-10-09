import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { app, auth } from "../FireBase";
//import { KeyboardAvoidingView } from 'react-native-web';

const BalanceScreen = ({navigation}) => {
 const [balance,setBalance]=useState("Loading..");
  var id;
  const db = getFirestore(app);
  useEffect(() => {
    //code with await keyword here
    async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().userId == auth.currentUser.uid) {
        setBalance((doc.data().balance));
        console.log(doc.data().balance);
        id = doc.id;
      }
    });
  };
  fetchData();
  }, []);
  //const [balance,setBalance]=useState(' ');

  //console.log(`${doc.id} => ${doc.data().balance}`);

  console.log(balance);
  return (
    <KeyboardAvoidingView>
      <View>
        <Text>Balance</Text>
        <Text>{balance}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BalanceScreen;

//const styles = StyleSheet.create({})
