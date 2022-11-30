import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import {Table, Row, Rows} from 'react-native-table-component';
import {useEffect} from 'react';

export default class ApiDisp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/multiples")
      .then(res => res.json())
      .then(res => 
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.multiples
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <Text>Error: {error.message}</Text>;
    } 
    else if (!isLoaded) {
      return <Text>{items.id}</Text>;
    } 
    else {
      return (
        <ul>
          {items.map(items => (
            <li key={items.id}>
              {items.evEbit} {items.Ebitda} {items.evRevenue} {items.pe} {items.type}
            </li>
          ))}
        </ul>
      );
    }
  }
}
  