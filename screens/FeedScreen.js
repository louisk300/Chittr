import React, { Component } from 'react';
import { Text, View, } from 'react-native';
class FeedScreen extends Component {
    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Please login to see what people are chitting about!</Text>
            </View>
        );
    }
}
export default FeedScreen;