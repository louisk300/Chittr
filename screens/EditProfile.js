import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import { Avatar } from 'react-native-elements';



class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            given_name: '',
            family_name: '',
            email: '',
            password: '',
            token: '',
            id: ''
        };
    }
    

    // Gets ID of user and login token for authentication

    GetLoginData = async () => {
        try {

            const GetID = await AsyncStorage.getItem('id');
            const token = await AsyncStorage.getItem('token');
            const id = JSON.parse(GetID);
            this.setState({ id: id });
            this.setState({ token: token });
            console.log("Async profile retrieve :  " + this.state.id)

        } catch (error) {
            console.log(error);
        }
    };

    //Function that sends a PATCH request to replace exsisting details of a user.
    AccountEdit() {
        const navigation = this.props.navigation;
        return fetch("http://10.0.2.2:3333/api/v0.0.5/User/" + this.state.id,
            {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
                body: JSON.stringify({
                    given_name: this.state.given_name,
                    family_name: this.state.family_name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => {
                Alert.alert("Saved Changes");
                navigation.navigate('Account');
            })
            .catch((error) => {
                console.error(error);
            });
    
}

    componentDidMount() {
        this.GetLoginData();
    }

    render() {
        const navigation = this.props.navigation;
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
                    onChangeText={(text) => this.setState({ family_name: text })}
                    value={this.state.family_name}
                />
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
                </View>
                <View style={styles.myButton}>
                <Button
                    title="Change Profile Picture"
                    onPress={() => navigation.navigate('UpdatePhoto')}

                    />
               

                <Button
                    title="Save Changes"
                    onPress={() => { this.AccountEdit() }}
                />
                </View>

            </View>
        )
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
        paddingTop: 15,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 20,
        height: 150


    }




});
export default EditProfile;