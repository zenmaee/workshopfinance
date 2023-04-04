import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';

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
        <Text style={{ color: '#FFF' }}>{name}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: '#FFF' }}>Email Address: </Text>
        <Text style={{ color: '#FFF' }}>{email}</Text>
      </View>
    </View>
      <View style={{ marginTop: 10 }}>
      <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '700' }}>About Workshop</Text>
    </View>
    <View>
      <Text style={{ color: '#FFF', marginTop: 5 }}>Workshop Finance is an innovative tool for visualizing the results from multiple valuation methodologies. For any questions, contact us at brendan@workshopfinance.com.</Text>
    </View>
  </View>
  <View style={[styles.bottomButtons, { flexDirection:"row" }]}>
    <TouchableOpacity style={styles.button_1} onPress={() => navigation.navigate('Coverage')}>
      <Text style={styles.buttonText_1}>Coverage</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button_2} onPress={() => navigation.navigate('FootballField', { targetId: latestFF.targetId, footballFieldName:latestFF.footballFieldName,footballFieldTimeSeries:latestFF.footballFieldTimeSeries})}>
      <Image style={styles.buttonLogo} source={require('./logo_ff.png')}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button_3} onPress={() => navigation.navigate('Profile_About', { name: name , email: email})}>
      <Text style={styles.buttonText_1}>Profile</Text>
    </TouchableOpacity>
  </View>
</SafeAreaView>
);
}
export default Profile_About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 30
  },
  button_1: {
    right: 10,
    width: 150,
    height: 50,
    borderRadius: 4, 
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignItems: "center", 
    backgroundColor:'#68a0cf',
    justifyContent: "center",
    elevation: 5
  },
  button_2: {
    width: 50,
    height: 50,
    borderRadius: 4, 
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignItems: "center", 
    backgroundColor:'#FFF',
    justifyContent: "center",
    elevation: 5
  },
  button_3: {
    left: 10,
    width: 150,
    height: 50,
    borderRadius: 4, 
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignItems: "center", 
    backgroundColor:'#68a0cf',
    justifyContent: "center",
    elevation: 5
  },
  buttonLogo: {
    height: 45,
    width: 45
  }
});