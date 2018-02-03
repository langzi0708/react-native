/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,

  View
} from 'react-native';
import {StackNavigator} from 'react-navigation'

//const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig)

import githubPopular from './app/githubPopular'
import PopularPage from './app/pageview/PopularPage'
import  My from './app/pageview/My'

const RouteConfigs = {
    githubPopular: {
        screen: githubPopular,
    },
        PopularPage: {
            screen: PopularPage, navigationOptions: {
                title: '这是在RouteConfigs中设置的title'
            }},
            My: {screen: My}


}

const StackNavigatorConfig = {
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
}


const MainScreen = StackNavigator(RouteConfigs, StackNavigatorConfig)

export default MainScreen