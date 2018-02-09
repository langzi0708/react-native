import React,{Component}from 'react';

import {
    View,
    StyleSheet,
    Text,
    TextInput,
    WebView,
    DeviceEventEmitter
}from 'react-native'

const  URL = 'http://www.imooc.com'
export  default class WebViewTest extends  Component{
    constructor(props){
        super(props);
        this.state = {
            url:URL,
            title:'',
            canGoBack:false
        }
    }

    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else {
            DeviceEventEmitter.emit('showToast','到顶了')
        }

    }

    go(){
        this.setState({
            url:this.text,
        })

    }

    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack,
            title:e.title,
        })

    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.text}
                          onPress={()=>{
                              this.goBack()
                          }}
                    >返回</Text>
                    <TextInput style={styles.textInput}
                               defaultValue={URL}
                               onChangeText={text=>this.text=text}
                    ></TextInput>
                    <Text style={{fontsize:20}}
                          onPress={()=>{
                              this.go()
                          }}
                    >进入</Text>
                </View>
                <WebView style={{backgroundColor:'#000000'}}

                    ref={webView=>this.webView=webView}
                    source={{url:this.state.url}}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                         startInLoadingState={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000000'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        margin:10
    },
    text:{
      fontSize:20,
    },
    textInput:{
        flex:1,
        height:40,
        borderWidth:1,
        margin:10,
    }





});