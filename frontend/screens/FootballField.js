import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker'

const FootballField = ({ route, navigation }) => {
  const {targetId, footballFieldName,footballFieldTimeSeries} = route.params; //newFootballField=1 will be a recently created one. If this =0, it is an old one
  const targetSymbol = targetId.split("-")[1]
  
  const [footballFieldId, setFootballFieldId]=useState("")

  // const [footballFieldOutput, setFootballFieldOutput]=useState("EV") // Picker value
  const [openOutput, setOpenOutput] = useState(false);
  const [footballFieldOutput, setFootballFieldOutput]=useState("EV")
  const [outputItems, setOutputItems]=useState([
    {label: 'Enterprise Value', value: 'EV' },
    {label: 'Multiples', value: 'MULT' }
  ])

  // const [footballFieldScale, setFootballFieldScale]=useState("billions")
  const [openScale, setOpenScale] = useState(false);
  const [footballFieldScale, setFootballFieldScale]=useState("millions")
  const [scaleItems, setScaleItems]=useState([
    { label: "Millions", value: "millions" }, 
    { label: "Billions", value: "billions" }
  ])
 
  // const [footballFieldMetric, setFootballFieldMetric]=useState("EV_E")
  const [openMetric, setOpenMetric]=useState(false);
  const [valuationMetric, setValuationMetric]=useState("EV_R");
  const [metricItems, setMetricItems]=useState([
    { label: "EV/Revenue (LTM)", value: "EV_R" }, 
    { label: "EV/EBITDA (LTM)", value: "EV_E" }
  ])

  // const [valuationStat, setValuationStat]=useState("")
  const [openStat, setOpenStat]=useState(false);
  const [valuationStat, setValuationStat]=useState("Mean");
  const [statItems, setStatItems]=useState([
    { label: "Mean", value: "Mean" }, 
    { label: "Median", value: "Median" },
    { label: "High", value: "High" }, 
    { label: "Low", value: "Low" }
  ])

  const [valuationId, setValuationId]=useState("")
  const [valuationCompsDate, setValuationCompsDate]=useState("")
  const [footballFieldStat, setFootballFieldStat]=useState("AV")
  // const [footballFieldOutput, setFootballFieldOutput]=useState("EV")
  // const [footballFieldScale, setFootballFieldScale]=useState("billions")
  // const [valuationMetric, setValuationMetric]=useState("EV_E")
  // const [valuationStat, setValuationStat]=useState("AV")
  const [valuationTimeSeries, setValuationTimeSeries]=useState("")
  const [valuationSpread, setValuationSpread]=useState("")
  const [valuationColor, setValuationColor]=useState("")
  const [valuationName, setValuationName]=useState("")
  const [compSymbol, setCompSymbol]=useState("")
  const [valuations, setValuations] = useState([]);
  const [ffName, setFootballFieldName]=useState(footballFieldName)
  const [showCompControls, setShowCompControls] = useState(false);
  const [showValuationControls, setShowValuationControls] = useState(false);
  const [table, setTable] = useState([]);
  const [tableMean, setTableMean] = useState();
  const [tableRange, setTableRange] = useState();
  const [pixelsPerDollar, setPixelsPerDollar] = useState();



  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const valuationWidth = windowWidth-20;
  const valuationHeight = 20;
  function setTableValues(valuations){
    const tab = {
      maxValuations: [],
      minValuations: []
    };
    
    for (const valuation of valuations) {
      if (!isNaN(valuation.maxValuation) && !isNaN(valuation.minValuation)) {
        tab.maxValuations.push(valuation.maxValuation);
        tab.minValuations.push(valuation.minValuation);
      }
    }
    
    tab.maxRange = Math.max(...tab.maxValuations);
    tab.minRange = Math.min(...tab.minValuations);
    
    const tableRange = tab.maxRange - tab.minRange;
    const tableMean = (tab.maxRange + tab.minRange) / 2;
    const pixelsPerDollar = (valuationWidth-20-20) / tableRange;
    setTable(tab)
    setTableRange(tableRange)
    setTableMean(tableMean)
    setPixelsPerDollar(pixelsPerDollar)
    console.log("tableSET")
    console.log(tab)
    console.log(table)

}  

  function searchTicker(input) {
    return fetch('http://10.239.15.244:5000/ticker/' + input, { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((resp) => resp.json()) // Parse response as JSON
    .then((data) => {
      console.log("data")
      console.log(data)
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


  function CompControls() {
    const [comps, setComps] = useState([]);


    function retrieveComps() {
      let url = `http://10.239.15.244:5000/comps/${targetId}-${footballFieldTimeSeries}-${valuationTimeSeries}`;
      return fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          return [];
        });
    }
  
    useEffect(() => {
      async function getComps() {
        let data = await retrieveComps();
        setComps(data);
      }
      getComps();
    }, []);

    function calculateMedian(values) {
      values.sort((a, b) => a - b);
      const half = Math.floor(values.length / 2);
      if (values.length % 2 === 0) {
        return (values[half - 1] + values[half]) / 2;
      } else {
        return values[half];
      }
    }
    
    function calculateAverage(values) {
      return values.reduce((a, b) => a + b, 0) / values.length;
    }
    
    return (
      <View>
        <View style={{ padding: 50 }}>
          <Text style={{ color: 'black' }}>Valuation</Text>
          <View style={{ backgroundColor: 'red', marginTop: 5, height: valuationHeight, width: 150 }}/>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ flex: 2, textAlign: 'left', color: 'black', backgroundColor: 'gray', padding: 5 }}>Comp (Ticker)</Text>
            <Text style={{ flex: 1, color: 'black', backgroundColor: 'gray', padding: 5, marginLeft: 2 }}>Multiple</Text>
          </View>
          <ScrollView contentContainerStyle={{}} /*keyboardDismissMode='on-drag'*/>
            {comps.map((comp) => {
              return (
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                  <View style={{ flex: 2, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}>
                    <Text>{comp.compSymbol}</Text>
                  </View>
                  <View style={{ flex: 0.75, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 2 }}>
                    {valuationMetric === 'EV_E' ? <Text>{comp.evToEbitdaLTM}</Text> : valuationMetric === 'EV_R' ? <Text>{comp.evToRevenueLTM}</Text> : null}
                  </View>
                  <TouchableOpacity style={{ flex: 0.25 }}>
                    <Image style={{ height: 25, width: 20, borderRadius: 4, margin: 2 }} source={require('./delete_icon.png')}/>
                  </TouchableOpacity>
                </View>
              );
            })}
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
            <View style={{ flex: 2, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}>
              <Text>{valuationStat} {valuationMetric}</Text>
            </View>
            <View style={{ flex: 1, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 2 }}>
              {valuationStat === 'Median' && (
                <Text>
                  {valuationMetric === "EV_E" ? calculateMedian(comps.map(comp => comp.evToEbitdaLTM)) : calculateMedian(comps.map(comp => comp.evToRevenueLTM))}
                </Text>
              )}
              {valuationStat === 'High' && (
                <Text>
                  {valuationMetric === "EV_E" ? Math.max(...comps.map(comp => comp.evToEbitdaLTM)) : Math.max(...comps.map(comp => comp.evToRevenueLTM))}
                </Text>
              )}
              {valuationStat === 'Low' && (
                <Text>
                  {valuationMetric === "EV_E" ? Math.min(...comps.map(comp => comp.evToEbitdaLTM)) : Math.min(...comps.map(comp => comp.evToRevenueLTM))}
                </Text>
              )}
              {valuationStat === 'Average' && (
                <Text>
                  {valuationMetric === "EV_E" ? calculateAverage(comps.map(comp => comp.evToEbitdaLTM)) : calculateAverage(comps.map(comp => comp.evToRevenueLTM))}
                </Text>
              )}
            </View>
          </View>

          </ScrollView>
        </View>
      </View>
    );
  }

  function FootballFieldChart({ onRenderComps}) {
    
    return (
      <View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {valuations.map((valuation) => {
            console.log("minVALUATION")
            console.log(valuation.minValuation)
            console.log("table")
            console.log(table)
            console.log(valuation.minValuation - table.minRange)
            if (!isNaN(valuation.minValuation - table.minRange)) {
              return (
                <View style={{ marginTop: 5 }} key={valuation.name}>
                  <Text>{valuation.name}</Text>
                  <View
                    style={{
                      marginStart: (valuation.minValuation - table.minRange) * pixelsPerDollar,
                      backgroundColor: valuation.color,
                      height: valuationHeight,
                      width: (valuation.maxValuation - valuation.minValuation) * pixelsPerDollar,
                      marginTop: 5,
                    }}
                  />
                  <TouchableOpacity onPress={() => onRenderComps()}>
                    <View style={{ marginStart: 0, backgroundColor: valuation.color, height: valuationHeight, width: 0, marginTop: 5 }}/>
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

  function ValuationControls({ onClose }) {
    return(
      <View style={{ flex: 1, height: 200, width: 400, borderWidth: 1 }}>
          <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Add Comp</Text>
                <TextInput 
                  style={{ marginTop: 5, margin: 10, height: 40, width: 200, padding: 5, borderRadius: 10, backgroundColor: '#FFF' }}
                  placeholder="Company Name or Ticker"
                  value={compSymbol}
                  onChangeText={(text) => {
                    //find_company_name(text);
                    setCompSymbol(text);
                  }}
                />
                <TouchableOpacity 
                    title="Add Comp"
                    onPress={() => {
                      addComp(compSymbol)
                    }}>
                      <Image style={{ height: 50, width: 50, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./plus_icon.png')}/>
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
          <View style={{ justifyContent: 'space-between', marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
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
    const addValuation= (targetId, footballFieldTimeSeries) => {
      const valuationTS = Math.floor(Date.now() * 1000).toString();
      fetch('http://10.239.15.244:5000/valuations',{
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
              
              onAdd()
              setValuationTimeSeries(valuationTS)
              setValuationId(targetId+"-"+footballFieldTimeSeries+"-"+valuationTS)
              //navigation.navigate('Coverage', { userId: resp});
            }
          })     
    }

    return(
    <View style={{ flex: 1, margin: 10, height: 200, width: 400, borderWidth: 1 }}>
      <View style={{ alignItems: 'center' }}> 
              <TouchableOpacity 
              style={{ alignItems: 'center', backgroundColor: 'blue', padding: 5, borderRadius: 5, width: 200 }} 
              onPress={() => {
                addValuation(targetId, footballFieldTimeSeries)

              }}>
                <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Add Valuation</Text>
              </TouchableOpacity>
      </View>
      <View>
        <TextInput style={{ marginTop: 10, height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
          placeholder="Football Field Name"
          value={ffName}
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
        <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'red', padding: 5, borderRadius: 5, width: 200 }}>
          <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>  
    );
  }
  
  const updateFootballFieldName= () => {
    let url="http://10.239.15.244:5000/footballFields/names/" + targetId +"/"+ footballFieldTimeSeries;
    console.log("updateffname_v2")
    fetch(url,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldName:ffName
              })}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
  }

  const deleteFootballField= () => {
    fetch('http://10.239.15.244:5000/footballfields',{
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
  
  

  function retrieveValuations() {
    
    let url = "http://10.239.15.244:5000/valuations/" + targetId +"-"+footballFieldTimeSeries;
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("valuations")
        console.log(data)
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
      console.log("data")
      console.log(data)
      let val=valuationNumbers(data, footballFieldOutput, valuationMetric, valuationStat)
      console.log(val)
      setTableValues(val)
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

    function generateValuation() {
    fetch('http://10.239.15.244:5000/valuations',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              targetId:targetId,
              valuationName:"Changing name",
              footballFieldTimeSeries:footballFieldTimeSeries,
              valuationTimeSeries:valuationTimeSeries,
              targetSymbol:targetSymbol,
            })}
        )
        .then(resp=>resp.text())
        .then(resp=>console.log(resp))
       
  }
  
  const updateValuationName= () => {
    fetch('http://10.239.15.244:5000/valuations/names',{
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
    fetch('http://10.239.15.244:5000/valuations',{
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


  function addComp (compSymbol)  {
    fetch('http://10.239.15.244:5000/comps',{
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
        generateValuation()
        
  }


  const deleteComp= () => {
    fetch('http://10.239.15.244:5000/comps',{
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
      <SafeAreaView style={{ flex: 2, alignItems: 'center', backgroundColor: '#000' }}>
        <View style={{ flex: 1, backgroundColor: '#FFF', height: 0.4*(windowHeight), width: valuationWidth, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: valuationWidth-40, marginStart: 10 }}>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>{ffName}</Text>
            <Text style={{ marginTop: 10 }}>{targetSymbol}</Text>
          </View>
          {table.length > 0 && (
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
          {/* In theory, when a valuation bar is pressed it should display the comp controls */}
          <View style={{ backgroundColor: 'black', height: 1, width: valuationWidth-40, marginLeft: 20, marginTop: 5 }}/>
          {showCompControls ? <CompControls/>:<FootballFieldChart onRenderComps={() => {setShowCompControls(true)}}/>} 
        </View>
        

        {showValuationControls ? <ValuationControls onClose={() => { setShowValuationControls(false); setShowCompControls(false); }}/>:<FootballFieldControls onAdd={() => { setShowValuationControls(true); setShowCompControls(true); }}/>}
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