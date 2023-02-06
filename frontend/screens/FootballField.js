import React, {useState} from 'react';
import { StyleSheet, Image, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';

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

  const retrieveFootballField= () => {
    fetch('http://192.168.1.158:5000/footballfields',{
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
    fetch('http://192.168.1.158:5000/valuations',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldId:footballFieldId,
              userId:userId
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
              valuationName:valuationName
              
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
  
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#000' }}>
      {/*<View style={{ backgroundColor: '#FFF', height: 400, width: 400, borderRadius: 10, top: 50 }}>
      </View> To be added*/}
      <View style={{ margin: 10, height: 200, width: 400, borderWidth: 1 }}>
        <TextInput style={{ height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
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
        </View>
        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Scale</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.buttons} onPress={() => addFootballField()}>
              <Text style={styles.buttonText}>Add Football Field</Text>
      </TouchableOpacity>



      <View style={{ margin: 10, height: 200, width: 400, borderWidth: 1 }}>
        <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Add Comp</Text>
          <TextInput style={{ marginTop: 5, margin: 10, height: 40, width: 200, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
            placeholder="Company Name or Ticker"
            value={footballFieldName}
            onChangeText = {text=>setFootballFieldName(text)} 
            keyboardType="default">
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
      </View>
    </SafeAreaView>
  );
}
export default FootballField;
const styles = StyleSheet.create({

});