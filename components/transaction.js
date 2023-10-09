import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
function transaction({desc,amount,datet}) {
  return (
    <View style={styles.card}>
        <View style={styles.icard}>
        <Text style={styles.desc} >{desc}</Text>
      <Text style={styles.amount} >{amount}</Text>
        </View>
      
      <View style={styles.jcard}>
      <Text style={styles.datet} >{datet}</Text>
      </View>
      

      
      </View>
  )
}

export default transaction;
const styles = StyleSheet.create({
    card:{
        backgroundColor:'#fffdd0',
        marginBottom:3,
        marginTop:3,
        display:'flex',
        flexDirection:'column',
    },
    icard:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    jcard:{
        display:'flex',
        flexDirection:'row-reverse',
        paddingRight:9,
    },
    desc:{
       fontSize:18,
       marginLeft:2,
    },
    amount:{
        fontSize:16,
        marginRight:9,
    },
    datet:{
        fontStyle:"italic",
        right:1,
    },
})