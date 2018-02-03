/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import LanguageDao,{FLAG_LANGUAGE}from '../src/data/LanguageDao'
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    DeviceEventEmitter,
    View
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from '../app/pageview/PopularPage';
import My from '../app/pageview/My'
import LoginPage from "../src/pages/LoginPage";
import MainPage from "../src/pages/MainPage";
import  Toast,{DURATION} from 'react-native-easy-toast'

export default class githubPopular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'tb_popular',
            titles:''
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('showToast',(text=>{
            this.toast.show(text,DURATION.LENGTH_LONG);

        }))
    }

    //移除通知
    componentWillUnmount() {
        this.listener&&this.listener.remove();
    }
    static navigationOptions = {
        title:'最热'

    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../res/images/ic_polular.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_popular'})}>

                        <PopularPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        title="趋势"
                        selectedTitleStyle={{color:'yellow'}}
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'yellow'}]} source={require('../res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                        <View style={{backgroundColor: 'yellow',flex:1}}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        title="收藏"
                        selectedTitleStyle={{color:'green'}}
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'green'}]} source={require('../res/images/ic_favorite.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                        <View style={{backgroundColor: 'green',flex:1}}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        title="我的"
                        selectedTitleStyle={{color:'blue'}}
                        renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'blue'}]} source={require('../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_my'})}>

                        <My {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast=>this.toast=toast}/>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 22,
        width: 22,
    }
});
