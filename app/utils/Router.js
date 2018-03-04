import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';

const Router = StackNavigator({
  Home: { screen: Home }
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
});

export default Router;
