import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';

/*const PlaceholderText = () => {
  const [username, onChangeText] = React.useState("Username");
*/

// export default function SignIn({ navigation }) {
export default class SignIn extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} resizeMode="contain" source={require('./logo_dark.png')}/>
        {/* <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        value={username}
        /> */}
        <View style={styles.buttons}>
          <Button  
            title="Sign In"
            color="#FFFFFF"
            onPress={() => navigation.navigate("HomeScreen")}
          />
        </View>
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  buttons: {
    top: 250,
    padding: 5,
    width: 100,
    textAlign:'center',
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
  },
  logo: {
    top: 100,
    height: 100,
    width: 350
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    marginVertical: 5
  }
});