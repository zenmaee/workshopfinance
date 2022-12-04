import React from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import InputTextField from '../components/InputTextField';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
          <Image style={styles.wfLogo} resizeMode="contain" source={require('./logo_dark.png')}/>

          <TouchableOpacity style={styles.buttons_1} onPress={() => navigation.navigate('FootballField')}>
              <Text style={styles.buttonText_1}>Draw Football Field</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttons_2} onPress={() => navigation.navigate('Coverage')}>
              <Text style={styles.buttonText_2}>Open Coverage List</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttons_2} onPress={() => navigation.navigate('Profile_About')}>
              <Text style={styles.buttonText_2}>User Profile</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: "center"
    },
    buttons_1: {
        fontSize: 16,
        width: 200,
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
    buttons_2: {
        fontSize: 16,
        width: 200,
        borderRadius: 4, 
        marginTop: 10, 
        paddingVertical: 7,
        paddingHorizontal: 20,
        alignItems: "center", 
        backgroundColor:'#FFF',
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
    buttonText_1: {
        fontFamily: "Avenir Next", 
        color: "#FFF"
    },
    buttonText_2: {
        fontFamily: "Avenir Next", 
        color: "#000"
    }
  });