import React, {Component} from 'react';
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
import {SearchBar, ListItem} from 'react-native-elements';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      dataList: [],
    };
  }

 //Gets ID of current user who is selected
  storeProfileID = async id => {
    try {
      console.log('ID:', id);
      await AsyncStorage.setItem('@profileid', JSON.stringify(id));
    } catch (error) {
      console.log(error);
    }
  };

  //Search function that searches as text is typed
  search = text => {
    this.setState({search: text});
    if (text == '') {
      this.setState({
        dataList: [],
      });
    } else {
      return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + text)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            dataList: responseJson,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  //Allows a user to view other user's account pages
  viewProfile = id => {
    this.storeProfileID(id);
    this.props.navigation.navigate('OtherUserProfile');
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <SearchBar onChangeText={this.search} value={this.state.search} />
        <FlatList
          data={this.state.dataList}
          renderItem={({item}) => (
            <ListItem
              title={item.given_name}
              subtitle={item.family_name}
              onPress={() => this.viewProfile(item.user_id)}
            />
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
        flex: 1,
        backgroundColor:'lightblue'
  },
  textStyle: {
    padding: 10,
    fontSize: 25,
  },
});

export default SearchScreen;
