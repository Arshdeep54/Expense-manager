import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import SafeViewAndroid from "../components/SafeViewAndroid";
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
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      if (doc.data().userId == auth.currentUser.uid) {
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
  if (Transactions) {
    return (
      <SafeAreaView
        style={{
          ...SafeViewAndroid.AndroidSafeArea,
          display: "flex",
          flexDirection: "column",
          paddingTop: 2,
        }}
      >
        <View style={{ width: "100%" }}>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 7,
              fontSize: 20,
              fontWeight: 600,
              color: "#F0EBD8",
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
      </SafeAreaView>
    );
  } else {
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
              fontSize: 18,
              alignSelf: "center",
              margin: 3,
              fontWeight: 500,
            }}
          >
            Transaction History
          </Text>
          <Text>No Transactions found</Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default TransactionsScreen;

const styles = StyleSheet.create({});
