import React, { Component } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';



class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            given_name: '',
            family_name: '',
            email: '',
            password: ''
        };
    }

    // sends post request to API to register a neww account
    AddAccount() {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/User",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    given_name: this.state.given_name,
                    family_name: this.state.family_name, 
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => {
                Alert.alert("Account Created!");
                
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (

            <View style={{flexDirection: 'column'}}>
                <Text>First Name</Text>
                <TextInput
                    on onChangeText={(text) => this.setState({given_name: text })}
                    value={this.state.given_name}
                />
                <Text>Surname</Text>
                <TextInput
                    onChangeText={(text) => this.setState({family_name: text })}
                    value={this.state.family_name}
                />
                <Text>Email</Text>
                <TextInput
                    onChangeText={(text) => this.setState({email: text })}
                    value={this.state.email}
                    textContentType='emailAddress'
                />
                <Text>Password</Text>
                <TextInput
                    onChangeText={(text) => this.setState({password: text })}
                    value={this.state.password}
                    secureTextEntry
                />
            
                <Button
                    title="Create New Account"
                    onPress={() => { this.AddAccount() }}
                />

            </View>
        )
    }
}
export default ProfileScreen;