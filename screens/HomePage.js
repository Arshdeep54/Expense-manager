import React from 'react';
import { Button } from 'react-native';
import { View, Text } from 'react-native-web';
import LoginPage from './LoginPage';
const HomePage=({navigation})=> {
    return (
       <View>
        <Button title='login in ' onPress={()=>{navigation.navigate("Login")}}></Button>
        <Text>hey homeie</Text>
       </View>
    );
}

export default HomePage;