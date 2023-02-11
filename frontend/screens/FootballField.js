import React, {useState} from 'react';
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
  const [targetId, setTargetId]=useState("")
  const [footballFieldOutput, setFootballFieldOutput]=useState("")
  const [footballFieldScale, setFootballFieldScale]=useState("")
  const [valuationId, setValuationId]=useState("")
  const [valuationCompsDate, setValuationCompsDate]=useState("")
  const [valuationMetric, setValuationMetric]=useState("")
  const [valuationStat, setValuationStat]=useState("")
  const [valuationSpread, setValuationSpread]=useState("")
  const [valuationColor, setValuationColor]=useState("")
  const [valuationName, setValuationName]=useState("")
  const [compSymbol, setCompSymbol]=useState("")
  const [footballFieldTimeSeries, setFootballFieldTimeSeries]=useState("")
  const [valuationTimeSeries, setValuationTimeSeries]=useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("js");




  const retrieveFootballField= () => {
    fetch('http://192.168.1.158:5000/footballfields',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldTimeSeries:footballFieldTimeSeries,
              targetId:targetId})}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
        
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

  const updateFootballField= () => {
    fetch('http://192.168.1.158:5000/footballfields',{
            method:'PUT',
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
  const retrieveValuation= () => {
    fetch('http://192.168.1.158:5000/valuations',{
            method:'GET',
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


  const updateValuation= () => {
    fetch('http://192.168.1.158:5000/valuations',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              basketOfComps:basketOfComps,
              targetId:targetId,
              userId:userId,
              valuationName:valuationName,
              footballFieldName:footballFieldName
              
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
    minRange: 1_000_000_000,
    maxRange: 5_000_000_000,
  }
  const valuations = [{
    name: "Valuation #1 (EV/EBITDA) (LTM)",
    color: "pink",
    minValuation: 1_000_000_000, 
    maxValuation: 3_250_000_000,
  }, 
  {
    name: "Valuation #2 (EV/EBITDA) (LTM)",
    color: "red",
    minValuation: 3_000_000_000, 
    maxValuation: 5_000_000_000,
  }, 
  {
    name: "Valuation #3 (EV/EBITDA) (LTM)",
    color: "blue",
    minValuation: 2_000_000_000, 
    maxValuation: 4_250_000_000,
  }, 
  ]
  
  const tableRange = table.maxRange - table.minRange;
  const pixelsPerDollar = (valuationWidth-20-20) / tableRange;

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#000' }}>
      <ScrollView>
        <View style={{ backgroundColor: '#FFF', height: valuationWidth, width: valuationWidth, borderRadius: 10 }}>
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
        </View> 
        <View style={{ margin: 10, height: 200, width: 400, borderWidth: 1 }}>
          <View style={{ alignItems: 'center' }}> 
            <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'blue', padding: 5, borderRadius: 5, width: 200 }}onPress={() => updateValuationName()}>
              <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Add Valuation</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={{ marginTop: 10, height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
          placeholder="Football Field Name"
          value={footballFieldName}
          onChangeText = {text=>setFootballFieldName(text)} 
          keyboardType="default">
          </TextInput>

          <TextInput style={{ marginTop: 5, height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
          placeholder="Target Name or Ticker"
          value={targetId}
          onChangeText = {text=>setTargetId(text)} 
          keyboardType="default">

          </TextInput>
          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Output</Text>
            <InlinePicker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)}
              options = {[
                { label: "EV/Revenue (LTM)",
                  value: "EV_R"
                }, {
                  label: "EV/EBITDA (LTM)",
                  value: "EV_E"
                },
              ]}/>
          </View>
          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Scale</Text>
            <InlinePicker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)}
              options = {[
                { label: "EV/Revenue (LTM)",
                  value: "EV_R"
                }, {
                  label: "EV/EBITDA (LTM)",
                  value: "EV_E"
                },
              ]}/>
          </View>
          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>As of Date</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}
export default FootballField;
const styles = StyleSheet.create({

});