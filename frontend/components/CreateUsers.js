import React, {useState} from 'react'
import {View, Text ,StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper'

function CreateUsers() {


    const insertData = () => {
        fetch('http://127.0.0.1:5000/adduser'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({FirstName:FirstName, LastName:LastName, Email:Email, Password:Password})
        }
        .then(resp=>resp.json())
}}
export default CreateUsers