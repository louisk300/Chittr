import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import LoginScreen from './LoginScreen';
import EditProfile from './EditProfile'
//import RNFetchBlob from 'react-native-fetch-blob';



class AccountScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chit_content: '',
            user: [],
            firstname: '',
            secondname: '',
            id: '',
            token: '',
            email: '',
            photo: null
            
        }
    }
   

    // Gets ID of user and login token for authentication
    GetLoginData = async () => {
        try {

            const GetID = await AsyncStorage.getItem('id');
            const token = await AsyncStorage.getItem('token');

            const id = JSON.parse(GetID);

            this.setState({ id: id });
            this.setState({ token: token });
            console.log("User ID:  " + this.state.id)
            this.GetUserData();
        } catch (error) {
            console.log(error);
        }
    }

    //Gets the current logged in user's details

    GetUserData = () => {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.id)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({ firstname: responseJson.given_name });
                this.setState({ secondname: responseJson.family_name });
                this.setState({ email: responseJson.email });
                this.setState({ userChits: responseJson.recent_chits });
                console.log('Chit Content ' + responseJson.recent_chits);
                console.log('user info ' + this.state.firstname + '  ' + this.state.secondname + ' ' + this.state.email);
                this.storeData();
            }).catch((error) => {
                console.log(error);
            });
    }
  //Gets the current logged in user's profile photo
    //GetPhoto () {

    //    let url = "http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.id + "/photo";
    //    RNFetchBlob.fetch('GET', url)
    //        .then((response) => {
    //            let image = response.base64();
    //            this.setState({ photo: "data:image/png;base64," + image });
    //            console.log("Got photo...");
    //        })
    //        .catch((e) => {
    //            console.log("Error on getting photo: " + e);
    //        });
    //}
        

   //Stores data using async storage    
    storeData = async () => {
        try {

            await AsyncStorage.setItem('firstname', this.state.firstname);
            await AsyncStorage.setItem('secondname', this.state.secondname);
            await AsyncStorage.setItem('email', this.state.email);

        } catch (error) {
            console.log(error);
        }
    }


    //Sends Post request to API to logout the current user logged in
    Logout = () => {
        const navigation = this.props.navigation;
        return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                }

            })
            .then((response) => {
                if (response.status === 200) {
                    this.props.navigation.navigate("Login");
                    
                } else {
                    console.log("Unable to log out");
                }
            }
            ).catch((error) => {
                console.error(error);
            });
    }


    componentDidMount() {
        this.GetLoginData();
        //this.GetPhoto();
    }

  

    render() {
        const navigation = this.props.navigation;
        return (

            <View style={styles.viewStyle}>

                <View style={styles.Text}> 
                <Text>Welcome! </Text>
                
                <Text>{this.state.firstname}</Text>
                <Text>{this.state.secondname}</Text>
                <Text>{this.state.email}</Text>
                    <Text>Lets post a chit shall we?</Text>
                </View>
                <View style={styles.myButton}>
                <Button
                    title="Post a Chit"
                    onPress={() => navigation.navigate('PostChit')}
                />

                <Button
                    title="Search"
                    onPress={() => navigation.navigate('SearchScreen')}
                />
               
                <Button
                    title="Edit Profile"
                    onPress={() => navigation.navigate('EditProfile')}
                />
                    <View style={styles.myLogout}> 
                <Button
                    title="Click here to logout"
                    onPress={() => { this.Logout() }}
            
                        />
                    </View>
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
        margin: 10,
        height: 200,
        flex: 1,
        padding: 5
    },

    myButton: {
        paddingTop: 15,
        paddingLeft: 110,
        paddingRight: 120,
        borderRadius: 20,
        height: 320,
        width: 330,
        position: 'absolute',
        top: 0.2,
        left: 130,
        color: 'lightblue',

    },

    Text: {
        position: 'absolute',
        top: 100,
        left: 20,
        fontSize:50
    },
        myLogout: {
            paddingTop: 15,
            paddingLeft: 110,
            paddingRight: 120,
            borderRadius: 20,
            height: 320,
            width: 330,
            position: 'absolute',
            top: 450,
            left: 20,


        

    }




});


export default AccountScreen;