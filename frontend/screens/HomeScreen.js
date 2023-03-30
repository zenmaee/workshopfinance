import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ route, navigation }) => {
  const { userName, userEmail, userId, targets } = route.params;
  const [footballFields, setFootballFields] = useState([])
  const [latestFootballField, setLatestFootballField] = useState([])


  function retrieveFootballFields(targetId) {
    //let ffLists=[]
    //change routes: only showing last ff 
      const url = "http://10.239.242.79:5000/footballfields/" + targetId + "/";
      console.log(url)
      return fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          

          return data})
      
        .catch((error) => {
          console.error("Error fetching data:", error);
          return [];
          });}
      
        useEffect(() => {
            async function getFootballFields() {
            let ffsLists = []
              for (const target of targets) {
                console.log("target:")
                console.log(target)
                const targetId = userId + "-" + target.targetSymbol;
                let ffs = await retrieveFootballFields(targetId);
                for (const ff of ffs){
                  ffsLists.push(ff)
                }
              }
            setFootballFields(ffsLists)
            getLatestFF(footballFields)

          
        }
            getFootballFields()
          }, []);

          function getLatestFF(footballFields) {
            let latestFF = footballFields[0]; // initialize with the first element
            for (let i = 1; i < footballFields.length; i++) {
              const currentFF = footballFields[i];
              if (new Date(currentFF.timeDateCreated) > new Date(latestFF.timeDateCreated)) {
                latestFF = currentFF;
              }
            }
            setLatestFootballField(latestFF);
            console.log("latestFF1")
            console.log(latestFootballField)
          }
          
  return (
    <SafeAreaView style={styles.container}>
          <Image style={styles.wfLogo} resizeMode="contain" source={require('./logo_dark.png')}/>

          <TouchableOpacity style={styles.buttons_1} onPress={() => navigation.navigate('FootballField', {targetId: latestFootballField.targetId,footballFieldName: latestFootballField.footballFieldName,footballFieldTimeSeries: latestFootballField.footballFieldTimeSeries})}>
              <Text style={styles.buttonText_1}>Open Most Recent Football Field</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttons_2} onPress={() => navigation.navigate('Coverage', { footballFields: footballFields , latestFF: latestFootballField, targets: targets, name: userName , email: userEmail, userId: userId})}>
              <Text style={styles.buttonText_2}>Open Coverage List</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttons_2} onPress={() => navigation.navigate('Profile_About', { name: userName , email: userEmail})}>
              <Text style={styles.buttonText_2}>User Profile</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: "center"
    },
    buttons_1: {
        fontSize: 16,
        width: 200,
        borderRadius: 4, 
        marginTop: 130, 
        paddingVertical: 7,
        paddingHorizontal: 20,
        alignItems: "center", 
        backgroundColor:'#68a0cf',
        justifyContent: "center",
        shadowColor: "rgba(171, 180, 189, 0.35)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    buttons_2: {
        fontSize: 16,
        width: 200,
        borderRadius: 4, 
        marginTop: 10, 
        paddingVertical: 7,
        paddingHorizontal: 20,
        alignItems: "center", 
        backgroundColor:'#FFF',
        justifyContent: "center",
        shadowColor: "rgba(171, 180, 189, 0.35)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    wfLogo: {
      top: 55,
      height: 100,
      width: 350
    },
    buttonText_1: {
        fontFamily: "Avenir Next", 
        color: "#FFF",
        textAlign: "center"
    },
    buttonText_2: {
        fontFamily: "Avenir Next", 
        color: "#000"
    }
  });