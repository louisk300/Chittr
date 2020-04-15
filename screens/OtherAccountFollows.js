import React, {Component} from 'react';
import { View,FlatList,ActivityIndicator,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from 'react-native-elements';

class Followers extends Component {
  constructor(props) {
    super(props);
      this.state = {
      isLoading: true,
      followingList: [],
    };
  }

  //Gets followers from the current selected user
  async getFollowers(A) {
    let id = JSON.parse(await AsyncStorage.getItem('@profileid'));
    console.log('check' + id);
    try {
      const response = await fetch(
        'http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/followers',
      );
      const responseJson = await response.json();
      this.setState(
        {
          followingList: responseJson,
          isLoading: false,
        },
        () => {
          A();
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getFollowers(() => {
      console.log(this.state.followingList);
    });
  }

  render() {
    console.log(this.state.isLoading);
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={this.state.followingList}
            renderItem={({item}) => <ListItem title={item.given_name} />}
            keyExtractor={({id}, index) => id}
          />
        </View>
      );
    }
  }
}

export default Followers;
