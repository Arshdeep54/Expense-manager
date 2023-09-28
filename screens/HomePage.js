import React from "react";
import { Button, Pressable, StyleSheet, Text,TouchableOpacity, View } from "react-native";

import LoginPage from "./LoginPage";
import { getAuth } from "firebase/auth";
import { app ,auth} from "../FireBase";
const HomePage = ({ navigation }) => {


  // const auth = getAuth(app);
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

console.log(auth.currentUser.displayName);
  return (
    <>
    <View>
      <View>
        {/* <Text>{auth.currentUser.displayName}</Text> */}
        <Pressable style={styles.btn} onPress={logOut}>
          <Text>Log out</Text>
        </Pressable>
      </View>
<View style={styles.cardContainer}>
<TouchableOpacity style={styles.cards} onPress={()=> navigation.navigate("credit") }>
        <Text>add money</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cards} onPress={()=> navigation.navigate("debit")}>
    <Text>debit money</Text>
    </TouchableOpacity>
</View>
   
    </View>
    </>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  cards:{
    marginTop: 15,
    backgroundColor:'grey',
    borderRadius:15,
    width:'40%',
    height:150,
  },
  cardContainer:{
    flexDirection:"row",
    justifyContent:"space-evenly",
  },
});
