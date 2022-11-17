import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

//export default function Coverage_1_FF({ navigation }) {
export default class AboutWF extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Button 
          title="Close"
          onPress={() => this.props.navigation.navigate("HomeScreen")}/>
        <Button color="#000000"
          title="Football Field"
          onPress={() => this.props.navigation.navigate("ApiDisp")}
        />
        <Button
          title="Targets"
          onPress={() => this.props.navigation.navigate("Coverage_2_Targets")}
        />
        <Button
          title="Screens"
          onPress={() => this.props.navigation.navigate("Coverage_3_Screens")}
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
  current: {
    backgroundColor: '#000000'
  },
});