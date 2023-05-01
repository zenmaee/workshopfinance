import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Image, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph, TextInput } from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';


const Tab = createMaterialTopTabNavigator();
const Coverage = ({ route, navigation }) => {
  const { footballFields, latestFF, targets, name, email, userId} = route.params;
  console.log("targets cov")
  console.log(targets)


  function TabFootballField() {
/*   const [footballFields, setFootballFields] = useState([])
    function retrieveFootballFields(targetId) {
      //let ffLists=[]
      //change routes: only showing last ff 
        const url = "http://10.239.13.230:5000/footballfields/" + targetId + "/";
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
              <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <View style={styles.arrayview}>
                    <ScrollView contentContainerStyle={styles.scrollview}>
                      {
                        footballFields.map(field => {
                          console.log(field)
                          return (                                  

                            <TouchableWithoutFeedback onPress={() => navigation.navigate('FootballField', {userName:name, userEmail:email, userId:userId,targets:targets, targetId: field.targetId, footballFieldName: field.footballFieldName, footballFieldTimeSeries:field.footballFieldTimeSeries,footballFields:footballFields, latestFF:latestFF})}>
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
                {<View style={[styles.bottomButtons, { flexDirection:"row" }]}>
                      <TouchableOpacity style={styles.button_1}>
                        <Text style={styles.buttonText_1}>Coverage</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button_2} onPress={() => navigation.navigate('FootballField', {userName:name, userEmail:email, userId:userId,targets:targets, targetId: latestFF.targetId, footballFieldName:latestFF.footballFieldName,footballFieldTimeSeries:latestFF.footballFieldTimeSerie, footballFields:footballFields, latestFF:latestFF})}>
                        <Image style={styles.buttonLogo} source={require('./logo_ff.png')}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button_3} onPress={() => navigation.navigate('Profile_About', {footballFields:footballFields, latestFF:latestFF, targets:targets, name: name , email: email, userId:userId})}>
                        <Text style={styles.buttonText_1}>Profile</Text>
                      </TouchableOpacity>
                </View>}
              </SafeAreaView>
            );
    }


  function TabTargets() {
    const [showPublicControls, setShowPublicControls] = useState (false);
    const [showPrivateControls, setShowPrivateControls] = useState (false);


  function addFootballField(type, symbol) {
    const footballFieldTimeSeries = Math.floor(Date.now() * 1000).toString();
    console.log("addFootballField")
    console.log(type)
    fetch('http://10.239.21.226:5000/footballFields',{ 
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
        .then(resp=>resp.json())
        .then(resp => {
          console.log("eii")
          console.log(resp)
            let targetId=userId+"-"+symbol
            //La resp de esto tiene que ser el FF que me ha llegado
            //const mergedArr = [...footballFields, ...resp.success];
            //const newFFs = Array.from(new Set(mergedArr.map(JSON.stringify))).map(JSON.parse);
            footballFields.push(resp.success[0])
            console.log("FF Name:")
            console.log(resp.success[0]["footballFieldName"])
            

            navigation.navigate('FootballField', {userName:name, userEmail:email, userId:userId,targets:targets, targetId: targetId, footballFieldName:resp.success[0]["footballFieldName"], footballFieldTimeSeries:footballFieldTimeSeries, footballFields:footballFields, latestFF:resp.success[0]})
            //navigation.navigate('Coverage', { userId: resp});
          
        })     
  }


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <View style={styles.arrayview}>
          <ScrollView contentContainerStyle={styles.scrollview} keyboardDismissMode='on-drag'>
            {
              targets.map(field => {
                
                console.log(field)
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
      <View style={styles.viewcontrols}>
      {showPrivateControls ? <PrivControls onClose={() => { setShowPrivateControls(false)}} setShowPrivateControls={setShowPrivateControls} /> : <Button title="New Private Target" onPress={() => { setShowPrivateControls(true)}}/>}
      {showPublicControls ? <PubControls onClose={() => { setShowPublicControls(false)}} setShowPublicControls={setShowPublicControls} /> : <Button title="New Public Target" onPress={() => { setShowPublicControls(true)}}/>}
      {<View style={[styles.bottomButtons, { flexDirection:"row" }]}>
                      <TouchableOpacity style={styles.button_1}>
                        <Text style={styles.buttonText_1}>Coverage</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button_2} onPress={() => navigation.navigate('FootballField', {userName:name, userEmail:email, userId:userId,targets:targets, targetId: latestFF.targetId, footballFieldName:latestFF.footballFieldName,footballFieldTimeSeries:latestFF.footballFieldTimeSerie, footballFields:footballFields, latestFF:latestFF})}>
                        <Image style={styles.buttonLogo} source={require('./logo_ff.png')}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button_3} onPress={() => navigation.navigate('Profile_About', {footballFields:footballFields, latestFF:latestFF, targets:targets, name: name , email: email, userId:userId})}>
                        <Text style={styles.buttonText_1}>Profile</Text>
                      </TouchableOpacity>
                </View>}
      </View>
    </SafeAreaView>
  );
}



function PrivControls({ onClose, setShowPrivateControls }) {
  const [targetName, setTargetName] = useState ("");
  const [sectorName, setSectorName] = useState ("");
  const [subsectorName, setSubsectorName] = useState ("");
  const [targetRevenueLTM, setTargetRevenueLTM] = useState (0);
  const [targetEbitdaLTM, setTargetEbitdaLTM] = useState (0);

  function addPrivateTarget(targetName, sectorName, subsectorName, targetRevenueLTM, targetEbitdaLTM) {
    const target_json = {
      targetName: targetName,
      sectorName: sectorName,
      subsectorName: subsectorName,
      targetRevenueLTM: targetRevenueLTM,
      targetEbitdaLTM: targetEbitdaLTM,
      type:"private",
      userId: userId
    };
    console.log("priv tgts")
    fetch('http://10.239.21.226:5000/targets/private', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(target_json)
      })
      .then(resp => resp.text())
      .then(resp => {
        console.log(resp)
        if (resp === "Successful Target Post") {
          targets.push(target_json)
          
          setShowPrivateControls(false)
        }
      })
  }
  

  return (
    <View styles={styles.controls}>
    <View>
    <TouchableOpacity 
          title="Add New Target"
          onPress={() => {
            addPrivateTarget(targetName, sectorName, subsectorName, targetRevenueLTM,targetEbitdaLTM)
          }}>
            <Image style={{ height: 50, width: 50, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./plus_icon.png')}/>
        </TouchableOpacity>
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
          value={ targetRevenueLTM }
          onChangeText={(value) => setTargetRevenueLTM(value)}
          />
        </View>
        <View style={{ width: 135 }}>
          <TextInput
          mode='outlined'
          placeholder="EBITDA (LTM)"
          value={ targetEbitdaLTM }
          onChangeText={(value) => setTargetEbitdaLTM(value)}
          />
        </View>
        <TouchableOpacity 
          title="Add New Target"
          onPress={() => {
            addPrivateTarget(targetName, sectorName, subsectorName, targetRevenueLTM, targetEbitdaLTM)
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

function PubControls({ onClose, setShowPublicControls }) {
  const [targetName, setTargetName] = useState("");
  const [sectorName, setSectorName] = useState("");
  const [subsectorName, setSubsectorName] = useState("");
  const [targetRevenueLTM, setTargetRevenueLTM] = useState(0);
  const [targetEbitdaLTM, setTargetEbitdaLTM] = useState(0);
  const [targetSymbol, setTargetSymbol] = useState("");

  async function addPublicTarget(targetData) {
    const target_json = {
      targetName: targetData.name,
      sectorName: targetData.sector,
      targetSymbol: targetSymbol,
      targetRevenueLTM: targetData.revenue,
      targetEbitdaLTM: targetData.ebitda,
      subsectorName:subsectorName,
      userId: userId,
      type:"Public"
    };


    const response = await fetch("http://10.239.21.226:5000/targets/public", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(target_json),
    });
    const resp = await response.text();
    console.log(resp)
    if (resp === "Successful Target Post") {
      targets.push(target_json)
      setShowPublicControls(false)
    }
  }

  async function retrieveTargetData(targetSymbol) {
    console.log(targetSymbol)
    try {
      const response = await fetch(
        "http://10.239.21.226:5000/targets/public/" + targetSymbol,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("data")
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async function getTargetData() {
    let targetData = await retrieveTargetData(targetSymbol);
    console.log("targetData");
    console.log(targetData);
    await addPublicTarget(targetData);
  }
            
    
  function searchTicker(input) {
    return fetch('http://10.239.21.226:5000/ticker/' + input, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
  }
  
  function find_company_name(input) {
    let res_company = [];
    let res_ticker = [];

    try {
      res_ticker = searchTicker(input);
    } catch (error) {
      // handle runtime error, type error, or name error
    }
    // Since `searchTicker` returns a Promise, we need to handle it asynchronously
    Promise.all([res_company, res_ticker])
      .then(([companyResults, tickerResults]) => {
        console.log("res_ticker")
        console.log(res_ticker)
        res_company = companyResults;
        res_ticker = tickerResults;
        res_ticker = res_ticker.sort();
        res_company.sort(function(a, b) {
          return a[1] - b[1];
        });
        let res = res_company.concat(res_ticker);
        let res_final = [...new Set(res)];
        console.log("input")
        console.log(input)
        console.log(res_final)
        return res_final;
      })
      .catch((error) => {
        console.error("Error:", error);
        return [];
      });
  }
          
    return (
      <View styles={styles.controls}>
        <View>
          <TextInput
            mode='outlined'
            placeholder="Search by Ticker:"
            // Call `find_company_name` when the input value changes
            onChangeText={(text) => setTargetSymbol(text)
            }
          />
        
          


      <View style={{flexDirection: "row", alignItems: 'center'}}>
        <View style={{ marginRight: 5, width: 150 }}>
    
        </View>
        <View style={{ width: 135 }}>

        </View>
        <TouchableOpacity 
          title="Add New Target"
          onPress={() => {
            getTargetData()
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
  const windowWidth = Dimensions.get('window').width;

  return (
    <Tab.Navigator
      initialRouteName="Targets"
      screenOptions={{
        contentContainerStyle: { flex: 1 },
        tabBarLabelStyle: { fontSize: 12, color: '#FFF' },
        tabBarItemStyle: { width:  windowWidth/2 },
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
  arrayview: {
    marginTop: 5,
    flex: 1
  },
  scrollview: {
    alignItems: 'center',
    // marginVertical: 30, 
    // marginHorizontal: 20, 
    // height: Dimensions.get('window').height / 2.5,
    // width: Dimensions.get('window').width * 0.95
  },
  cardList: {
    flex: 1,
    // height: Dimensions.get('window').height / 8,
    marginVertical: 2.5,
    width: "100%"
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 30
  },
  viewcontrols: {
    flex: 1,
    height: Dimensions.get('window').height / 2.5,
    width: Dimensions.get('window').width * 0.95,
  },
  controls: {
    height: Dimensions.get('window').height / 2.5,
    width: Dimensions.get('window').width * 0.95,
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