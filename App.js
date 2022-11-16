import * as React from 'react';
import SignUpSignIn from "./screens/SignUpSignIn";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import HomeScreen from "./screens/HomeScreen";
import FootballField from "./screens/FootballField";
import Valuation from "./screens/Valuation";
import Coverage_1_FF from "./screens/Coverage_1_FF";
import Coverage_2_Targets from "./screens/Coverage_2_Targets";
import Coverage_3_Screens from "./screens/Coverage_3_Screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, View, Button} from 'react-native';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  SignUpSignIn: {
    screen: SignUpSignIn
  },
  SignUp: {
    screen: SignUp
  },
  SignIn: {
    screen: SignIn
  },
  HomeScreen: {
    screen: HomeScreen
  },
  FootballField: {
    screen: FootballField
  },
  Valuation: {
    screen: Valuation
  },
  Coverage_1_FF: {
    screen: Coverage_1_FF
  },
  Coverage_2_Targets: {
    screen: Coverage_2_Targets
  },
  Coverage_3_Screens: {
    screen: Coverage_3_Screens
  },
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="SignUpSignIn"
//           component={SignUpSignIn}
//           options={{
//             headerStyle: {},
//             headerBackTitle: "Back",
//           }}
//         />
//         <Stack.Screen
//           name="SignUp"
//           component={SignUp}
//           options={{
//             title: "Sign Up",
//             headerBackTitle: "Back",
//           }}
//         />
//         <Stack.Screen
//           name="SignIn"
//           component={SignIn}
//           options={{
//             title: "Sign In",
//             headerBackTitle: "Back",
//           }}
//         />
//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={({ navigation, route }) => ({
//             headerRight: () => (
//               <Button title="Siderbar"/>
//             ),
//           })}
//         />
//         <Stack.Screen
//           name="FootballField"
//           component={FootballField}
//           options={{
//             headerBackTitle: "Back",
//             title: "Football Field",
//           }}
//         />
//         <Stack.Screen
//           name="Valuation"
//           component={Valuation}
//           options={{
//             headerBackTitle: "Back",
//             title: "Add / Edit Valuation",
//           }}
//         />
//         <Stack.Screen
//           name="Coverage_1_FF"
//           component={Coverage_1_FF}
//           options={{
//             title: "Coverage 1: Football Field",
//             headerBackTitle: "Back",
//           }}
//         />
//         <Stack.Screen
//           name="Coverage_2_Targets"
//           component={Coverage_2_Targets}
//           options={{
//             title: "Coverage 2: Targets",
//             headerBackTitle: "Back",
//           }}

//         />
//         <Stack.Screen
//           name="Coverage_3_Screens"
//           component={Coverage_3_Screens}
//           options={{
//             title: "Coverage 3: Screens",
//             headerBackTitle: "Back",
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


