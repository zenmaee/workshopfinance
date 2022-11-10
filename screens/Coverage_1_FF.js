import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Coverage_1_FF({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        title="Close"
        onPress={() => navigation.navigate("HomeScreen")}/>
      <Button color="#000000"
        title="Football Field"
      />
      <Button
        title="Targets"
        onPress={() => navigation.navigate("Coverage_2_Targets")}
      />
      <Button
        title="Screens"
        onPress={() => navigation.navigate("Coverage_3_Screens")}
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
  current: {
    backgroundColor: '#000000'
  },
});