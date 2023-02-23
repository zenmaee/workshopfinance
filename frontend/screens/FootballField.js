import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const InlinePicker = ({ selectedValue, onValueChange, options }) => {
  return(
    <Picker
    selectedValue={selectedValue}
    onValueChange={onValueChange}
    style={{ marginLeft: 20, backgroundColor: 'white', height: 200, width: 300 }}
    >
    {options.map(option => <Picker.Item label={option.label} value={option.value}/>)}
  </Picker>
  );
}

const FootballField = ({ navigation }) => {
  const [userId, setUserId]=useState("")
  const [footballFieldName, setFootballFieldName]=useState("")
  const [footballFieldId, setFootballFieldId]=useState("")
  const [targetSymbol, setTargetSymbol]=useState("")
  const [footballFieldOutput, setFootballFieldOutput]=useState("EV")
  const [footballFieldScale, setFootballFieldScale]=useState("billions")
  const [valuationId, setValuationId]=useState("")
  const [valuationCompsDate, setValuationCompsDate]=useState("")
  const [footballFieldMetric, setFootballFieldMetric]=useState("EV_E")
  const [footballFieldStat, setFootballFieldStat]=useState("AV")
  const [valuationStat, setValuationStat]=useState("")
  const [valuationSpread, setValuationSpread]=useState("")
  const [valuationColor, setValuationColor]=useState("")
  const [valuationName, setValuationName]=useState("")
  const [compSymbol, setCompSymbol]=useState("")
  const [footballFieldTimeSeries, setFootballFieldTimeSeries]=useState("")
  const [valuationTimeSeries, setValuationTimeSeries]=useState("")
  const [response, setResponse]=useState([])
  const [valuations, setValuations] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("js");

  
   function retrieveFootballField() {
    let targetId = "Tester3FF-AAPL";
    let footballFieldTimeSeries = "Test";

    const url = 'http://10.239.99.22:5000/footballfields/'+targetId+"/"+footballFieldTimeSeries;
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())

      .then((data) => {
        let footballFieldName=data[0].footballFieldName
        let targetId= data[0].targetId
        let targetSymbol = targetId.split("-")[1];

        return [footballFieldName, targetSymbol];
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return [];
      });
  }


  const addFootballField= () => {
    fetch('http://192.168.1.158:5000/footballfields',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldName:footballFieldName,
              targetId:targetId})}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
        
  }



  const updateFootballFieldName= () => {
    let targetId = "Tester3FF-AAPL";
    let footballFieldTimeSeries = "Test";
    console.log("ha entrado")
    let url="http://10.239.99.22:5000/footballFields/names/" + targetId +"/"+ footballFieldTimeSeries;
    fetch(url,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldName:footballFieldName
              })}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
  }

  const deleteFootballField= () => {
    fetch('http://192.168.1.158:5000/footballfields',{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldName:footballFieldName,
              targetId:targetId})}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
       
  }
  
  const addValuation= () => {
    fetch('http://10.239.16.29:5000/valuations',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldTimeSeries:"FF Test",
              userId:"Tester3"
            })}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))

  }

  function retrieveValuations() {
    let targetId = "Tester3FF-AAPL";
    let footballFieldTimeSeries = "TEST";
    let url = "http://10.239.99.22:5000/valuations/" + targetId +"-"+footballFieldTimeSeries;
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
  
    function valuationNumbers (data, output, metric, stat) {

    
    
        let valuations = [];
        let valuationCenter;
        let valuationColor="red"
        let valuationSpread=10
        
        for (let valuation of data) {
          let valuationName = valuation["valuationName"];
          if (output === "EV") {
            if (metric === "EV_E") {
              if (stat === "AV") {
                valuationCenter = valuation["valuationEvAvEvEbitdaLTM"];
              } else if (stat === "HIGH") {
                valuationCenter = valuation["valuationEvHighEvEbitdaLTM"];
              } else if (stat === "MED") {
                valuationCenter = valuation["valuationEvAvEvEbitdaLTM"];
              } else {
                valuationCenter = valuation["valuationEvAvEvEbitdaLTM"];
              }
            } else if (metric === "EV_R") {
              if (stat === "AV") {
                valuationCenter = valuation["valuationEvAvEvRevLTM"];
              } else if (stat === "HIGH") {
                valuationCenter = valuation["valuationEvHighEvRevLTM"];
              } else if (stat === "MED") {
                valuationCenter = valuation["valuationEvAvEvRevLTM"];
              } else {
                valuationCenter = valuation["valuationEvAvEvRevLTM"];
              }
            }
          } else if (output === "MULT") {
            if (metric === "EV_E") {
              if (stat === "AV") {
                valuationCenter = valuation["valuationMultAvEvEbitdaLTM"];
              } else if (stat === "HIGH") {
                valuationCenter = valuation["valuationMultHighEvEbitdaLTM"];
              } else if (stat === "MED") {
                valuationCenter = valuation["valuationMultAvEvEbitdaLTM"];
              } else {
                valuationCenter = valuation["valuationMultAvEvEbitdaLTM"];
              }
            } else if (metric === "EV_R") {
              if (stat === "AV") {
                valuationCenter = valuation["valuationMultAvEvRevLTM"];
              } else if (stat === "HIGH") {
                valuationCenter = valuation["valuationMultHighEvRevLTM"];
              } else if (stat === "MED") {
                valuationCenter = valuation["valuationMultAvEvRevLTM"];
              } else {
                valuationCenter = valuation["valuationMultAvEvRevLTM"];
              }
            }
          }
        
          let minValuation = valuationCenter - valuationCenter * valuationSpread / 100;
          let maxValuation = valuationCenter + valuationCenter * valuationSpread / 100;
          valuation = {
            name: valuationName,
            color: valuationColor,
            minValuation: minValuation,
            maxValuation: maxValuation,
          };
          valuations.push(valuation);
        }
        console.log("valuations")
        console.log(valuations)
        return valuations;
      }
      
  

  
  useEffect(() => {
    async function getValuations() {
      let valuations = await retrieveValuations();
      setValuations(valuations);
      valuationNumbers(valuations, footballFieldOutput, footballFieldMetric, footballFieldStat)
    }
    getValuations();
  }, []);

  useEffect(() => {
    async function getFootballField() {
      let footballField = await retrieveFootballField();
      setFootballFieldName(footballField[0]);
      setTargetSymbol(footballField[1]);

    }
    getFootballField();
  }, []);

    const generateValuation= () => {
    fetch('http://10.239.16.29:5000/valuations',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              userId:"Tester3",
              valuationName:"Changing name",
              footballFieldTimeSeries:"FF Test",
              valuationTimeSeries:"1676081515625045",
              targetSymbol:targetSymbol,
              valuationCompsDate:"02/10/2023"
            })}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
       
  }
  
  const updateValuationName= () => {
    fetch('http://10.239.16.29:5000/valuations/names',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              userId:"Tester3",
              valuationName:"Changing name",
              footballFieldTimeSeries:"FF Test",
              valuationTimeSeries:"1676081515625045"
            })}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
       
  }


  const deleteValuation= () => {
    fetch('http://192.168.1.158:5000/valuations',{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldName:footballFieldName,
              targetId:targetId})}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
       
  }


  const addComp= () => {
    fetch('http://192.168.1.158:5000/comps',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              compSymbol:compSymbol,
              valuationId:valuationId,
              valuationCompsDate:valuationCompsDate})}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
        
  }


  const deleteComp= () => {
    fetch('http://192.168.1.158:5000/comps',{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldName:footballFieldName,
              targetId:targetId})}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
        
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const valuationWidth = windowWidth-20;
  const valuationHeight = 20;
  const table = {
    maxValuations: [],
    minValuations: []
  };
  
  for (const valuation of valuations) {
    table.maxValuations.push(valuation.maxValuation);
    table.minValuations.push(valuation.minValuation);
  }
  
  table.maxRange = Math.max(...table.maxValuations);
  table.minRange = Math.min(...table.minValuations);
  
  const tableRange = table.maxRange - table.minRange;
  const tableMean = (table.maxRange + table.minRange) / 2;
  const pixelsPerDollar = (valuationWidth-20-20) / tableRange;
  return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#000' }}>
        <View style={{ backgroundColor: '#FFF', height: 0.4*(windowHeight), width: valuationWidth, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>{footballFieldName}</Text>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>{targetSymbol}</Text>
          </View>
          {footballFieldOutput==="EV" ? (
            footballFieldScale === "billions" ? (
              <>
                <Text>{"$"+(table.minRange/1000000000).toFixed(2)}</Text>
                <Text>{"$"+(tableMean/1000000000).toFixed(2)}</Text>
                <Text>{"$"+(table.maxRange/1000000000).toFixed(2)}</Text>
              </>
            ) : (
              <>
                <Text>{"$"+(table.minRange/1000000).toFixed(2)}</Text>
                <Text>{"$"+(tableMean/1000000).toFixed(2)}</Text>
                <Text>{"$"+(table.maxRange/1000000).toFixed(2)}</Text>
              </>
            )
          ) : (
            <>
              <Text>{table.minRange}</Text>
              <Text>{tableMean}</Text>
              <Text>{table.maxRange}</Text>
            </>
          )}
          <View style={{ backgroundColor: 'black', height: 1, width: valuationWidth - 40, marginLeft: 20, marginTop: 5 }}/>
          <ScrollView
            contentContainerStyle={{ 
              padding: 20
            }}
          >
            { valuations.map(( valuation ) => {
              return (
              <> 
                <Text>{valuation.name}</Text>
                <View style={{ marginStart: (valuation.minValuation - table.minRange)*pixelsPerDollar, marginTop: 10, backgroundColor: valuation.color, height: valuationHeight, width: (valuation.maxValuation - valuation.minValuation) * pixelsPerDollar }}></View>
              </>
              )
            })}
          </ScrollView>
          {footballFieldOutput==="EV" && (
            <Text style={{ textAlign: 'right', marginBottom: 10, marginRight: 10, color: 'gray' }}>($ in {footballFieldScale})</Text>
          )}
        </View> 
        <View style={{ margin: 10, height: 200, width: 400, borderWidth: 1 }}>
          <View style={{ alignItems: 'center' }}> 
            <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'blue', padding: 5, borderRadius: 5, width: 200 }}>
              <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Add Valuation</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={{ marginTop: 10, height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
            placeholder="Football Field Name"
            value={footballFieldName}
            onChangeText={(text) => {
              setFootballFieldName(text);
            }}
            onSubmitEditing={updateFootballFieldName}
            keyboardType="default"
          />
          <TextInput style={{ marginTop: 5, height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
          placeholder="Target Name or Ticker"
          value={targetSymbol}
          onChangeText={(text) => {
            setFootballFieldName(text);
          }}
          keyboardType="default">
          </TextInput>

          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Output</Text>
            <InlinePicker
              selectedValue={footballFieldOutput}
              onValueChange={(itemValue, itemIndex) => {
                setFootballFieldOutput(itemValue);
                valuationNumbers(valuations, footballFieldOutput, "EV_E", "AV");
              }}
              options={[    
                { label: "Enterprise Value", value: "EV" },   
                { label: "Multiples", value: "MULT" },
                ]}
            />

          </View>
          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Scale</Text>
            <InlinePicker
              selectedValue={footballFieldScale}
              onValueChange={(itemValue, itemIndex) =>
                setFootballFieldScale(itemValue)}
              options = {[
                { label: "Millions",
                  value: "millions"
                }, {
                  label: "Billions",
                  value: "billions"
                },
              ]}/>
          </View>
        </View>

        {/*<TouchableOpacity style={styles.buttons} onPress={() => addFootballField()}>
                <Text style={styles.buttonText}>Add Football Field</Text>
        </TouchableOpacity>*/}



          {/*<View style={{ margin: 10, height: 200, width: 400, borderWidth: 1 }}>
            <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Add Comp</Text>
              <TextInput style={{ marginTop: 5, margin: 10, height: 40, width: 200, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
                placeholder="Company Name or Ticker">
              </TextInput>
              <TouchableOpacity
                title="Add Comp">
                <Image style={{ height: 40, width: 40, borderRadius: 4, marginLeft: 5 }} source={require('./plus_icon.png')}/>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Metric</Text>
            </View>
            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Stat</Text>
            </View>
            <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Spread</Text>
              <TouchableOpacity
                title="Decrease Spread">
                <Image style={{ height: 25, width: 25, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./minus_sign.png')}/>
              </TouchableOpacity>
              <Text style={{ backgroundColor: 'white', fontSize: 15 }}>10%</Text>
              <TouchableOpacity
                title="Increase Spread">
                <Image style={{ height: 25, width: 25, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./plus_sign.png')}/>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Color</Text>
              <TouchableOpacity
                title="Blue">
                <Image style={{ height: 25, width: 40, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./blue_color.png')}/>
              </TouchableOpacity>
              <TouchableOpacity
                title="Green">
                <Image style={{ height: 25, width: 40, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./green_color.png')}/>
              </TouchableOpacity>
              <TouchableOpacity
                title="Orange">
                <Image style={{ height: 25, width: 40, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./orange_color.png')}/>
              </TouchableOpacity>
              <TouchableOpacity
                title="Yellow">
                <Image style={{ height: 25, width: 40, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./yellow_color.png')}/>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity>
                <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Back to Football Field Controls</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }}>
                <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Delete</Text>
              </TouchableOpacity>
            </View>
        </View>*/}
    </SafeAreaView>
  );
}
export default FootballField;
const styles = StyleSheet.create({

});