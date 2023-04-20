
  //Fuction ValuationControls.Level 1.
  function ValuationControls({ onClose }) {
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
                      addComp(compSymbol)
                    }}
                >
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
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }} >
              <Text style={{ fontFamily: "Arial", color: "#FFF" }}>Delete</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
    }
