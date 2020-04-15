import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginScreen } from './LoginScreen';

class PostChit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            firstname: '',
            secondname: '',
            token: '',
            id: '',
            email: '',
            chit_content: '',
            
            
        }
    }
    //Gets data from user data of who is logged in
    GetUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const GetID = await AsyncStorage.getItem('id');
            const id = JSON.parse(GetID);

            const firstname = await AsyncStorage.getItem('firstname');
            const secondname = await AsyncStorage.getItem('secondname');
            const email = await AsyncStorage.getItem('email');

            this.setState({ token: token });
            this.setState({ id: id });
            this.setState({ email: email });
            this.setState({ firstname: firstname });
            this.setState({ secondname: secondname });
          
        } catch (error) {
            console.log(error);
        }
    }
    //Sends POST request to API to post a chit
    PostChit = () => {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },

                body: JSON.stringify({
                    chit_content: this.state.chit_content,
                    chit_id: 0,
                    timestamp: 0,
                    location: {
                        longitude: 0,
                        latitude: 0
                        
                    },
                    user: {
                        "user_id": this.state.id,
                        "given_name": this.state.firstname,
                        "family_name": this.state.secondname,
                        "email": this.state.email
                    }

                })
            })
            .then((response) => {
                if (response.status === 201) {
                    Alert.alert("Posted Chit")
                    console.log("chit :" + chit_id)
                } else {
                    Alert.alert("Oops something went wrong..")
                }
            }
            ).catch((error) => {
                console.error(error);
            });
    }

    
    componentDidMount() {
        this.GetUserData();
    }
 

    render() {
        return (
            <View style={{ flexDirection: 'column' }}>
                <TextInput
                    onChangeText={(text) => this.setState({ chit_content: text })}
                />
                <Button
                    title="Post Chit"
                    onPress={() => { this.PostChit() }}
                />
            </View>
        )
    }
}

export default PostChit;

