import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';



class RegisterScreen extends Component {

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

            <View style={styles.viewStyle}>
            <View style={styles.viewTextInput}>
                <Text>First Name</Text>
                <TextInput
                        on onChangeText={(text) => this.setState({ given_name: text })}
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
                </View>
                <View style={styles.myButton}>
                <Button
                    title="Create New Account"
                    onPress={() => { this.AddAccount() }}
                    />
                </View>
                    </View>
                    
        );
    }
}
 

const styles = StyleSheet.create({
    viewStyle: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'lightblue',
    },
    viewTextInput: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        margin: 20,
        height: 200,
        flex: 5,
        padding: 5
    },

    myButton: {
        paddingTop: 150,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 20,
        height: 300
        

    }




});
export default RegisterScreen;