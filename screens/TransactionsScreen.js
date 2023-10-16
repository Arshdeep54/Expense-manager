import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getFirestore, getDocs, query } from "firebase/firestore";
import { app, auth } from "../FireBase";
import Transaction from "../components/transaction";
import { ActivityIndicator } from "react-native";

const TransactionsScreen = ({ navigation }) => {
  const [Transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  // var id;
  const db = getFirestore(app);
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      if (doc.data().userId == auth.currentUser.uid) {
        // console.log(doc.data());
        Transactions.push(doc.data());
      }
    });
    setTransactions(Transactions);
    setLoading(false);
  };
  useEffect(() => {
    //code with await keyword here

    fetchData();

    console.log(Transactions);
  }, []);

  console.log(Transactions);

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderItem = ({ item }) => {
    return (
      <Transaction
        description={item.description}
        amount={item.amount}
        datet={item.date}
        credited={item.credited}
      />
    );
  };

  return (
    <View>
      <Text
        style={{
          fontSize: "18",
          alignSelf: "center",
          margin: "3",
          fontWeight: "500",
        }}
      >
        Transaction History
      </Text>
      <FlatList
        data={Transactions}
        extraData={Transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
      />
    </View>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({});
