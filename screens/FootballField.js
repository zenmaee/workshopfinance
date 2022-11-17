import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

// export default function FootballField({ navigation }) {
export default class FootballField extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Button
          title="Close"
          onPress={() => this.props.navigation.pop()}
        />
        <Button
          title="Add Valuation"
          onPress={() => this.props.navigation.push("Valuation")}
        />
        <Button
          title="Valuation Bar (Placeholder)"
          onPress={() => this.props.navigation.push("Valuation")}
        />
        <Button
          title="Favorites"
          onPress={() => this.props.navigation.navigate("Coverage_2_Valuations")}
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