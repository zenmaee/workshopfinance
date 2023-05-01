import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
//COLORS OF BARS:
//BLUE: #94c0cc
//ORANGE: #fad48b
//GREEN: #bcdf8a
//LIME: #f5f9ad

//Original function level 0.
const Valuation = ({ route, navigation }) => {
    const {userName, userEmail, userId,targets, targetId, footballFieldName,footballFieldTimeSeries,table, tableMean, tableRange, pixelsPerDollar, windowWidth, windowHeight, valuationWidth, valuationHeight, valuationRender, valuationId, valuationTimeSeries, valuationMetric, valuationSpread, valuationColor, valuationStat, footballFieldOutput, footballFieldScale} = route.params;
    const targetSymbol = targetId.split("-")[1] //tgtSymbol obtained
    const [showCompControls, setShowCompControls] = useState(false);
    const [showValuationControls, setShowValuationControls] = useState(false);
    const [changeMetric, setChangeMetric]=useState(false)
    const [changeStat, setChangeStat]=useState(false)
    const [changeSpread, setChangeSpread]=useState(false)
    const [changeColor, setChangeColor]=useState(false)

    
    const [openMetric, setOpenMetric]=useState(false);
    const [metricItems, setMetricItems]=useState([
      { label: "EV/Revenue (LTM)", value: "EV_R" }, 
      { label: "EV/EBITDA (LTM)", value: "EV_E" }
    ])

    // const [valuationStat, setValuationStat]=useState("")
    const [openStat, setOpenStat]=useState(false);
    const [statItems, setStatItems]=useState([
      { label: "Mean", value: "Mean" }, 
      { label: "Median", value: "Median" },
      { label: "High", value: "High" }, 
      { label: "Low", value: "Low" }
    ])

    const [comps, setComps] = useState([]);
    const [compSymbol, setCompSymbol]= useState("");
    const [newComp, setNewComp] = useState()

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

      function updateValuationMetric(newValuationMetric){
        console.log(newValuationMetric)
        if (changeMetric==true){
            fetch('http://10.239.21.226:5000/valuations/metric',{
            method:'PUT',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldId:targetId+"-"+footballFieldTimeSeries,
              valuationTimeSeries:valuationTimeSeries,
              metric:newValuationMetric
            })
          })
          setChangeMetric(false)
        }
        
          //we'll see later  
      }
  
      function updateValuationStat(newValuationStat){
        fetch('http://10.239.21.226:5000/valuations/stat',{
            method:'PUT',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              footballFieldId:targetId+"-"+footballFieldTimeSeries,
              valuationTimeSeries:valuationTimeSeries,
              stat:newValuationStat
            })
          })
  
        
      }
  
      

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
              .then(resp=>console.log(resp))}
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
                }, [newComp])
          
        
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
             
    function ValuationChart() {
        
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
    function ValuationControls({ onAdd }) {
    const [newValuationMetric, setNewValuationMetric]=useState(valuationMetric);
    const [newValuationSpread, setNewValuationSpread]=useState(valuationSpread);
    const [newValuationStat, setNewValuationStat]=useState(valuationStat);
    const [newValuationColor, setNewValuationColor]=useState(valuationColor);

    function changeSpread(action){
        if (action === "increase"){
          if (newValuationSpread<=0.5){
            setNewValuationSpread((newValuationSpread+0.05).toFixed(2))
          }
          else{
            alert("Max Spread: 50%")
          }
        }else{
          if (newValuationSpread>=0){
            setNewValuationSpread((newValuationSpread-0.05).toFixed(2))
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
              spread:newValuationSpread
            })
          })
      }
      
      function changeColor(color){
        setNewValuationColor(color)
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
          })}
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
                    value={newValuationMetric}
                    setValue={setNewValuationMetric}
                    items={metricItems}
                    setItems={setMetricItems}
                    onChangeValue={() => {
                    setChangeMetric(true);
                    updateValuationMetric(newValuationMetric);
                    }}
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
                    value={newValuationStat}
                    setValue={setNewValuationStat}
                    items={statItems}
                    setItems={setStatItems}
                    onChangeValue={() => {
                        setChangeStat(true);
                        updateValuationStat(newValuationMetric);
                        }}  
                  />
                </View> 
            </View>
            <View style={{ justifyContent: 'space-between', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Spread</Text>
              
              <TouchableOpacity onPress={() =>changeSpread("decrease")}
                title="Decrease Spread">
                <Image style={{ height: 25, width: 25, borderRadius: 4, marginTop: 5, marginLeft: 5 }} source={require('./minus_sign.png') }/>
              </TouchableOpacity>
              <Text style={{ backgroundColor: 'white', fontSize: 15 }}>{newValuationSpread*100}%</Text>
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


    

    //Return level 0

    return (
    
        <SafeAreaView style={{ flex: 2, alignItems: 'center', backgroundColor: '#000' }}>
        <View style={{ flex: 1, backgroundColor: '#FFF', height: 0.4*(windowHeight), width: valuationWidth, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: valuationWidth-40, marginStart: 10 }}>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>{footballFieldName}</Text>
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
            <ValuationChart/>
            {/*showCompControls ? <CompControls/>:<ValuationChart onRenderComps={() => {setShowCompControls(true)}}/>*/} 
        </View>
        

        {<ValuationControls onAdd={() => {}} />}
    
    </SafeAreaView>
    );
}
export default Valuation;
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
