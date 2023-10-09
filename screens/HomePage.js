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

//console.log(auth.currentUser.displayName);
  return (
    <>
    <View>
      <View>
        {/* <Text>{auth.currentUser.displayName}</Text> */}
        <Text>Home</Text>
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
</View >
<View style={styles.Txtcont}>
   <TouchableOpacity style={styles.FullLineText} onPress={()=> navigation.navigate("balance")}>
    <Text>Check you balance</Text>
    <Text> {">"} </Text>
   </TouchableOpacity>
   <TouchableOpacity style={styles.FullLineText} onPress={()=> navigation.navigate("transactions")}>
    <Text>Transaction History</Text>
    <Text> {">"} </Text>
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
    padding:12,
    width:'40%',
    height:150,
  },
  FullLineText :{
    marginTop: 9,
    padding:5,
    backgroundColor:'white',
    borderRadius:5,
    width:'85%',
    flexDirection:"row",
    justifyContent:"space-between",
    height:35,
  },
  cardContainer:{
    width:'100%',
    flexDirection:"row",
    justifyContent:"space-evenly",
    marginBottom:7.5,
  },
  Txtcont:{
    width:'100%',
    marginTop:15,
    justifyContent:"space-evenly",
    alignItems:"center",
  },
});
