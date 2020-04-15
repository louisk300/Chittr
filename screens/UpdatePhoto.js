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
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UpdatePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: null,
            token: '',
            id: ''
        };
    }

    componentDidMount() {
        this.GetLoginData();
    }

    //Gets token to authenticate user who is logged in
    GetLoginData = async () => {
        try {

            const GetID = await AsyncStorage.getItem('id');
            const token = await AsyncStorage.getItem('token');
            const id = JSON.parse(GetID);
            this.setState({ id: id });
            this.setState({ token: token });
            console.log("Async profile retrieve :  " + this.state.id)
            console.log("Async token retrieve :  " + this.state.token)

        } catch (error) {
            console.log(error);
        }
    };

    // Takes photo and sends a POST reqeust to API to upload the photo
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);

            console.log('[DEBUG] Profile Picture URI: ' + data.uri)

            return fetch('http://10.0.2.2:3333/api/v0.0.5/user/photo',
                {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'image/jpeg',
                        'X-Authorization': this.state.token
                    }
                })

        }
    
}


    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>

                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}

                />

                <Button
                    title="Capture and Save"
                    onPress={this.takePicture.bind(this)}
                    style={styles.capture}
                />
                </View>
            
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column' },
    preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
    capture: {
        flex: 0, borderRadius: 5, padding: 15, paddingHorizontal: 20,
        alignSelf: 'center', margin: 20,
    }
});


export default UpdatePhoto;
