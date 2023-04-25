import { StyleSheet, StatusBar, Image } from 'react-native';
import Coverage from "./screens/Coverage";
import FootballField from "./screens/FootballField";
import Profile_About from "./screens/Profile_About";
import SignUpSignIn from "./screens/SignUpSignIn";
import SignUp from "./screens/SignUp";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { NetworkInfo } from "react-native-network-info";

//NetworkInfo.getIP4Address().then(ipv4Address =>  {
//    console.log(ipv4Address);
//  });

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000" barStyle="light-content"/> 
        <Stack.Navigator>
          <Stack.Screen
            name="SignUpSignIn"
            component={SignUpSignIn}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: "Sign Up",
              headerStyle: {
                backgroundColor: '#000'
              },
              headerTitleStyle: {
                color: 'white'
              }
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Home",
              headerStyle: {
                backgroundColor: '#000'
              },
              headerTitleStyle: {
                color: 'white'
              }
            }}
          />
          <Stack.Screen
            name="FootballField"
            component={FootballField}
            options={{
              headerTitle: (props) => ( 
                <Image
                  style={{ width: 200, height: 50 }}
                  source={require('./screens/logo_dark.png')}
                  resizeMode='contain'
                />
              ),
              headerTitleStyle: { 
                flex: 1, textAlign: 'center' 
              },
              headerStyle: {
                backgroundColor: '#000'
              },
            }}
          />
          <Stack.Screen
            name="Coverage"
            component={Coverage}
            options={{
              headerTitle: (props) => ( 
                <Image
                  style={{ width: 200, height: 50 }}
                  source={require('./screens/logo_dark.png')}
                  resizeMode='contain'
                />
              ),
              headerTitleStyle: { 
                flex: 1, textAlign: 'center' 
              },
              headerStyle: {
                backgroundColor: '#000'
              },
            }}
          />
          <Stack.Screen
            name="Profile_About"
            component={Profile_About}
            options={{
              headerTitle: (props) => ( 
                <Image
                  style={{ width: 200, height: 50 }}
                  source={require('./screens/logo_dark.png')}
                  resizeMode='contain'
                />
              ),
              headerTitleStyle: { 
                flex: 1, textAlign: 'center' 
              },
              headerStyle: {
                backgroundColor: '#000'
              },
            }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
