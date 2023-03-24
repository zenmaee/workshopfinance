import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph, TextInput } from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';


const Tab = createMaterialTopTabNavigator();
const Coverage = ({ route, navigation }) => {
  const { footballFields, latestFF, targets, name, email, userId} = route.params;



  function TabFootballField() {
/*    const [footballFields, setFootballFields] = useState([])

    function retrieveFootballFields(targetId) {
      //let ffLists=[]
      //change routes: only showing last ff 
        const url = "http://10.239.101.190:5000/footballfields/" + targetId + "/";
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
            
          }
              getFootballFields()
            }, []);*/

            console.log(footballFields)

            return (
              <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <View style={styles.scrollview}>
                    <ScrollView contentContainerStyle={styles.scrollview} keyboardDismissMode='on-drag'>
                      {
                        footballFields.map(field => {
                          return (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('FootballField', { targetId: field.targetId, footballFieldName: field.footballFieldName, footballFieldTimeSeries:field.footballFieldTimeSeries,})}>
                              <View style={styles.cardList}>
                                <Card>
                                  <Card.Content>
                                    <Title>{field.footballFieldName}</Title>
                                    <Paragraph>Company Type: {field.footballFieldType}</Paragraph>
                                    <Paragraph>Created Date: {field.timeDateCreated}</Paragraph>
                                  </Card.Content>
                                </Card>
                              </View>
                            </TouchableWithoutFeedback>
                          )
                        })
                      }
                    </ScrollView>
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


  function TabTargets() {
    const [showControls, setShowControls] = useState (false);


  const addFootballField= (type, symbol) => {
    const footballFieldTimeSeries = Math.floor(Date.now() * 1000).toString();
    fetch('http://10.239.101.190:5000/footballFields',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              targetSymbol:symbol,
              userId:userId,
              footballFieldType:type,
              footballFieldTimeSeries:footballFieldTimeSeries
            })}
        )
        .then(resp=>resp.text())
        .then(resp => {
          if (resp === "SUCCESFUL FF POST") {
            let targetId=userId+"-"+symbol
            navigation.navigate('FootballField', { newFootballField: 1, targetId:targetId, footballFieldTimeSeries:footballFieldTimeSeries})
            //navigation.navigate('Coverage', { userId: resp});
          }
        })     
  }


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <View style={styles.scrollview}>
          <ScrollView contentContainerStyle={styles.scrollview} keyboardDismissMode='on-drag'>
            {
              targets.map(field => {
                return (
                  <TouchableOpacity style={styles.cardList}>
                    <Card>
                      <Card.Content>
                        <Title>{field.targetName}</Title>
                        <Paragraph>{field.type}</Paragraph>
                        <Paragraph>{field.targetSymbol}</Paragraph>
                      </Card.Content>
                      <Card.Actions>
                          <Button title="+ Football Field" onPress={() => {addFootballField(field.type, field.targetSymbol)}}/>
                      </Card.Actions>
                    </Card>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
      </View>
      {showControls ? <Controls onClose={() => { setShowControls(false)}}/>:<Button title="New Target" onPress={() => { setShowControls(true)}}/>}
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



function Controls({ onClose}) {
  const [targetName, setTargetName] = useState ("");
  const [sectorName, setSectorName] = useState ("");
  const [subsectorName, setSubsectorName] = useState ("");
  const [revenueVal, setRevenueVal] = useState (0);
  const [ebitdaVal, setEbitdaVal] = useState (0);

  function addPrivateTarget(targetName, sectorName, subsectorName, revenueVal,ebitdaVal){
    fetch('http://10.239.101.190:5000/targets/private',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              targetName:targetName,
              sectorName:sectorName,
              subsectorName:subsectorName,
              targetRevenueLTM:revenueVal,
              targetEbitdaLTM:ebitdaVal,
              userId:userId
            })}
        )
        .then(resp=>resp.text())
        /*.then(resp => {
          if (resp === "SUCCESFUL TARGET POST") {
            targets.push({---new target-})
          }
        }) */
  }

  return (
    <View styles={styles.controls}>
    <View>
      <TextInput
        style={{ width: 400 }}
        mode='outlined'
        placeholder="Target Name"
        value={ targetName }
        onChangeText={(text) => setTargetName(text)}
      />
      <TextInput
        mode='outlined'
        placeholder="Target Sector"
        value={ sectorName }
        onChangeText={(text) => setSectorName(text)}
      />
      <TextInput
        mode='outlined'
        placeholder="Target Subsector"
        value={ subsectorName }
        onChangeText={(text) => setSubsectorName(text)}
      />
      <View style={{flexDirection: "row", alignItems: 'center'}}>
        <View style={{ marginRight: 5, width: 150 }}>
          <TextInput
          mode='outlined'
          placeholder="Revenue (LTM)"
          value={ revenueVal }
          onChangeText={(value) => setRevenueVal(value)}
          />
        </View>
        <View style={{ width: 135 }}>
          <TextInput
          mode='outlined'
          placeholder="EBITDA (LTM)"
          value={ ebitdaVal }
          onChangeText={(value) => setEbitdaVal(value)}
          />
        </View>
        <TouchableOpacity 
          title="Add New Target"
          onPress={() => {
            addPrivateTarget(targetName, sectorName, subsectorName, revenueVal,ebitdaVal)
          }}>
            <Image style={{ height: 50, width: 50, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./plus_icon.png')}/>
        </TouchableOpacity>
        <TouchableOpacity 
          title="Delete Selected Target"
          onPress={() => {
            onClose()
          }}>
            <Image style={{ height: 50, width: 50, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./delete_icon.png')}/>
        </TouchableOpacity>
      </View> 
    </View>
  </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Targets"
      screenOptions={{
        contentContainerStyle: { flex: 1 },
        tabBarLabelStyle: { fontSize: 12, color: '#FFF' },
        tabBarItemStyle: { width: 145 },
        tabBarStyle: { backgroundColor: '#000' },
      }}>
          <Tab.Screen 
            name="Football Fields" 
            component={TabFootballField} 
          />
          <Tab.Screen 
            name="Targets" 
            component={TabTargets}
          />
    </Tab.Navigator>
  );
}

return (
    <NavigationContainer independent={true} style={styles.container}>
        <MainTabs/>
    </NavigationContainer>
  );
}

export default Coverage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview: {
    alignItems: 'center',
    height: 300,
    width: 400
  },
  cardList: {
    flex: 1,
    height: 95,
    width: 400
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 30
  },
  controls: {
    height: 200,
    width: 400,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF'
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
  buttonText_1: {
    fontSize: 15,
    fontFamily: "Avenir Next", 
    color: "#000"
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
  buttonLogo: {
    height: 45,
    width: 45
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
  }
});