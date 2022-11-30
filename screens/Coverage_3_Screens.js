import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

//export default function Coverage_3_Companies({ navigation }) {
export default class Coverage_3_Companies extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Button
          title="Close"
          onPress={() => this.props.navigation.navigate("HomeScreen")}
        />
        <Button
          title="Football Field"
          onPress={() => this.props.navigation.navigate("Coverage_1_FF")}
        />
        <Button
          title="Targets"
          onPress={() => this.props.navigation.navigate("Coverage_2_Targets")}
        />
        <Button color="#000000"
          title="Screens"
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});