import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput} from 'react-native';

// export default function Coverage_2_Valuations({ navigation }) {
export default class Coverage_2_Valuations extends Component {
  // const [text, setTarget] = React.useState("Enter Stock Ticker");
  render(){
    const [text, setTarget] = React.useState("Enter Stock Ticker");
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

      <Button color="#000000"
        title="Targets"
      />
      <Button
        title="Screens"
        onPress={() => navigation.navigate("Coverage_3_Screens")}
      /> 
      <Text>Enter Target:</Text>
      <TextInput 
        style={styles.input}
        placeholder='e.g. APPL'
        onChangeText={(val) => setTarget(val)}
      /> 
      <StatusBar style="auto" />
    </View>
    
    // <SafeAreaView style={styles.container}>
    //   <Text style={styles.text}>Page content</Text>
    // </SafeAreaView>

    );
  }
}

// const UselessTextInput = () => {
//   const [text, onChangeText] = React.useState("Useless Text");
//   const [number, onChangeNumber] = React.useState(null);

//   return (
//     <SafeAreaView>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeText}
//         value={text}
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeNumber}
//         value={number}
//         placeholder="useless placeholder"
//         keyboardType="numeric"
//       />
//     </SafeAreaView>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderColor: 1,
    padding: 10,
  },
});
