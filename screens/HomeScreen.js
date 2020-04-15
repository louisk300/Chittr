import React, { Component } from 'react';
import { Text, View, Animated } from 'react-native';
import { FlatList, ActivityIndicator } from 'react-native';

class HomeScreen extends Component{

    constructor(props) {
        super();
        this.animated = new Animated.Value(0);
        super(props);
        this.state = {
            isLoading: true,
            ChitData: []
        }
    }
//Gets chits from API
    getData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    ChitData: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getData();
    }
    


    render() {

        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }


     
     return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Text>Lets see what the world is chitting about!</Text>

             <FlatList
                 data={this.state.ChitData}
                 renderItem={({item}) => <Text>{item.chit_content}</Text>}
                 
                 />
         </View>
 );
 }
}
export default HomeScreen;