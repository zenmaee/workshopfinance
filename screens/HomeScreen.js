import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button  
        title="Draw Football Field"
        onPress={() => navigation.navigate("FootballField")}
      />
      <Button  
        title="Coverage"
        onPress={() => navigation.navigate("Coverage_1_FF")}
      />
      <StatusBar style="auto" /> 
    </View>
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