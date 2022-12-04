import { StyleSheet, StatusBar, Text, View } from 'react-native';
import Coverage from "./screens/Coverage";
import FootballField from "./screens/FootballField";
import Profile_About from "./screens/Profile_About";
import SignUpSignIn from "./screens/SignUpSignIn";
import SignUp from "./screens/SignUp";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={false}/> 
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
                backgroundColor: 'white'
              }
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Home"
            }}
          />
          <Stack.Screen
            name="FootballField"
            component={FootballField}
            options={{
              title: "Football Field"
            }}
          />
          <Stack.Screen
            name="Coverage"
            component={Coverage}
            options={{}}
          />
          <Stack.Screen
            name="Profile_About"
            component={Profile_About}
            options={{}}
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
