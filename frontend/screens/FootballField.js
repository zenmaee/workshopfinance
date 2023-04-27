import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
//COLORS OF BARS:
//BLUE: #94c0cc
//ORANGE: #fad48b
//GREEN: #bcdf8a
//LIME: #f5f9ad

//Original function level 0.
const FootballField = ({ route, navigation }) => {

  const {userName, userEmail, userId,targets, targetId, footballFieldName,footballFieldTimeSeries} = route.params; //Params we obtain from other screens
  const targetSymbol = targetId.split("-")[1] //tgtSymbol obtained
  const [footballFieldId, setFootballFieldId]=useState("")
  // const [footballFieldOutput, setFootballFieldOutput]=useState("EV") // Picker value
  
  //Preparing pickers and inputs:-FootballFieldControls
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
 
  //VALUATION CONTROLS
  // const [footballFieldMetric, setFootballFieldMetric]=useState("EV_E")
  const [openMetric, setOpenMetric]=useState(false);
  const [valuationMetric, setValuationMetric]=useState();
  const [metricItems, setMetricItems]=useState([
    { label: "EV/Revenue (LTM)", value: "EV_R" }, 
    { label: "EV/EBITDA (LTM)", value: "EV_E" }
  ])

  // const [valuationStat, setValuationStat]=useState("")
  const [openStat, setOpenStat]=useState(false);
  const [valuationStat, setValuationStat]=useState();
  const [statItems, setStatItems]=useState([
    { label: "Mean", value: "Mean" }, 
    { label: "Median", value: "Median" },
    { label: "High", value: "High" }, 
    { label: "Low", value: "Low" }
  ])

  //ValuationControls
  const [valuationId, setValuationId]=useState("")
  const [valuationRender, setValuationRender]  = useState({})
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
  const [data, setData] = useState([]);
  const [newComp, setNewComp] = useState()


  //
  const [ffName, setFootballFieldName]=useState(footballFieldName)
  const [showCompControls, setShowCompControls] = useState(false);
  const [showValuationControls, setShowValuationControls] = useState(false);
  const [table, setTable] = useState([]);
  const [tableMean, setTableMean] = useState();
  const [tableRange, setTableRange] = useState();
  const [pixelsPerDollar, setPixelsPerDollar] = useState();

  //Preparing table and screen sizes
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const valuationWidth = windowWidth-20;
  const valuationHeight = 20;


  //setTableValues: Function to generate table in which valuations will be drawn. Level 1.
  //useStates: table, tableMean, tableRange, pixelsPerDollar
  function setTableValues(valuations){
    console.log("reseting table values")
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
    console.log("table")
    console.log(table)
    console.log("ffoutput")
    console.log(footballFieldOutput)
}  

//Obtain Ticker by what the user's input. Level 1.
  function searchTicker(input) {
    return fetch('http://10.239.21.226:5000/ticker/' + input, { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((resp) => resp.json()) // Parse response as JSON
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
  }
  
//Obtains list of companies deppending on user input. Level 1.
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
        res_company = companyResults;
        res_ticker = tickerResults;
        res_ticker = res_ticker.sort();
        res_company.sort(function(a, b) {
          return a[1] - b[1];
        });
        let res = res_company.concat(res_ticker);
        let res_final = [...new Set(res)];

        return res_final;
      })
      .catch((error) => {
        console.error("Error:", error);
        return [];
      });
  }

