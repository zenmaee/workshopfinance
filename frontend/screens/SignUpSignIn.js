import React from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import InputTextField from '../components/InputTextField';

const SignUpSignIn = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
          <Image style={styles.wfLogo} resizeMode="contain" source={require('./logo_dark.png')}/>

          <View>
              <TouchableOpacity>
                  <View style={styles.socialButton}>
                    <Image style={styles.logo} source={require('./google_logo.jpeg')}/>
                    <Text style={styles.buttonText}>Google</Text>
                  </View>
              </TouchableOpacity>
          </View>

          <Text style={[styles.buttonText, { textAlign: "center", marginVertical: 20 }]}>or</Text>

          <InputTextField 
            title="Email"
            placeholder="Enter your email"
            // value={userid}
            ></InputTextField> 
          <InputTextField 
            style={{ marginTop: 10, marginBottom: 10}}
            placeholder="Enter your password" 
            title="Password"
            // value={password}
            isSecure={true}
          ></InputTextField>

          <TouchableOpacity>
            <Text style={[styles.buttonText, { marginLeft: 130, fontWeight: "600" }]}>Forgot Password?</Text>
          </TouchableOpacity>
          
          
          <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('FootballField')}>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <View style={{ marginTop: 10 }}>
            <Text style={styles.buttonText}>
                Don't have an account?   
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.buttonText, { fontWeight: "600", marginTop: 15 }]}> Register Now</Text>
                </TouchableOpacity>
            </Text>
          </View> 
    </SafeAreaView>
  );
}

export default SignUpSignIn;

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
      top: 100,
      height: 100,
      width: 350
    },
    logo: {
      height: 18,
      width: 20,
      marginRight: 8
    },
    socialButton: {
        marginTop: 150, 
        flexDirection: "row",
        marginHorizontal: 12,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderWidth: StyleSheet.hairlineWidth, 
        borderColor: "#FFF", 
        borderRadius: 4,
        backgroundColor: "#000",
        shadowColor: "rgba(171, 180, 189, 0.35)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    buttonText: {
        fontFamily: "Avenir Next", 
        color: "#FFF"
    }
  });
