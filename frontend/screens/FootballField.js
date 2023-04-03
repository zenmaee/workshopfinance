import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker'

// const InlinePicker = ({ selectedValue, onValueChange, options }) => {
//   return(
//     <Picker
//     selectedValue={selectedValue}
//     onValueChange={onValueChange}
//     style={{ marginLeft: 20, backgroundColor: 'white', height: 130, width: 300 }}
//     >
//     {options.map(option => <Picker.Item label={option.label} value={option.value}/>)}
//   </Picker>
//   );
// }

const FootballField = ({ route, navigation }) => {
  console.log(route.params); 
  const {targetId, footballFieldName,footballFieldTimeSeries} = route.params; //newFootballField=1 will be a recently created one. If this =0, it is an old one
  const targetSymbol = targetId.split("-")[1]
  
  const [footballFieldId, setFootballFieldId]=useState("")

  // const [footballFieldOutput, setFootballFieldOutput]=useState("EV") // Picker value
  const [openOutput, setOpenOutput] = useState(false);
  const [footballFieldOutput, setFootballFieldOutput]=useState(null)
  const [outputItems, setOutputItems]=useState([
    {label: 'Enterprise Value', value: 'EV' },
    {label: 'Multiples', value: 'MULT' }
  ])

  // const [footballFieldScale, setFootballFieldScale]=useState("billions")
  const [openScale, setOpenScale] = useState(false);
  const [footballFieldScale, setFootballFieldScale]=useState(null)
  const [scaleItems, setScaleItems]=useState([
    { label: "Millions", value: "millions" }, 
    { label: "Billions", value: "billions" }
  ])
 
  // const [footballFieldMetric, setFootballFieldMetric]=useState("EV_E")
  const [openMetric, setOpenMetric]=useState(false);
  const [valuationMetric, setValuationMetric]=useState(null);
  const [metricItems, setMetricItems]=useState([
    { label: "EV/Revenue (LTM)", value: "EV_R" }, 
    { label: "EV/EBITDA (LTM)", value: "EV_E" }
  ])

  // const [valuationStat, setValuationStat]=useState("")
  const [openStat, setOpenStat]=useState(false);
  const [valuationStat, setValuationStat]=useState(null);
  const [statItems, setStatItems]=useState([
    { label: "Mean", value: "Mean" }, 
    { label: "Median", value: "Median" },
    { label: "High", value: "High" }, 
    { label: "Low", value: "Low" }
  ])

  const [valuationId, setValuationId]=useState("")
  const [valuationCompsDate, setValuationCompsDate]=useState("")
  const [footballFieldStat, setFootballFieldStat]=useState("AV")
  const [valuationSpread, setValuationSpread]=useState("")
  const [valuationColor, setValuationColor]=useState("")
  const [valuationName, setValuationName]=useState("")
  const [compSymbol, setCompSymbol]=useState("")
  const [valuationTimeSeries, setValuationTimeSeries]=useState("")
  const [response, setResponse]=useState([])
  const [valuations, setValuations] = useState([]);

  const [showCompControls, setShowCompControls] = useState(false);
  const [showValuationControls, setShowValuationControls] = useState(false);

  function searchTicker(input) {
    return fetch('http://10.239.251.136:5000/ticker/' + input, { 
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
    /*try {
      // Assuming `search_company` is defined somewhere else
      res_company = search_company(input);
    } catch (error) {
      // handle runtime error, type error, or name error
    }*/
    try {
      res_ticker = searchTicker(input);
    } catch (error) {
      // handle runtime error, type error, or name error
    }
    // Since `searchTicker` returns a Promise, we need to handle it asynchronously
    Promise.all([res_company, res_ticker])
      .then(([companyResults, tickerResults]) => {
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

  let compArray = []

  for(let i = 0; i < 2; i++) {
    compArray.push({
      ticker: 'AAPL',
      mult: 5, 
    });
  }

  function CompControls() {
    return(
      <View>
        <View style={{ padding: 50 }}>
          <Text style={{ color: 'black' }}>Valuation #1 (EV/EBITDA) (LTM)</Text>
          <View style={{ backgroundColor: 'red', marginTop: 5, height: valuationHeight, width: 150 }}/>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 2, alignText: 'left', color: 'black', backgroundColor: 'gray', padding: 5 }}>Comp (Ticker)</Text>
            <Text style={{ flex: 1, color: 'black', backgroundColor: 'gray', padding: 5, marginLeft: 2 }}>Multiple</Text>
          </View>
          <ScrollView contentContainerStyle={{ }} /*keyboardDismissMode='on-drag'*/>
            { compArray.map(comp => {
                return (
                  <View style={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                    <View style={{ flex: 2, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}>
                      <Text>{comp.ticker}</Text>
                    </View>
                    <View style={{ flex: 0.75, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 2}}>
                      <Text>{comp.mult}</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 0.25 }}>
                      <Image style={{ height: 25, width: 20, borderRadius: 4, margin: 2 }} source={require('./delete_icon.png')}/>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
              <View style={{ flex: 2, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}>
                  <Text>**Valuation Stat and Metric**</Text>
                </View>
                <View style={{ flex: 1, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 2}}>
                  <Text>**Valuation Multiple**</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  function FootballFieldChart() {
    return(
      <View>
        <ScrollView
          contentContainerStyle={{ 
            padding: 20 
          }}
        >
          { valuations.map(( valuation ) => {
            return (
            <>
              <View style={{ marginTop: 5 }}>
                <Text>{valuation.name}</Text>
                {/* <View style={{ marginStart: (valuation.minValuation-table.minRange)*pixelsPerDollar, backgroundColor: valuation.color, height: valuationHeight, width: (valuation.maxValuation-valuation.minValuation)*pixelsPerDollar, marginTop: 5 }}></View> */}
                <TouchableOpacity
                  onPress={() => {
                    renderComps()
                  }}>
                  <View style={{ marginStart: 0, backgroundColor: valuation.color, height: valuationHeight, width: 0, marginTop: 5 }}/>
                </TouchableOpacity>
              </View>
            </>
            )
          })}
        </ScrollView>
        {footballFieldOutput==="EV" && (
          <Text style={{ textAlign: 'right', marginBottom: 10, marginRight: 10, color: 'gray' }}>($ in {footballFieldScale})</Text>
        )}
      </View>
    );
  }

  function ValuationControls({ onClose }) {
    return(
      <View style={{ flex: 1, height: 200, width: 400, borderWidth: 1 }}>
          <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Comp Name</Text>
            <TextInput style={{ marginTop: 5, margin: 10, height: 40, width: 200, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
              placeholder="Company Name or Ticker"
              onChangeText={(text) => find_company_name(text)}>
            </TextInput>
            <TouchableOpacity 
              title="Add Comp"
              style={{
                borderRadius: 5,
                backgroundColor: 'blue',
                padding: 10
              }}
              onPress={() => {
                addComp()
              }}>
              <Text style={{ color: '#FFF' }}>Add Comp</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', zIndex: 200 }}>
            <Text style={{ color: 'white' }}>Metric</Text>
            {/* <InlinePicker
              selectedValue={footballFieldOutput}
              onValueChange={(itemValue, itemIndex) =>
                setFootballFieldOutput(itemValue)}
              options = {[
                { label: "EV/Revenue (LTM)",
                  value: "EV_R"
                }, {
                  label: "EV/EBITDA (LTM)",
                  value: "EV_E"
                },
              ]}/> */}
              <View style={{ marginLeft: 20 }}>
                <DropDownPicker
                  style={{ backgroundColor: 'white', height: 45, width: 300 }}
                  containerStyle={{ width: 300 }}
                  open={openMetric}
                  setOpen={setOpenMetric}
                  onOpen={() => setOpenStat(false)}
                  value={valuationMetric}
                  setValue={setValuationMetric}
                  items={metricItems}
                  setItems={setMetricItems}
                />
              </View> 
          </View>
          <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', zIndex: 100 }}>
            <Text style={{ color: 'white' }}>Stat</Text>
              <View style={{ marginLeft: 20 }}>
                <DropDownPicker
                  style={{ backgroundColor: 'white', height: 45, width: 300 }}
                  containerStyle={{ width: 300 }}
                  open={openStat}
                  setOpen={setOpenStat}
                  onOpen={() => setOpenMetric(false)}
                  value={valuationStat}
                  setValue={setValuationStat}
                  items={statItems}
                  setItems={setStatItems}
                />
              </View> 
            {/* <InlinePicker
              selectedValue={footballFieldOutput}
              onValueChange={(itemValue, itemIndex) =>
                setFootballFieldOutput(itemValue)}
              options = {[
                { label: "Mean",
                  value: "Mean"
                }, {
                  label: "Median",
                  value: "Median"
                },
                { label: "High",
                value: "High"
              }, {
                label: "Low",
                value: "Low"
              },
              ]}/> */}
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
            <TouchableOpacity 
            onPress={() => {
              onClose()
            }}>
              <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Back to Football Field Controls</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }}>
              <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Delete</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }

  function FootballFieldControls({ onAdd }) {
    return(
    <View style={{ flex: 1, margin: 10, height: 200, width: 400, borderWidth: 1 }}>
      <View style={{ alignItems: 'center' }}> 
              <TouchableOpacity 
              style={{ alignItems: 'center', backgroundColor: 'blue', padding: 5, borderRadius: 5, width: 200 }} 
              onPress={() => {
                onAdd()
              }}>
                <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Add Valuation</Text>
              </TouchableOpacity>
      </View>
      <View>
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
          setTargetSymbol(text);
        }}
        keyboardType="default"
        />
      </View>

      <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', zIndex: 200 }}>
        <Text style={{ color: 'white' }}>Output</Text>
        {/* <InlinePicker
          selectedValue={footballFieldOutput}
          onValueChange={(itemValue, itemIndex) => {
            setFootballFieldOutput(itemValue);
            valuationNumbers(valuations, footballFieldOutput, footballFieldMetric, footballFieldStat);
          }}
          options={[    
            { label: "Enterprise Value", value: "EV" },   
            { label: "Multiples", value: "MULT" },
            ]}
        /> */}
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
        {/* <InlinePicker
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
          ]}/> */}
      </View>
      <View style={{ alignItems: 'center', marginTop: 15 }}>
        <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'red', padding: 5, borderRadius: 5, width: 200 }}>
          <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>  
    );
  }

  /*
  function retrieveFootballField() {
    const url = 'http://10.239.106.85:5000/footballfields/'+targetId+'/'+footballFieldTimeSeries;  
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data && data.length > 0) {
          const footballFieldName = data[0].footballFieldName;
          const targetId = data[0].targetId;
          const targetSymbol = targetId.split("-")[1];
          return [footballFieldName, targetSymbol];
        } else {
          throw new Error("Invalid response data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return [];
      });
  }*/
  
  const updateFootballFieldName= () => {
    let url="http://10.239.251.136:5000/footballFields/names/" + targetId +"/"+ footballFieldTimeSeries;
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
    fetch('http://10.0.0.187:5000/footballfields',{
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
    fetch('http://10.239.242.79:5000/valuations',{
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
    
    let url = "http://10.239.251.136:5000/valuations/" + targetId +"-"+footballFieldTimeSeries;
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
        return valuations;
      }
      
  

  
  useEffect(() => {
    async function getValuations() {
      let data = await retrieveValuations();
      let val=valuationNumbers(data, footballFieldOutput, footballFieldMetric, footballFieldStat)
      console.log(val)
      setValuations(val);
    }
    getValuations();
  }, []);


  /*
  useEffect(() => {
    async function getFootballField() {
      let footballField = await retrieveFootballField();
      setFootballFieldName(footballField[0]);
      setTargetSymbol(footballField[1]);

    }
    getFootballField();
  }, []);*/

    const generateValuation= () => {
    fetch('http://10.239.242.79:5000/valuations',{
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
    fetch('http://10.239.242.79:5000/valuations/names',{
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
    fetch('http://10.239.242.79:5000/valuations',{
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


  function addComp (valuationId, compSymbol, )  {
    fetch('http://10.239.251.136:5000/comps',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              compSymbol:compSymbol,
              valuationId:valuationId})}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
        
  }


  const deleteComp= () => {
    fetch('http://10.239.251.136:5000/comps',{
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
      <SafeAreaView style={{ flex: 2, alignItems: 'center', backgroundColor: '#000' }}>
        <View style={{ flex: 1, backgroundColor: '#FFF', height: 0.4*(windowHeight), width: valuationWidth, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: valuationWidth-40, marginStart: 10 }}>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>{footballFieldName}</Text>
            <Text style={{ marginTop: 10 }}>{targetSymbol}</Text>
          </View>
          {table.maxValuations.length > 0 && (
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
                <Text>{table.minRange}</Text>
                <Text>{tableMean}</Text>
                <Text>{table.maxRange}</Text>
              </View>
            )
          )}
          <View style={{ backgroundColor: 'black', height: 1, width: valuationWidth-40, marginLeft: 20, marginTop: 5 }}/>
          {showCompControls ? <CompControls/>:<FootballFieldChart/>}
        </View>
        

        {showValuationControls ? <ValuationControls onClose={() => { setShowValuationControls(false); setShowCompControls(false); }}/>:<FootballFieldControls onAdd={() => { setShowValuationControls(true); setShowCompControls(true); }}/>}
        {/* <View style={{ margin: 0, height: 200, width: 400, borderWidth: 1 }}>
            <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'black', backgroundColor: 'light-gray', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>Comp (Ticker)</Text>
              <Text style={{ color: 'black', backgroundColor: 'light-gray', borderTopLeftRadius: 10, borderTopRightRadius: 10  }}> Multiple</Text>
            </View>
        </View> */}
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