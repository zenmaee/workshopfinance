import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import EmailAddressValue from "../components/EmailAddressValue";
import NameValue from "../components/NameValue";

const Profile_About = ({ route, navigation }) => {
  const {name, email } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10, marginTop: 10 }}>
        <View style={{ align: 'left' }}>
          <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '700' }}>User Profile</Text>
        </View>
        <View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ color: '#FFF' }}>Name: </Text>
            <Text style={styles.nameValue}>{name}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ color: '#FFF' }}>Email Address: </Text>
            <Text style={styles.emailAddressValue}>{email}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '700' }}>About Workshop</Text>
        </View>
        <View>
          <Text style={{ color: '#FFF', marginTop: 5 }}>Workshop Finance is an innovative tool for visualizing the results from multiple valuation methodologies. 
          For any questions, contact us at brendan@workshopfinance.com.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Profile_About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  nameValue: {
    position: "absolute",
    top: 51,
    left: 126,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Avenir Next",
    color: "#fff",
    textAlign: "left",
  },
  emailAddressValue: {
    position: "absolute",
    top: 81,
    left: 126,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Avenir Next",
    color: "#fff",
    textAlign: "left",
  }
});