import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import HomePage from "./screens/HomePage";
import CreditScreen from "./screens/CreditScreen";
import DebitScreen from "./screens/DebitScreen";
import BalanceScreen from "./screens/BalanceScreen";
import TransactionsScreen from "./screens/TransactionsScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#1D2D44",
            color: "#F0EBD8",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false, title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{
            headerStyle: {
              backgroundColor: "#1D2D44",
            },
            headerTitleStyle: {
              color: "#F0EBD8",
            },
            headerTintColor: "#F0EBD8",
          }}
        />
        <Stack.Screen
          name="home"
          component={HomePage}
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="credit"
          component={CreditScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1D2D44",
            },
            headerTitleStyle: {
              color: "#F0EBD8",
            },
            headerTintColor: "#F0EBD8",
          }}
        />
        <Stack.Screen
          name="debit"
          component={DebitScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1D2D44",
            },
            headerTitleStyle: {
              color: "#F0EBD8",
            },
            headerTintColor: "#F0EBD8",
          }}
        />
        <Stack.Screen
          name="balance"
          component={BalanceScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1D2D44",
            },
            headerTitleStyle: {
              color: "#F0EBD8",
            },
            headerTintColor: "#F0EBD8",
          }}
        />
        <Stack.Screen
          name="transactions"
          component={TransactionsScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1D2D44",
            },
            headerTitleStyle: {
              color: "#F0EBD8",
            },
            headerTintColor: "#F0EBD8",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
