import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeViewAndroid from "../components/SafeViewAndroid";

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app, auth } from "../FireBase";
const HomePage = ({ navigation }) => {
  // const auth = getAuth(app);
  const [username, setUserName] = useState("");
  const db = getFirestore(app);
  useEffect(() => {
    //code with await keyword here
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().userId == auth.currentUser.uid) {
          console.log(doc.data().name);
          setUserName(doc.data().name);
        }
      });
    }
    fetchData();
  }, []);
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("user signed out");
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  console.log(username);
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View>
        <View
          style={{
            padding: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#1D2D44",
          }}
        >
          {/* <Text>{auth.currentUser.displayName}</Text> */}
          <Text
            style={{
              alignSelf: "center",
              marginLeft: 5,
              fontSize: 16,
              color: "#F0EBD8",
            }}
          >
            {username}
          </Text>
          <Pressable style={styles.btn} onPress={logOut}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                color: "#F0EBD8",
              }}
            >
              Log out
            </Text>
          </Pressable>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.cards}
            onPress={() => navigation.navigate("credit")}
          >
            <Text
              style={{
                alignSelf: "center",
                marginLeft: 4,
                fontSize: 20,
                color: "#F0EBD8",
              }}
            >
              Credit money
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cards}
            onPress={() => navigation.navigate("debit")}
          >
            <Text
              style={{
                alignSelf: "center",
                marginLeft: 4,
                fontSize: 20,
                color: "#F0EBD8",
              }}
            >
              Debit money
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Txtcont}>
          <TouchableOpacity
            style={styles.FullLineText}
            onPress={() => navigation.navigate("balance")}
          >
            <Text
              style={{
                alignSelf: "center",
                marginLeft: 5,
                fontSize: 16,
                color: "#F0EBD8",
              }}
            >
              Check you balance
            </Text>
            <Text
              style={{
                alignSelf: "center",
                marginLeft: 5,
                fontSize: 16,
                color: "#F0EBD8",
              }}
            >
              {" "}
              {">"}{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.FullLineText}
            onPress={() => navigation.navigate("transactions")}
          >
            <Text
              style={{
                alignSelf: "center",
                marginLeft: 5,
                fontSize: 16,
                color: "#F0EBD8",
              }}
            >
              Transaction History
            </Text>
            <Text
              style={{
                alignSelf: "center",
                marginLeft: 5,
                fontSize: 16,
                color: "#F0EBD8",
              }}
            >
              {" "}
              {">"}{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#0D1321",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    color: "#F0EBD8",
  },
  cards: {
    marginTop: 15,
    backgroundColor: "#1D2D44",
    borderRadius: 15,
    padding: 12,
    width: "40%",
    height: 150,
  },
  FullLineText: {
    marginTop: 9,
    padding: 5,
    backgroundColor: "#1D2D44",
    borderRadius: 5,
    // borderColor:'1D2D44'
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 7.5,
  },
  Txtcont: {
    width: "100%",
    marginTop: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
