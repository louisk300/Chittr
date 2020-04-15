import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import ProfileScreen from './ProfileScreen';
import AccountScreen from './AccountScreen';
import AsyncStorage from '@react-native-community/async-storage';


class LoginScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
       
            email: '',
            password: '',
            token: '',
            id: ''
        }
    }
    //Stores the id and token of the user logging in by using async storage
    storeData = async () => {
        try {
            await AsyncStorage.setItem('token', this.state.token);
            await AsyncStorage.setItem('id', JSON.stringify(this.state.id));
        } catch (error) {
            console.log(error);
        }
    }


    //Sends POST request to API to login
    LoginAccount = async () => {
        console.log(this.state.email + "  " + this.state.password);

        return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                })
            })
            .then((response) => {
                if (response.status === 200) {
                    this.props.navigation.navigate('Account')
                }
                else {
                    Alert.alert("Email or Password is invalid")
                }
                return response.json();
            }
            ).then((responseJson) => {
                this.setState({ token: responseJson.token });
                this.setState({ id: responseJson.id });
                this.storeData();
                console.log(this.state.id + '  ' + this.state.token);
            }).catch((error) => {
                console.error(error);
            });
    }
     
    render() {
        const navigation = this.props.navigation;
        return (

            <View style={{ flexDirection: 'column' }}>

                <Text>Email</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    textContentType='emailAddress'
                />
                <Text>Password</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry
                />
                <Button
                    title="Login"
  
                    onPress={() => {
                        this.LoginAccount()
                    }}
                />
                <Button
                    title="Or Click Here To Register"
                    onPress={() => navigation.navigate('Register')}
            
              />


            </View>
        )

    }
}



export default LoginScreen;