import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'

//Original function level 0.
const FootballField = ({ route, navigation }) => {
  //PARAMS
  console.log("route")
  console.log(route);
  const {userName, userEmail, userId,targets, targetId, footballFieldName,footballFieldTimeSeries} = route.params; //Params we obtain from other screens
  
  const targetSymbol = targetId.split("-")[1] //tgtSymbol obtained
  //TABLE
  const [table, setTable] = useState([]);
  const [tableMean, setTableMean] = useState();
  const [tableRange, setTableRange] = useState();
  const [pixelsPerDollar, setPixelsPerDollar] = useState();
  //VALUATIONRENDER
  const [valuationRender, setValuationRender]  = useState({})
  //VALUATION STUFF
  const [valuationId, setValuationId]=useState("")
  const [valuationTimeSeries, setValuationTimeSeries]=useState("")
  const [valuationSpread, setValuationSpread]=useState("")
  const [valuationColor, setValuationColor]=useState("")
  const [valuationStat, setValuationStat]=useState();
  const [valuationMetric, setValuationMetric]=useState();
  const [valuations, setValuations] = useState([]);
  //FFName
  const [ffName, setFootballFieldName]=useState(footballFieldName)
  //SCREEN SIZE
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const valuationWidth = windowWidth-20;
  const valuationHeight = 20;
  //CONTROLS
  const [showValuationControls, setShowValuationControls] = useState(false);
  //FF
  const [footballFieldOutput, setFootballFieldOutput]=useState("EV")
  const [footballFieldScale, setFootballFieldScale]=useState("millions")
  //Preparing pickers and inputs:-FootballFieldControls
  const [openOutput, setOpenOutput] = useState(false);
  const [outputItems, setOutputItems]=useState([
    {label: 'Enterprise Value', value: 'EV' },
    {label: 'Multiples', value: 'MULT' }
  ])
  const [openScale, setOpenScale] = useState(false);
  const [scaleItems, setScaleItems]=useState([
    { label: "Millions", value: "millions" }, 
    { label: "Billions", value: "billions" }
  ])
                
  //SetTableValues

  function setTableValues(valuations){
    console.log("reseting table values")
    console.log(footballFieldOutput)
    const tab = {
      maxValuations: [],
      minValuations: []
    };
    console.log("reseting table values2")
    for (const valuation of valuations) {
      if (!isNaN(valuation.maxValuation) && !isNaN(valuation.minValuation)) {
        tab.maxValuations.push(valuation.maxValuation);
        tab.minValuations.push(valuation.minValuation);
      }
    }
    console.log("reseting table values3")
    tab.maxRange = Math.max(...tab.maxValuations);
    tab.minRange = Math.min(...tab.minValuations);
    console.log("reseting table values4")

    const tableRange = tab.maxRange - tab.minRange;
    const tableMean = (tab.maxRange + tab.minRange) / 2;
    const pixelsPerDollar = (valuationWidth-20-20) / tableRange;
    console.log("reseting table values5")
    console.log(tab)
    setTable(tab)
    console.log("reseting table values6")

    setTableRange(tableRange)
    console.log("reseting table value7")

    setTableMean(tableMean)
    console.log("reseting table values8")

    setPixelsPerDollar(pixelsPerDollar)
    console.log("reseting table values9")

    console.log("table")
    console.log(table)
    console.log("ffoutput")
}

function retrieveValuations() {
        
  let url = "http://10.239.21.226:5000/valuations/" + targetId +"-"+footballFieldTimeSeries;
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


  //ValuationNumbers. Level 1.
  console.log(footballFieldOutput)
  function valuationNumbers (data, output) {
      console.log("Cuando se entra en valuatioNumbers?")
      console.log("data")
      console.log(data)
      console.log("output")



      let valuations = [];
      let valuationCenter;
      
      for (let valuation of data) {
        
        if (output === "EV") {
          if (valuation["metric"] === "EV_E") {
            if (valuation["stat"] === "AV") {
              valuationCenter = valuation["valuationEvAvEvEbitdaLTM"];
            } else if (valuation["stat"] === "HIGH") {
              valuationCenter = valuation["valuationEvHighEvEbitdaLTM"];
            } else if (valuation["stat"] === "MED") {
              valuationCenter = valuation["valuationEvAvEvEbitdaLTM"];
            } else {
              valuationCenter = valuation["valuationEvAvEvEbitdaLTM"];
            }
          } else if (valuation["metric"] === "EV_R") {
            if (valuation["stat"] === "AV") {
              valuationCenter = valuation["valuationEvAvEvRevLTM"];
            } else if (valuation["stat"] === "HIGH") {
              valuationCenter = valuation["valuationEvHighEvRevLTM"];
            } else if (valuation["stat"] === "MED") {
              valuationCenter = valuation["valuationEvAvEvRevLTM"];
            } else {
              valuationCenter = valuation["valuationEvAvEvRevLTM"];
            }
          }
      } else if (output === "MULT") {
        if (valuation["metric"] === "EV_E") {
          if (valuation["stat"] === "AV") {
            valuationCenter = valuation["valuationMultAvEvEbitdaLTM"];
          } else if (valuation["stat"] === "HIGH") {
            valuationCenter = valuation["valuationMultHighEvEbitdaLTM"];
          } else if (valuation["stat"] === "MED") {
            valuationCenter = valuation["valuationMultAvEvEbitdaLTM"];
          } else {
            valuationCenter = valuation["valuationMultAvEvEbitdaLTM"];
          }
        } else if (valuation["metric"] === "EV_R") {
          if (valuation["stat"] === "AV") {
            valuationCenter = valuation["valuationMultAvEvRevLTM"];
          } else if (valuation["stat"] === "HIGH") {
            valuationCenter = valuation["valuationMultHighEvRevLTM"];
          } else if (valuation["stat"] === "MED") {
            valuationCenter = valuation["valuationMultAvEvRevLTM"];
          } else {
            //console.log("manin deberia estar aqui")
            valuationCenter = valuation["valuationMultAvEvRevLTM"];
            //console.log(valuation["valuationMultAvEvRevLTM"])
          }
        }
      }
    
      let minValuation = valuationCenter - valuationCenter * valuation["spread"];
      let maxValuation = valuationCenter + valuationCenter * valuation["spread"];
      valuation = {
        name: valuation["valuationName"],
        minValuation: minValuation,
        maxValuation: maxValuation,
        footballFieldId: valuation["footballFieldId"],
        valuationTimeSeries: valuation["valuationTimeSeries"],
        metric: valuation["metric"],
        stat: valuation["stat"],
        color: valuation["color"],
        spread: valuation["spread"]
      };
      valuations.push(valuation);
    }
    return valuations;
  }
  

//UseEffect. Level 1.

useEffect(() => {
  async function getValuations() {
    console.log("footballField Output")
    console.log(footballFieldOutput)
    let data = await retrieveValuations();
    console.log("dataKLK")
    console.log(data)
    console.log("en este primer useffect")

    let val=valuationNumbers(data, footballFieldOutput)
    console.log("val:")
    console.log(val)
    setTableValues(val)
    //setValuations(val);
    console.log("here")
  }
  getValuations();
}, []);

const addValuation= () => {
  const valuationTS = Math.floor(Date.now() * 1000).toString();
  fetch('http://10.239.21.226:5000/valuations',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            targetId:targetId,
            footballFieldTimeSeries:footballFieldTimeSeries,
            valuationTimeSeries:valuationTS,

            
          })}
      )
      .then(resp=>resp.text())
      .then(resp => {
        if (resp === "Successful VALUATION POST") {
          console.log(resp)
          setShowValuationControls(true)
          setValuationTimeSeries(valuationTS)
          setValuationId(targetId+"-"+footballFieldTimeSeries+"-"+valuationTS)
          setValuationStat("Mean")
          setValuationMetric("EV_R")
          setValuationSpread(0.1)
          setValuationColor("#94c0cc")
          //navigation.navigate('Coverage', { userId: resp});
        }
      })     
}



