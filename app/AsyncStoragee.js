

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    AsyncStorage,
    TextInput,
    Navigator,
    View
} from 'react-native';
const KEY = 'text'
import NavigationBar from '../app/pageview/NavigationBar'
import Toast,{DURATION}from 'react-native-easy-toast'

export default class AsyncStoragee extends Component<{}> {
    constructor(props){
        super(props);
    }
    onSave(){
        AsyncStorage.setItem(KEY,this.text,(error)=>{
            if(!error){

                this.toast.show('保存成功',DURATION.LENGTH_LONG);
            }else {
                this.toast.show('保存失败',DURATION.LENGTH_LONG)
            }

        })

    }
    onRemove(){
        AsyncStorage.removeItem(KEY,(error)=>{
            if(!error){

                this.toast.show('移除成功',DURATION.LENGTH_LONG);
            }else {
                this.toast.show('移除失败',DURATION.LENGTH_LONG)
            }
        })

    }
    //取出
    onFetch(){
        AsyncStorage.getItem(KEY,(error,result)=>{
            if(!error){
                if(result!==''){
                    this.toast.show('取出数据为'+result)
                }else{
                    this.toast.show('取出的数据不存在：')
                }

            }else {
                this.toast.show('取出失败')
            }
        })

    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'数据存贮'}
                    statusBar={{backgroundColor: "#2196F3"}}
                />
                <TextInput style={{borderWidth:1,height:40,margin:6}}
                           onChangeText={text=>this.text=text}/>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                    <Text onPress={()=>this.onSave()}>保存</Text>
                    <Text onPress={()=>this.onRemove()}>移除</Text>
                    <Text onPress={()=>this.onFetch()}>取出</Text>
                </View>
                <Toast ref={toast=>this.toast=toast}/>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})