import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

//export default function Coverage_3_Companies({ navigation }) {
export default class Coverage_3_Companies extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Button
          title="Close"
          onPress={() => navigation.navigate("HomeScreen")}
        />
        <Button
          title="Football Field"
          onPress={() => navigation.navigate("Coverage_1_FF")}
        />
        <Button
          title="Targets"
          onPress={() => navigation.navigate("Coverage_2_Targets")}
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