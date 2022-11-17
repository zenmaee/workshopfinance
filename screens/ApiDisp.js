import * as React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import {Table, Row, Rows} from 'react-native-table-component';

export default class ApiDisp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        tableHead: ['Comps', 'Target'],
        tableTitle: ['P/E', 'EV/EBitda', 'EV/Revenue','EV/EBit'],
        tableData:[
            ['0', '0'],
            ['0', '0'],
            ['0', '0'],
            ['0', '0']
        ]
      };
    }
  
    componentDidMount() {
      fetch("http://127.0.0.1:5000/multiples")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.items
            });
          },
          console.log(items),
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render(){
    //   const { error, isLoaded, items } = this.state;
    //   if (error) {
    //     return <div>Error: {error.message}</div>;
    //   } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    //   }
        const state = this.state;
        return (
            <View>
                
            </View>
            // <div className="ApiTable">
            // <tbody>
            //     <tr>
            //     <th>Comps</th>
            //     <th>Target</th>
            //     </tr>
            //     {data.map((item, index) => (
            //     <tr key={index}>
            //         <td>{item.pe}</td>
            //         <td>{item.evEbita}</td>
            //         <td>{item.evRevenue}</td>
            //         <td>{item.evEbit}</td>
            //     </tr>
            //     ))}
            // </tbody>
            // </div>
        );
    }
  }
  