//Comp controls. Level 1.
//valuationTimeSeries, newComp, valuationRender, valuationHeight, pixelsPerDollar
  function CompControls() {
    const [comps, setComps] = useState([]);
    
    //Retrieve comps. Level 2.
    function retrieveComps() {
      let url = `http://10.239.21.226:5000/comps/${targetId}-${footballFieldTimeSeries}-${valuationTimeSeries}`;
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
    //UseEffect. Level 2.
  
    useEffect(() => {
      async function getComps() {
        let data = await retrieveComps();
        console.log("retrieveComps")
        setComps(data);
        if (newComp === 1) {
          console.log("ey aqui estoy tu")
          setNewComp(0)
          console.log(data)
        }
      }
      getComps();
    }, [CompControls, newComp])
    
  
    //Calculation of stats. Level 2.
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
    
    //return of CompsControl.
    console.log("valuationRender")
    console.log(valuationRender)


    return (
      
      <View>
        <View style={{ padding: 20 }}>
          {!isNaN(valuationRender.minValuation) && (
            <View style={{ marginTop: 5 }} key={valuationRender.name}>
              <Text>{valuationRender.name}</Text>
              <View
                style={{
                  marginStart: (valuationRender.minValuation - table.minRange) * pixelsPerDollar,
                  backgroundColor: valuationRender.color,
                  height: valuationHeight,
                  width: (valuationRender.maxValuation - valuationRender.minValuation) * pixelsPerDollar,
                  marginTop: 5,
                }}
      />
    </View>
  )} 
              <View style={{ padding: 30 }}>

                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5}}>
                      <Text style={{ flex: 2, textAlign: 'left', color: 'black', backgroundColor: 'gray', padding: 5 }}>Comp (Ticker)</Text>
                      <Text style={{ flex: 1, color: 'black', backgroundColor: 'gray', padding: 5, marginLeft: 2 }}>Multiple</Text>
                    </View>
                    <ScrollView contentContainerStyle={{}} /*keyboardDismissMode='on-drag'*/>
                      {comps.map((comp) => {
                        console.log("comps")
                        console.log(comp)
                        return (
                          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                            <View style={{ flex: 2, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}>
                              <Text>{comp.compSymbol}</Text>
                            </View>
                            <View style={{ flex: 0.75, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 2 }}>
                              {valuationMetric === 'EV_E' ? <Text>{comp.evToEbitdaLTM.toFixed(2)}</Text> : valuationMetric === 'EV_R' ? <Text>{comp.evToRevenueLTM.toFixed(2)}</Text> : null}
                            </View>
                            <TouchableOpacity style={{ flex: 0.25 }}>
                              <Image style={{ height: 25, width: 20, borderRadius: 4, margin: 2 }} source={require('./delete_icon.png')}/>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                      <View style={{ flex: 2, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}>
                        <Text>{valuationStat} {metricItems.find(item => item.value === valuationMetric)?.label}</Text>
                      </View>
                      <View style={{ flex: 1, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 2 }}>
                        {valuationStat === 'Median' && (
                          <Text>
                            {valuationMetric === "EV_E" ? calculateMedian(comps.map(comp => comp.evToEbitdaLTM)).toFixed(2) : calculateMedian(comps.map(comp => comp.evToRevenueLTM)).toFixed(2)}
                          </Text>
                        )}
                        {valuationStat === 'High' && (
                          <Text>
                            {valuationMetric === "EV_E" ? Math.max(...comps.map(comp => comp.evToEbitdaLTM)).toFixed(2) : Math.max(...comps.map(comp => comp.evToRevenueLTM)).toFixed(2)}
                          </Text>
                        )}
                        {valuationStat === 'Low' && (
                          <Text>
                            {valuationMetric === "EV_E" ? Math.min(...comps.map(comp => comp.evToEbitdaLTM)).toFixed(2) : Math.min(...comps.map(comp => comp.evToRevenueLTM)).toFixed(2)}
                          </Text>
                        )}
                        {valuationStat === 'Mean' && (
                          <Text>
                            {valuationMetric === "EV_E" ? calculateAverage(comps.map(comp => comp.evToEbitdaLTM)).toFixed(2) : calculateAverage(comps.map(comp => comp.evToRevenueLTM)).toFixed(2)}
                          </Text>
                        )}
                      </View>
                    </View>

                    </ScrollView>
                    </View>
        </View>
      </View>
    );
  }


  //FootballField Chart. Level 1.
  function FootballFieldChart({ onRenderComps}) {
    
    return (
      <View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
        
          {valuations.map((valuation) => {
            console.log("valuations")
            console.log(valuations)
            console.log(valuations.length)
            console.log("valuation")
            console.log(valuation)
            /*console.log("minVALUATION")
            console.log(valuation.minValuation)
            console.log("table")
            console.log(table)
            console.log(valuation.minValuation - table.minRange)*/
            if (!isNaN(valuation.minValuation - table.minRange)) {
              return (
                <View style={{ marginTop: 5 }} key={valuation.name}>
                  <Text>{valuation.name}</Text>
                  <TouchableOpacity onPress={() => {    setShowValuationControls(true); 
                                                        setShowCompControls(true); 
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


  //Fuction ValuationControls.Level 1.
  function ValuationControls({ onClose}) {
    
    
    const updateValuationMetric = useCallback(() => {
      fetch('http://10.239.21.226:5000/valuations/metric',{
          method:'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            footballFieldId:targetId+"-"+footballFieldTimeSeries,
            valuationTimeSeries:valuationTimeSeries,
            metric:valuationMetric
          })
        })
        //we'll see later  
      }, [valuationMetric, valuationTimeSeries]);

      const updateValuationStat = useCallback(() => {
      fetch('http://10.239.21.226:5000/valuations/stat',{
          method:'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            footballFieldId:targetId+"-"+footballFieldTimeSeries,
            valuationTimeSeries:valuationTimeSeries,
            metric:valuationStat
          })
        })

      
      }, [valuationStat, valuationTimeSeries]);

      const changeSpread = useCallback((action) => {
      if (action === "increase"){
        if (valuationSpread<=0.5){
          setValuationSpread(valuationSpread+0.05)
        }
        else{
          alert("Max Spread: 50%")
        }
      }else{
        if (valuationSpread>=0){
          setValuationSpread(valuationSpread-0.05)
        }
        else{
          alert("Min Spread: 0%")
        }        
      }
      fetch('http://10.239.21.226:5000/valuations/spread',{
          method:'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            footballFieldId:targetId+"-"+footballFieldTimeSeries,
            valuationTimeSeries:valuationTimeSeries,
            metric:valuationSpread
          })
        })
      }, [valuationSpread]);
    
      const changeColor = useCallback(() => {
      setValuationColor(color)
      fetch('http://10.239.21.226:5000/valuations/color',{
          method:'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            footballFieldId:targetId+"-"+footballFieldTimeSeries,
            valuationTimeSeries:valuationTimeSeries,
            color:color
          })
        })
      }, [valuationColor]);

    console.log("valuationControls")
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
                      console.log("yesaddcomp")
                      console.log(valuationId)
                      fetch('http://10.239.21.226:5000/comps',{
                        method:'POST',
                        headers:{
                          'Accept':'application/json',
                          'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                          compSymbol:compSymbol,
                          valuationId:valuationId
                        })
                      })
                      .then(resp=>resp.json())
                      .then(resp => {
                        console.log(resp)
                        if (resp.success === "Successful Comps Post") {
                          console.log(resp.newComp)
                          console.log("add comp")
                          setNewComp(1);
                          generateValuation();
                        }
                        else {
                          alert(resp.success)
                        }
                      })  
                    }}
                    
                    >
                      <Image style={{ height: 50, width: 50, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./plus_icon.png')}/>
                </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', zIndex: 200 }}>
            <Text style={{ color: 'white' }}>Metric</Text>
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
                  onChangeValue={updateValuationMetric()}
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
                  onChangeValue={updateValuationStat()}

                />
              </View> 
          </View>
          <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Spread</Text>
            
            <TouchableOpacity onPress={() =>changeSpread("decrease")}
              title="Decrease Spread">
              <Image style={{ height: 25, width: 25, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./minus_sign.png') }/>
            </TouchableOpacity>
            <Text style={{ backgroundColor: 'white', fontSize: 15 }}>{valuationSpread*100}%</Text>
            <TouchableOpacity onPress={() =>changeSpread("increase")}
              title="Increase Spread">
              <Image style={{ height: 25, width: 25, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./plus_sign.png') }/>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Color</Text>
            <TouchableOpacity onPress={() =>changeColor("#94c0cc")}
              title="Blue">
              <Image style={{ height: 25, width: 40, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./blue_color.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>changeColor("#bcdf8a")}
              title="Green">
              <Image style={{ height: 25, width: 40, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./green_color.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>changeColor("#fad48b")}
              title="Orange">
              <Image style={{ height: 25, width: 40, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./orange_color.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>changeColor("#f5f9ad")}
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
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }} >
              <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Delete</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
    }

 //FootballFieldControls. Level1.   
  function FootballFieldControls({ onAdd }) {
    //ReThink this
    //AddValuation. Level2.
    const addValuation= (targetId, footballFieldTimeSeries) => {
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
              onAdd()
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
    //Return of FootballField controls. Level 1.

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
    </View>  
    );
  }
  
  //update FootballFieldName. Level 1.
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

  //delete FootballField. Level 1.

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
  
  //RetrieveValuations. Level 1.


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

    function valuationNumbers (data, output) {
        console.log("Cuando se entra en valuatioNumbers?")
        console.log("data")
        console.log(data)
        console.log("output")
        console.log(output)



        let valuations = [];
        let valuationCenter;
        
        for (let valuation of data) {
          let valuationName = valuation["valuationName"];
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
          name: valuationName,
          color: valuationColor,
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
      let data = await retrieveValuations();
      console.log("dataKLK")
      console.log(data)
      console.log("en este primer useffect")

      let val=valuationNumbers(data,footballFieldOutput)
      //console.log(val)
      setTableValues(val)
      setValuations(val);
      setData(data)
    }
    getValuations();
  }, []);

  useEffect(() => {
    let val = valuationNumbers(data, footballFieldOutput);
    console.log("en este segundo useffect")
    setTableValues(val);
    setValuations(val);
  }, [data, footballFieldOutput, valuationMetric, valuationStat]);
  /*
  useEffect(() => {
    async function getFootballField() {
      let footballField = await retrieveFootballField();
      setFootballFieldName(footballField[0]);
      setTargetSymbol(footballField[1]);

    }
    getFootballField();
  }, []);*/

    //GenerateValuation. Level 1.

    function generateValuation() {
    console.log("generate valuation")
    fetch('http://10.239.21.226:5000/valuations',{
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
        console.log("then")
       
  }
  
  //Update ValuationName. Level 1.

  const updateValuationName= () => {
    fetch('http://10.239.21.226:5000/valuations/names',{
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

  //DeleteValuations. Level 1.

  const deleteValuation= () => {
    fetch('http://10.239.21.226:5000/valuations',{
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


//trying to put this functionts of level 2 as level 1:

  //AddComp. Level 1.
/*
  function addComp (compSymbol)  {
    fetch('http://10.239.21.226:5000/comps',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        compSymbol:compSymbol,
        valuationId:valuationId
      })
    })
    .then(resp=>resp.text())
    .then(resp => {
      if (resp === "Successful Comps Post") {
        fetch(`http://10.239.21.226:5000/comps/${targetId}-${footballFieldTimeSeries}-${valuationTimeSeries}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => resp.json())
        .then((data) => {
          setComps(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setComps([]);
        });
        generateValuation();
      }
      else {
        alert("Unsuccessful Comp Post")
      }
    })  
  }*/
  

  //DleteComp. Level 1.

  const deleteComp= () => {
    fetch('http://10.239.21.226:5000/comps',{
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

  //Return level 0

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
