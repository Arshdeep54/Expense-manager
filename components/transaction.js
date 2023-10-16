import { View, Text, StyleSheet } from "react-native";
import React from "react";
function transaction({ description, amount, datet, credited }) {
  return (
    <View
      style={
        credited
          ? {
              backgroundColor: "#1ba60c",
              marginBottom: 3,
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
            }
          : {
              backgroundColor: "#cf0300",
              marginBottom: 3,
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
            }
      }
    >
      <View style={styles.icard}>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>

      <View style={styles.jcard}>
        <Text style={styles.datet}>{datet}</Text>
      </View>
    </View>
  );
}

export default transaction;
const styles = StyleSheet.create({
  icard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jcard: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingRight: 9,
  },
  desc: {
    fontSize: 18,
    marginLeft: 5,
  },
  amount: {
    fontSize: 16,
    marginRight: 9,
  },
  datet: {
    fontStyle: "italic",
    right: 1,
  },
});
