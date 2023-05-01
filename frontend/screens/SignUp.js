import React, {useState} from 'react';
import { StyleSheet, Image, Text, View, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
//import { NetworkInfo } from "react-native-network-info";

//NetworkInfo.getIP4Address().then(ipv4Address =>  {
//    console.log(ipv4Address);
//  });

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName]=useState("")
  const [lastName, setLastName]=useState("")
  const [email, setEmail]=useState("")
  const [checkValidEmail, setCheckValidEmail]=useState(false)
  const [password, setPassword]=useState("")
  const [seePassword, setSeePassword] = useState(true);
  const [confirmPassword, setConfirmPassword]=useState("")
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(true);

  //const [seePassword, setSeePassword] = useState(true);

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }
    if(value != confirmPassword){
      return 'Passwords must match.';
    }

    return null;
  };

  const addUsers = () => {
    fetch('http://10.239.248.166:5000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email.toLocaleLowerCase(),
        password: password
      })
    })
      .then(resp => resp.text())
      .then(resp => {
        console.log(resp);
        if (resp==="Email Exists"){
          alert("Email already exists");
        }
        else if (resp === "Successful USERDATA POST") {
          navigation.navigate('SignUpSignIn');
        }
      })
  };

  const handleLogin = () => {
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
      addUsers()
      /*
        .then(result => {
          if (result.status == 200) {
            //addUsers();
            //AsyncStorage.setItem('AccessToken', result.data.token);
            //navigation.replace('Home');
          }
        })
      
        .catch(err => {
          console.error(err);
        });*/
    } else {
      alert(checkPassword);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <View>
        <Image style={styles.wfLogo} resizeMode="contain" source={require('./logo_dark.png')}/>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={{flex:2, width:"100%", marginTop: 25, marginBottom: 10 }}>
            <Text style={styles.inputTitle}>First Name</Text>
            <TextInput
              //secureTextEntry={this.isSecure}
              style={styles.input}
              value={firstName}
              onChangeText = {text=>setFirstName(text)} 
              keyboardType="default"
              autoCapitalize="none"
              // placeholder="Enter first name here"
              // placeholderTextColor={styles.placeholderTextColorStyle}
              />
            <View style={{ width: 250, borderBottomWidth: 1, borderBottomColor: "#FFF"}}></View>
          </View>

          <View style={{flex:2, width:"100%", marginTop: 5, marginBottom: 10 }} >
            <Text style={styles.inputTitle}>Last Name</Text>
            <TextInput
              //secureTextEntry={this.isSecure}
              style={styles.input}
              value={lastName}
              onChangeText = {text=>setLastName(text)} 
              keyboardType="default"
              autoCapitalize="none"
              // placeholder="Enter last name here"
              // placeholderTextColor={styles.placeholderTextColorStyle}
              />
            <View style={{flex:2, width:"90%", borderBottomWidth: 1, borderBottomColor: "#FFF"}}></View>
          </View>

          <View style={{flex:2, width:"100%", marginTop: 5 }} >
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              //secureTextEntry={this.isSecure}
              style={styles.input}
              value={email}
              onChangeText={text => handleCheckEmail(text)}
              //onChangeText = {text=>setEmail(text)} 
              keyboardType="default"
              autoCapitalize="none"
              // placeholder="Enter email address here"
              // placeholderTextColor={styles.placeholderTextColorStyle}
              />
            <View style={{flex:2, width:"90%", borderBottomWidth: 1, borderBottomColor: "#FFF"}}></View>
          </View>
          {checkValidEmail ? (
            <Text style={styles.textFailed}>Wrong format email</Text>
            ) : (
            <Text style={styles.textFailed}> </Text>
          )}

          <View style={{flex:2, width:"100%", marginTop: 5, marginBottom: 10 }}>
          <Text style={styles.inputTitle}>Enter password</Text>
              <TextInput
                //placeholder={this.placeholder}
                //secureTextEntry={this.isSecure}
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
                <Image source={seePassword ? require('./Eye.png') : require('./EyeActive.png')} style={styles.icon} />
              </TouchableOpacity>
            <View style={{flex:2, width:"90%", borderBottomWidth: 1, borderBottomColor: "#FFF"}}></View>
          </View>

          <View style={{flex:2, width:"100%", marginTop: 5, marginBottom: 10 }} >
          <Text style={styles.inputTitle}>Confirm password</Text>
              <TextInput
                //placeholder={this.placeholder}
                //secureTextEntry={this.isSecure}
                style={styles.input}
                autoCapitalize = "none"
                value={confirmPassword}
                secureTextEntry={seeConfirmPassword}
                onChangeText = {text=>setConfirmPassword(text)} 
                keyboardType="default"
              ></TextInput>
              <TouchableOpacity
                style={styles.wrapperIcon}
                onPress={() => setSeeConfirmPassword(!seeConfirmPassword)}>
                <Image source={seeConfirmPassword ? require('./Eye.png') : require('./EyeActive.png')} style={styles.icon} />
              </TouchableOpacity>
            <View style={{ width: "95%", borderBottomWidth: 1, borderBottomColor: "#FFF"}}></View>
          </View>

        {/*
        <TouchableOpacity style={styles.buttons} onPress={() => addUsers()}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        */}

        {email == '' || password == '' || checkValidEmail == true ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={handleLogin}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        ) : (
        <TouchableOpacity style={styles.buttons} onPress={handleLogin}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
console.log()
export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: "center"
  },
  buttons: {
      flex: 1,
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
  buttonDisable: {
    flex: 1,
    fontSize: 16,
    borderRadius: 4, 
    marginTop: 30, 
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignItems: "center", 
    backgroundColor:'grey',
    justifyContent: "center",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5
  },
  wfLogo: {
    flex: 1,
    top: "3%",//55,
    //height: 100,
    width: "100%", //350
    aspectRatio: 5/1
  },
  logo: {
    height: 18,
    width: 20,
    marginRight: 8
  },
  buttonText: {
      fontFamily: "Avenir Next", 
      color: "#FFF"
  },

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
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
  wrapperIcon: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  icon: {
    tintColor: 'white',
    width: 30,
    height: 24,
  }
});
