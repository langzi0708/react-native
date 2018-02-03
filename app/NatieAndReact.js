import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View,NativeModules } from 'react-native';

var ModulesNative = NativeModules.CalendarManager;
//ModulesNative.addEvent('Birthday Party', '4 Privet Drive, Surrey');

export default class NatieAndReact extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}

                          onPress={()=>this.clickAction()}

                      >
                    Welcome to React Native!
                </Text>

            </View>
        );
    }
    clickAction(){
        // Response 调用方式
        // 创建原生模块
        var NativeTest = require('react-native').NativeModules.CalendarManager;
        // 方法调用
        NativeTest.doSomething(('RN->原生的数据'),(error,events) => {
            if (error) {
                console.warn(error);
            } else {
                alert(events)//返回的数据
            }
        });
    }
    // search(){
    //
    //
    //
    //
    //     ModulesNative.addEvent('Birthday Party', '4 Privet Drive, Surrey');
    //     CalendarManager.findEvents((error, events) => {
    //         if (error) {
    //             console.error(error);
    //         } else {
    //             this.setState({events: events});
    //             console.log(events);
    //         }
    //     })
    //
    //
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'red',
        paddingTop: 22
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

})