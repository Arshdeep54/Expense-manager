import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getFirestore, getDocs, query } from "firebase/firestore";
import { app, auth } from "../FireBase";
import Transaction from "../components/transaction";

const TransactionsScreen = ({ navigation }) => {
  const [Transactions, setTransactions] = useState([
    {
      description: "descption",
      amount: 90,
      date: " kjn ",
      credited: false,
    },
  ]);
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
  };
  useEffect(() => {
    //code with await keyword here

    fetchData();
    console.log(Transactions);
  }, []);
  console.log(Transactions);

  return (
    <View>
      <Text>Transaction History</Text>
      <Text>Loading</Text>

      {Transactions.forEach((trans) => {
        <Transaction
          description={trans.desciption}
          amount={trans.amount}
          date={trans.date}
          credited={trans.credited}
        />;
      })}
      {/* {Transactions?.forEach((trans) => {
         <Transaction
           desc={trans.desciption}
           amount={trans.amount}
           datet={trans.date}
           credited={trans.credited}
         />;
       })}
       <Text>Loading</Text> */}
    </View>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({});
