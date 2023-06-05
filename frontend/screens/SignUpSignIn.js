import React, {useState} from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import InputTextField from '../components/InputTextField';


const SignUpSignIn = ({ navigation }) => {
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [seePassword, setSeePassword] = useState(true);
  
  function retrieveTargets(resp) {
    console.log(resp)
    console.log(typeof resp)

    console.log("resp")
    console.log(resp)
    const userId=resp.emailHash
    const userName=resp.name
    const userEmail=resp.email

    const url = 'http://192.168.1.158:5000/targets/'+userId+'/'
    console.log(url)
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigation.navigate('HomeScreen', {
          userName: userName,
          userEmail: userEmail,
          userId: userId,
          targets: data,
        })
        return data})
        
      .catch((error) => {
        console.error("Error fetching data:", error);
        return [];
        });}
  
  
        function signIn() {

          console.log("email")
          console.log(email)
          const url = 'http://192.168.1.158:5000/users/'+email
          return fetch(url, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              password:password})} //ADD SECURITY. I DONT LIKE TO SEND PASSWORD TO LOCAL HOST
            )
            
            .then(resp => resp.json())
            .then(json => {
              if (json.error === "Incorrect Password") {
                console.log(json.error); //PRITHIKA CHECKING
                alert("Incorrect Password");

              }
              else if (json.error === "User Does Not Exist"){
                console.log(json.error); //PRITHIKA CHECKING
                alert("User Does Not Exist");
              }
              else {
                retrieveTargets(json); // Pass the JSON response to the retrieveTargets function
                return json; // Return the JSON response from the Promise chain
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              return [];
            });

        }

  return (
    <SafeAreaView style={styles.container}>
          <Image style={styles.wfLogo} resizeMode="contain" source={require('./logo_dark.png')}/>

          {/* <View>
              <TouchableOpacity>
                  <View style={styles.socialButton}>
                    <Image style={styles.logo} source={require('./google_logo.jpeg')}/>
                    <Text style={styles.buttonText}>Google</Text>
                  </View>
              </TouchableOpacity>
          </View>
          <Text style={[styles.buttonText, { textAlign: "center", marginVertical: 10 }]}>or</Text> */}

          <View style={{ marginTop: 150 }}>
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText = {text=>setEmail(text)}
                //clearButtonMode='always'
                autoCapitalize='none' 
                keyboardType="default"
                ></TextInput>
              <View style={{ width: 250, borderBottomWidth: 1, borderBottomColor: "#FFF"}}></View>
          </View> 

          <View style={{ marginTop: 15}}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize = "none"
                value={password}
                secureTextEntry={seePassword}
                onChangeText = {text=>setPassword(text)} 
                keyboardType="default"
              ></TextInput>
              <TouchableOpacity
                style={styles.wrapperIcon}
                onPress={() => setSeePassword(!seePassword)}>
                <Image 
                  source={seePassword ? require('./Eye.png') : require('./EyeActive.png')} style={styles.icon} />
              </TouchableOpacity>
              <View style={{ width: 250, borderBottomWidth: 1, borderBottomColor: "#FFF"}}></View>
          </View> 

          {/* <TouchableOpacity>
            <Text style={[sty+les.buttonText, { marginTop: 5, fontWeight: "600" }]}>Forgot Password?</Text>
          </TouchableOpacity> */}
          
          
          <TouchableOpacity style={styles.buttons} onPress={() => signIn()}>
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
  inputTitle: {
    color: "#FFF", 
    fontSize: 14
    },
    input: {
        paddingVertical: 12,
        color: "#FFF", 
        fontSize: 14, 
        fontFamily: "Avenir Next"
    },
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
    wrapperIcon: {
      height: 10,
      position: 'absolute',
      right: 0,
      padding: 10,
    },
    icon: {
      tintColor: 'white',
      width: 30,
      height: 24,
    },
    buttonText: {
        fontFamily: "Avenir Next", 
        color: "#FFF"
    }
  });