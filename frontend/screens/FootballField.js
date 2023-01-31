import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export default function FootballField({ navigation }) {

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#000' }}>
      {/*<View style={{ backgroundColor: '#FFF', height: 400, width: 400, borderRadius: 10, top: 50 }}>
      </View>*/}
      <View style={{ margin: 10, height: 200, width: 400, borderWidth: 1 }}>
        <TextInput style={{ height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
        placeholder="Football Field Name">
        </TextInput>
        <TextInput style={{ marginTop: 5, height: 40, width: 250, padding: 5, borderRadius: 10, backgroundColor: '#FFF'}}
        placeholder="Target Name or Ticker">
        </TextInput>
        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Output</Text>
        </View>
        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Scale</Text>
        </View>
      </View>

      <View style={{ margin: 10, height: 200, width: 400, borderWidth: 1 }}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});