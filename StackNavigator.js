import React from "react";
import {View,Text} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShow:false}}>
            <Stack.Group>
                <Stack.Screen
                    name="SignUpSignIn"
                    component={SignUpSignIn}
                    options={{
                        headerStyle: {},
                        headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                        title: "Sign Up",
                        headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                        title: "Sign In",
                        headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={({ navigation, route }) => ({
                        headerRight: () => (
                        <Button title="Siderbar"/>
                        ),
                    })}
                />
                <Stack.Screen
                    name="FootballField"
                    component={FootballField}
                    options={{
                        headerBackTitle: "Back",
                        title: "Football Field",
                    }}
                />
                <Stack.Screen
                    name="Valuation"
                    component={Valuation}
                    options={{
                        headerBackTitle: "Back",
                        title: "Add / Edit Valuation",
                    }}
                />
                <Stack.Screen
                    name="Coverage_1_FF"
                    component={Coverage_1_FF}
                    options={{
                        title: "Coverage 1: Football Field",
                        headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="Coverage_2_Targets"
                    component={Coverage_2_Targets}
                    options={{
                        title: "Coverage 2: Targets",
                        headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="Coverage_3_Screens"
                    component={Coverage_3_Screens}
                    options={{
                        title: "Coverage 3: Screens",
                        headerBackTitle: "Back",
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default StackNavigator;