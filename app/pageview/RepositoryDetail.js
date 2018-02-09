import React,{Component}from 'react';

import {
    View,
    StyleSheet,
    Text,
    TextInput,
    WebView,
    TouchableOpacity,
    Image,
    DeviceEventEmitter, Alert
} from 'react-native'

const  URL = 'http://www.imooc.com'
import  ViewUtils from '../util/ViewUtils'
import {FLAG_LANGUAGE} from "../../src/data/LanguageDao";
import LanguageDao from "../../src/data/LanguageDao";
export  default class RepositoryDetail extends  Component{
    constructor(props){
        super(props);
       const {params} = this.props.navigation.state.params;

       this.title = params.item.full_name;
            this.state = {
            url:params.item.html_url,
            title:this.title,
            canGoBack:false
        }
    }



    componentDidMount() {
        this.props.navigation.setParams({
            title:this.title,
            onBack:this.onBack,//不能有小括号 有小括号就直接执行了
            navigatePress:this.navigatePress,

            webView:this.webView,


        });

    }

    navigatePress=()=>{

        this.onBack()

    }

    onBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else {
            DeviceEventEmitter.emit('showToast','到顶了')
            this.props.navigation.goBack();

            }


    }



    static navigationOptions = ({
                                    navigation,
                                    screenProps
                                }) => ({

        headerTitle:navigation.state.params.title,
        headerStyle: {
            backgroundColor: '#2196F3',
        },
        headerTintColor: 'white',
        // headerLeft:<View>
        //     <TouchableOpacity style={{width:40,height:40,justifyContent:'center',alignItems:'center'}}
        //                       onPress={()=>{
        //                           if(navigation.state.params.canGoBack){
        //                               navigation.state.params.webView.goBack();
        //
        //                           }else {
        //                               navigation.goBack();
        //                           }
        //                       }}
        //
        //     >
        //         <Text>返回</Text>
        //
        //     </TouchableOpacity>
        // </View>

        headerLeft:<Text
            style={{fontSize:20,color: '#fff',margin:10}}
            onPress={()=>navigation.state.params.navigatePress()}>返回</Text>

    });


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
                    {/*<Text style={{fontSize:20}}*/}
                          {/*onPress={()=>{*/}
                              {/*this.goBack()*/}
                          {/*}}*/}
                    {/*>返回</Text>*/}
                    {/*<TextInput style={styles.textInput}*/}
                               {/*defaultValue={URL}*/}
                               {/*onChangeText={text=>this.text=text}*/}
                    {/*></TextInput>*/}
                    {/*<Text style={{fontsize:20}}*/}
                          {/*onPress={()=>{*/}
                              {/*this.go()*/}
                          {/*}}*/}
                    {/*>进入</Text>*/}
                </View>
                <WebView
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
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        margin:10
    },

    textInput:{
        flex:1,
        height:40,
        borderWidth:1,
        margin:10,
    }



});