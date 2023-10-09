import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { app, auth } from "../FireBase";
import Transaction from "../components/transaction"

const TransactionsScreen = ({navigation}) => {
 const [Transactions,setTransactions]=useState([]);
 // var id;
  const db = getFirestore(app);
  useEffect(() => {
    //code with await keyword here
    async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    querySnapshot.forEach((doc) => {
      if (doc.data().userId == auth.currentUser.uid) {
        const uTransactions=[
          ...Transactions,{
            desc:doc.data().description,
            amount:doc.data().amount,
            credited:doc.data().credited,
            date:doc.data().date,
          },
        ];
        setTransactions(uTransactions);

      
    }
    });
  };
  fetchData();
}, []);
console.log(Transactions);
  return (
    <View>
      <Text>Transaction History</Text>
      <Transaction desc={"this is desc"} amount={300} datet={"03/09/2023"}/>
      <Transaction desc={"this is desc 2"} amount={400} datet={"04/09/2023"}/>
    </View>
  )
};

export default TransactionsScreen;

const styles = StyleSheet.create({});