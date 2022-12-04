import React from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import InputTextField from '../components/InputTextField';

const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
          <Image style={styles.wfLogo} resizeMode="contain" source={require('./logo_dark.png')}/>

          <InputTextField 
            style={{ marginTop: 10}}
            title="First Name"
            ></InputTextField> 
          <InputTextField 
            style={{ marginTop: 10, marginBottom: 10}} 
            title="Last Name"
          ></InputTextField>
          <InputTextField 
            title="Email Address"
            style={{ marginTop: 10, marginBottom: 10}}
            // value={userid}
            ></InputTextField> 
          <InputTextField 
            style={{ marginTop: 10, marginBottom: 10}} 
            title="Enter Password"
            // value={password}
            isSecure={true}
          ></InputTextField>
          <InputTextField 
            style={{ marginTop: 10, marginBottom: 10}} 
            title="Confirm Password"
            // value={password}
            isSecure={true}
          ></InputTextField>

          <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: "center"
    },
    buttons: {
        fontSize: 16,
        borderRadius: 4, 
        marginTop: 30, 
        paddingVertical: 7,
        paddingHorizontal: 20,
        alignItems: "center", 
        backgroundColor:'#68a0cf',
        justifyContent: "center",
        shadowColor: "rgba(171, 180, 189, 0.35)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    wfLogo: {
      marginTop: 100,
      height: 100,
      width: 350
    },
    logo: {
      height: 18,
      width: 20,
      marginRight: 8
    },
    buttonText: {
        fontFamily: "Avenir Next", 
        color: "#FFF"
    }
  });