import { Component } from 'react';
import AsyncStorage from 'react-native';

export default class Logout extends Component
{
	constructor(props)
	{
		super(props);
		this.requestLogout();
	}

	render()
	{
		return null;
	}

	//Gets token of user who is already logged in
	async getToken()
	{
		try
		{
			const token = await AsyncStorage.getItem('token');
			return "" + token;
		}
		catch (e)
		{
			this.props.navigation.navigate('LoginPage');
		}
	}
	//Logout function that sends a POST request to API to logout the current logged in user
	logout(token)
	{
		return fetch("http://10.0.2.2:3333/api/v0.0.5/logout/",
			{
				method: 'POST',
				headers:
					{
						Accept: 'application/json',
						'Content-Type': 'application/json',
						token: token,
					},
			})
			.then((response) => {
				if (response.status !== 200) {
					throw "Response was: " + response.status;
				}
			})
			.catch((response) => {
				console.log("DEBUG: " + response);
			});
	}

	requestLogout()
	{
		this.logout(token).then();
		let token = this.getToken();
		this.props.navigation.navigate('LoginPage');
	}
}
