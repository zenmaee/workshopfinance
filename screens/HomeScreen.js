import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

// const HomeScreen = () => {
//   return(
//     <SafeAreaView>
//       <Button  
//         title="Draw Football Field"
//         onPress={() => navigation.navigate("FootballField")}
//       />
//       <Button  
//         title="Coverage"
//         onPress={() => navigation.navigate("Coverage_1_FF")}
//       />
//       <StatusBar style="auto" /> 
//     </SafeAreaView>
//   )
// }

//export default function HomeScreen({ navigation }) {
export default class HomeScreen extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Button  
          title="Draw Football Field"
          onPress={() => this.props.navigation.navigate("FootballField")}
        />
        <Button  
          title="Coverage"
          onPress={() => this.props.navigation.navigate("Coverage_1_FF")}
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