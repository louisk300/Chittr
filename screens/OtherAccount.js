import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Button,
    Alert,
    FlatList,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-elements';

class OtherAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            token: '',
            profileData: '',
            isFollowing: false,
            photo: null,
        };
    }

   // Gets user ID using AsyncStorage
    retrieveID = async done => {
        try {
            const value = await AsyncStorage.getItem('@profileid');
            if (value !== null) {
                this.setState({ userID: value }, () => {
                    done();
                });
                console.log(this.state.userID);
            }
        } catch (e) {
            console.error(e);
        }
    };

    //Gets Token using AsyncStorage
    retrieveToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                this.setState({ token: value });
                console.log(this.state.token);
            }
        } catch (e) {
            console.error(e);
        }
    };

    //Gets data from user to store
    getProfileData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.userID, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    profileData: responseJson,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.retrieveID(() => {
            this.retrieveToken();
            this.getProfileData();
        });
    }

    //Sends POST request to follow a user and sets the state of the following to either true or false
    followPoint() {
        let id = this.state.userID;
        let token = this.state.token;

        if (this.state.isFollowing == false) {
            return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow', {
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token,
                },
            })
                .then(response => {
                    if (response.status == '200') {
                        this.setState({
                            isFollowing: true,
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow', {
                method: 'DELETE',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token,
                },
            })
                .then(response => {
                    if (response.status == '200') {
                        this.setState({
                            isFollowing: false,
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    //Gets Photo of the user that is selected
    GetPhoto() {

        let url = "http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.userID + "/photo";


        RNFetchBlob.fetch('GET', url)
            .then((response) => {
                let image = response.base64();
                this.setState({ photo: "data:image/png;base64," + image });
                console.log("Got photo...");
            })
            .catch((e) => {
                console.log("Error on getting photo: " + e);
            });
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.viewStyle}>
                <View style={styles.viewAvatar}>
                    
                </View>

                <View style={styles.viewNameText}>
                    <Text>
                        {this.state.profileData.given_name}{' '}
                        {this.state.profileData.family_name}
                    </Text>
                </View>

                <View style={styles.myButton}>
                    <Button
                        title={this.state.isFollowing == false ? 'Follow' : 'Unfollow'}
                        onPress={() => this.followPoint()}
                    />
                    <View style={styles.myButton2}>
                        <Button
                            title={"View Followers"}
                        onPress = {() => navigation.navigate('OtherAccountFollows')}
                        />
                    </View>
                </View>

                <View style={styles.viewChitTitleText}>
                    <Text>Chits:</Text>
                </View>

                <View style={styles.viewChitBodyText}>
                    <FlatList
                        data={this.state.profileData.recent_chits}
                        renderItem={({ item }) => <Text>{item.chit_content}</Text>}
                        keyExtractor={({ id }, index) => id}
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
    },
    viewNameText: {
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    myButton: {
        paddingTop: 150,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 20,
        height: 300
    },

    myButton2: {
        paddingTop: 1,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 20,
        position: 'absolute',
        top: 10,
        left: 75,
        height: 320,
    },
    viewChitTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        position: 'absolute',
        top: 300,
        left: 5
        
    },
    viewChitBodyText: {
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 20,
        position: 'absolute',
        top: 350,
        left: 5
    },
});

export default OtherAccount;
