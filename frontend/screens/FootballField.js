import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

function TabFootballField() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Football Fields</Text>
    </View>
  );
}

function TabTargets() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Targets</Text>
    </View>
  );
}

function TabScreens() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screens</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="FF"
      tabBarPosition='top'
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}>
          <Tab.Screen 
            name="FF" 
            component={TabFootballField} 
            options={{ tabBarLabel: 'Football Field' }}
          />
          <Tab.Screen 
            name="Targets" 
            component={TabTargets}
            options={{ tabBarLabel: 'Targets' }}
          />
          <Tab.Screen 
            name="Screens" 
            component={TabScreens} 
            options={{ tabBarLabel: 'Screens' }}
          />
    </Tab.Navigator>
  );
}

export default function FootballField({ navigation }) {
  return (
    <NavigationContainer independent={true} style={styles.container}>
        <Text style={{color:'#fff'}}>Placeholder Text</Text>
        <MainTabs/>
        <Text style={{color:'#fff'}}>Placeholder Text</Text>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});