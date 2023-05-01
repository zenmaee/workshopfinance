<View style={{ display: 'flex', flexDirection: 'row', marginTop: 5}}>
                  <Text style={{ flex: 2, textAlign: 'left', color: 'black', backgroundColor: 'gray', padding: 5 }}>Comp (Ticker)</Text>
                  <Text style={{ flex: 0.75, color: 'black', backgroundColor: 'gray', padding: 5, marginLeft: 2 }}>Multiple</Text>
                  <View style={{ flex: 0.25, color: 'white', height: 25, width: 20, borderRadius: 4, margin: 2 }}></View>
                </View>
                <ScrollView contentContainerStyle={{}} /*keyboardDismissMode='on-drag'*/>
                  {comps.map((comp) => {
                    return (
                      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                        <View style={{ flex: 2, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}>
                          <Text>{comp.compSymbol}</Text>
                        </View>
                        <View style={{ flex: 0.71, color: 'black', padding: 5, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 2 }}>
                          {valuationMetric === 'EV_E' ? <Text>{comp.evToEbitdaLTM.toFixed(2)}</Text> : valuationMetric === 'EV_R' ? <Text>{comp.evToRevenueLTM.toFixed(2)}</Text> : null}
                        </View>
                        <TouchableOpacity style={{ flex: 0.29 }}>
                          <Image style={{ height: 25, width: 20, borderRadius: 4, margin: 2 }} source={require('./delete_icon.png')}/>
                        </TouchableOpacity>
                      </View>
                    );
                  })}