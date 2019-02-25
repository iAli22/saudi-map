/**
 * Made By iAli
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

// Screens
import LoginScreen from "./screen/LoginScreen";

class App extends React.Component {
  render() {
    return <AppStackNavigation />;
  }
}

const AppStackNavigation = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(AppStackNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
