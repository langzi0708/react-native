import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,

    View
} from 'react-native';


import  NavigationBar from '../pageview/NavigationBar'
import Toast,{DURATION}from 'react-native-easy-toast'
import CustomKeypage  from '../pageview/CustomKeypage'
import SortKeyPage from '../pageview/SortKeyPage'  //订阅标签页面

export default class My extends Component<{}> {

    constructor(props){
        super(props);
    }


    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container}>

                <Text
                    style={styles.tips}

                    onPress={()=>{
                       navigate('CustomKeypage',{...this.props})
                    }}
                >
                    自定义标签
                </Text>
                <Text
                    style={{fontSize:20,margin:20}}

                    onPress={()=>{
                        navigate('SortKeyPage')
                    }}
                >
                    订阅标签
                </Text>
                <Text
                    style={styles.tips}

                    onPress={()=>{
                        navigate('CustomKeypage',{...this.props,isRemoveKey:true})
                    }}
                >
                    移除标签
                </Text>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});