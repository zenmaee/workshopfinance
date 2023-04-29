import React from 'react';
import { StyleSheet, Button, ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';


function ValuationChart({valuationRender, pixelsPerDollar, valuationHeight, comps, valuationMetric, valuationStat}) {
return(
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
                                <Image style={{ height: 25, width: 20, borderRadius: 4, margin: 2 }} source={require('../screens/delete_icon.png')}/>
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

export default ValuationChart;