function updateFootballFieldName(newName)  {
  setFootballFieldName(newName);
  let url="http://10.239.21.226:5000/footballFields/names/" + targetId +"/"+ footballFieldTimeSeries;
  fetch(url,{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            footballFieldName:newName
            })}
      )
      .then(resp=>resp.text())
      .then(resp=>console.log(resp))
}

const deleteFootballField= () => {
  console.log("tryna delete ff")
  fetch('http://10.239.21.226:5000/footballFields',{
          method:'DELETE',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            footballFieldTimeSeries:footballFieldTimeSeries,
            targetId:targetId})}
      )
      .then(resp=>resp.text())
      .then(resp => {
        if (resp === "Success deleting FF") {
          navigation.navigate('HomeScreen', {
            userName: userName,
            userEmail: userEmail,
            userId: userId,
            targets: targets,
          })
        }
        else{
          alert(resp)
        }
      })    
     
}
const FootballFieldWrapper = () => {
  return (
    <View style={{ flex: 1 }}>
      <FootballFieldControls />
      <FootballField />
    </View>
  );
};

        //FootballFieldChart()
function FootballFieldChart() {

  return (

    <View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
      
        {valuations.map((valuation) => {
          console.log("valuations")
          console.log(valuations)
          console.log(valuations.length)
          console.log("valuation")
          console.log(valuation)
          if (!isNaN(valuation.minValuation - table.minRange)) {
            return (
              <View style={{ marginTop: 5 }} key={valuation.name}>
                <Text>{valuation.name}</Text> {/*Rethink what I have below*/}
                <TouchableOpacity onPress={() => {    setShowValuationControls(true); 
                                                      setValuationRender(valuation);
                                                      setValuationId(valuation.footballFieldId+"-"+valuation.valuationTimeSeries)
                                                      setValuationTimeSeries(valuation.valuationTimeSeries)
                                                      setValuationMetric(valuation.metric)
                                                      setValuationSpread(valuation.spread)
                                                      setValuationColor(valuation.color)
                                                      setValuationStat(valuation.stat)}}>
                  <View
                    style={{
                      marginStart: (valuation.minValuation - table.minRange) * pixelsPerDollar,
                      backgroundColor: valuation.color,
                      height: valuationHeight,
                      width: (valuation.maxValuation - valuation.minValuation) * pixelsPerDollar,
                      marginTop: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
      {footballFieldOutput === "EV" && (
        <Text style={{ textAlign: "right", marginBottom: 10, marginRight: 10, color: "gray" }}>
          ($ in {footballFieldScale})
        </Text>
      )}

    </View>
  );

} 

function FootballFieldControls() {
  console.log("FootballFieldControls")

    return(
    <View style={{ flex: 1, margin: 10, height: 200, width: 400, borderWidth: 1 }}>
      <View style={{ alignItems: 'center' }}> 
              <TouchableOpacity 
              style={{ alignItems: 'center', backgroundColor: 'blue', padding: 5, borderRadius: 5, width: 200 }} 
              onPress={() => {
                addValuation()

              }}>
                <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Add Valuation</Text>
              </TouchableOpacity>
      </View>
      <View>

      <TextInput 
        style={{ 
          marginTop: 10, 
          height: 40, 
          width: 250, 
          padding: 5, 
          borderRadius: 10, 
          backgroundColor: '#FFF'
        }}
        placeholder="Football Field Name"
        value={ffName}
        onChangeText={setFootballFieldName}
        onBlur={() => updateFootballFieldName(ffName)}
        keyboardType="default"
      />
        <TextInput style={{ marginTop: 5, height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
        placeholder="Target Name or Ticker"
        value={targetSymbol}
        //onChangeText={(text) => {
          //setTargetSymbol(text);
        //}}
        keyboardType="default"
        />
      </View>

      <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', zIndex: 200 }}>
        <Text style={{ color: 'white' }}>Output</Text>
        <View style={{ marginLeft: 20 }}>
          <DropDownPicker
            style={{ backgroundColor: 'white', height: 45, width: 300 }}
            containerStyle={{ width: 300 }}
            open={openOutput}
            setOpen={setOpenOutput}
            onOpen={() => setOpenScale(false)}
            value={footballFieldOutput}
            setValue={setFootballFieldOutput}
            items={outputItems}
            setItems={setOutputItems}
          />
        </View> 
      </View>
      <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', zIndex: 100 }}>
        <Text style={{ color: 'white' }}>Scale</Text>
          <View style={{ marginLeft: 20 }}>
            <DropDownPicker
              style={{ backgroundColor: 'white', height: 45, width: 300 }}
              containerStyle={{ width: 300 }}
              open={openScale}
              setOpen={setOpenScale}
              onOpen={() => setOpenOutput(false)}
              value={footballFieldScale}
              setValue={setFootballFieldScale}
              items={scaleItems}
              setItems={setScaleItems}
            />
          </View> 
      </View>
      <View style={{ alignItems: 'center', marginTop: 15 }}>
        <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'red', padding: 5, borderRadius: 5, width: 200 }}onPress={() => {deleteFootballField()}}>
          <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Delete</Text>
        </TouchableOpacity>
      </View>
      <FootballFieldChart footballFieldOutput={footballFieldOutput} />
    </View>  
    );
  
}

                  


  return (
    
      <SafeAreaView style={{ flex: 2, alignItems: 'center', backgroundColor: '#000' }}>
        <View style={{ flex: 1, backgroundColor: '#FFF', height: 0.4*(windowHeight), width: valuationWidth, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: valuationWidth-40, marginStart: 10 }}>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>{ffName}</Text>
            <Text style={{ marginTop: 10 }}>{targetSymbol}</Text>
          </View>
          {Object.keys(table).length > 0 && (
            footballFieldOutput === "EV" ? (
              footballFieldScale === "billions" ? (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: valuationWidth-40, marginStart: 20 }}>
                  <Text>{"$" + (table.minRange / 1000000000).toFixed(2)}</Text>
                  <Text>{"$" + (tableMean / 1000000000).toFixed(2)}</Text>
                  <Text>{"$" + (table.maxRange / 1000000000).toFixed(2)}</Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: valuationWidth-40, marginStart: 20 }}>
                  <Text>{"$" + (table.minRange / 1000000).toFixed(2)}</Text>
                  <Text>{"$" + (tableMean / 1000000).toFixed(2)}</Text>
                  <Text>{"$" + (table.maxRange / 1000000).toFixed(2)}</Text>
                </View>
              )
            ) : (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: valuationWidth-40, marginStart: 20 }}>
                  <Text>{"X " + (table.minRange).toFixed(2)}</Text>
                  <Text>{"X " + (tableMean).toFixed(2)}</Text>
                  <Text>{"X " + (table.maxRange).toFixed(2)}</Text>
              </View>
            )
          )}
          {/* In theory, when a valuation bar is pressed it should display the comp controls */}
          <View style={{ backgroundColor: 'black', height: 1, width: valuationWidth-40, marginLeft: 20, marginTop: 5 }}/>
          {/*showValuationControls ? <ValuationControls/>:<FootballFieldControls onRender={() => {setShowValuationControls(true)}}/>*/} 
        </View>

        

        {/*showValuationControls ? <ValuationControls onClose={() => { setShowValuationControls(false)}}/>:<FootballFieldControls onRenderComps={() => { setShowValuationControls(true) }}/>*/}
        {/* <View style={{ margin: 0, height: 200, width: 400, borderWidth: 1 }}>
            <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'black', backgroundColor: 'light-gray', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>Comp (Ticker)</Text>
              <Text style={{ color: 'black', backgroundColor: 'light-gray', borderTopLeftRadius: 10, borderTopRightRadius: 10  }}> Multiple</Text>
            </View>
        </View> */}
        {/* <View style={[styles.bottomButtons, { flexDirection:"row" }]}>
          <TouchableOpacity style={styles.button_1} onPress={() => navigation.navigate('Coverage')}>
            <Text style={styles.buttonText_1}>Coverage</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_2} onPress={() => navigation.navigate('FootballField', { targetId: latestFF.targetId, footballFieldName:latestFF.footballFieldName,footballFieldTimeSeries:latestFF.footballFieldTimeSeries})}>
            <Image style={styles.buttonLogo} source={require('./logo_ff.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button_3}>
            <Text style={styles.buttonText_1}>Profile</Text>
          </TouchableOpacity>
        </View> */}
        <FootballFieldWrapper />
    </SafeAreaView>
  );

          

}


export default FootballField;
const styles = StyleSheet.create({
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






