import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button} from 'react-native';

//export default function Valuation({ navigation }) {
export default class Valuation extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Button
          title = "Return to Football Field"
          onPress={() => navigation.pop()}
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