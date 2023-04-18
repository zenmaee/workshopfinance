import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";



export default class InputTextField extends React.Component {
    
    render() {
        return (
            <View style={this.props.style}>
                <Text style={styles.inputTitle}>{this.props.title}</Text>
                <TextInput
                    placeholder={this.props.placeholderText}
                    secureTextEntry={this.props.isSecure}
                    style={styles.input}
                    value={this.props.value}
                    onChangeText = {text=>this.setState([])} 
                    keyboardType="default"
                >
                </TextInput>
                <View style={{ width: 250, borderBottomWidth: 1, borderBottomColor: "#FFF"}}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputTitle: {
        color: "#FFF", 
        fontSize: 14
    },
    input: {
        paddingVertical: 12,
        color: "#FFF", 
        fontSize: 14, 
        fontFamily: "Avenir Next"
    }
})