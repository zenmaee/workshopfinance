import HomeScreen from "./screens/HomeScreen";
import FootballField from "./screens/FootballField";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: "Home"}}
        />
        <Stack.Screen
          name="FootballField"
          component={FootballField}
          options={{
            headerBackTitle: "Back",
            title: "Football Field",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


