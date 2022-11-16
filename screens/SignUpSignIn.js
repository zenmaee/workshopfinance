import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, Image, Button} from 'react-native';

const Separator = () => (
  <View style={styles.separator}/>
  );

// export default function SignUpSignIn({ navigation }) {
export default class SignUpSignIn extends Component{
  render() {
    return (
        <View style={styles.container}>
          <Image style={styles.logo} resizeMode="contain" source={require('./logo_dark.png')}/>
          <View style={styles.buttons}>
            <Button
              title="Sign In"
              color="#FFFFFF"
              onPress={() => navigation.navigate("SignIn")}
            />
          </View>
            <Separator/>
          <View style={styles.buttons}>
            <Button
              title="Sign Up"
              color="#FFFFFF"
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
          <StatusBar style="auto" /> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center'
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
  separator: {
    marginVertical: 5
  }
});