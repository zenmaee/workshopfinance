import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

//export default function Valuation({ navigation }) {
export default class Valuation extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Button
          title = "Return to Football Field"
          onPress={() => this.props.navigation.navigate('FootballField')}
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