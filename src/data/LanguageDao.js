import React,{Component}from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage,
    ScrollView
}from 'react-native'
import  keysData from '../../src/data/keys.json'
export var FLAG_LANGUAGE = {flag_language:'flag_language',flag_key:'flag_language_key'}

export default class LanguageDao{
    constructor(flag){
        this.flag = flag;

    }

    fetch(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                if (!result){
                    var data=this.flag===FLAG_LANGUAGE.flag_language? null:keysData;
                    this.save(data);
                    resolve(data);
                }else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }
            });
        });
    }
    // fetch(){
    //     return new Promise(((resolve, reject) => {
    //         AsyncStorage.getItem(this.flag,(error,result)=>{
    //             if (error){
    //                 reject(error);
    //             }else {
    //                 if (result){
    //                     try {
    //                         resolve(JSON.Parse(result));
    //                     }catch (e){
    //                         reject(e);
    //                     }
    //                 }else {
    //                     var data = this.flag === FLAG_LANGUAGE.flag_key?keys:null; //如果没有flag_key,就传keys,两个都没有就传null
    //                     this.save(data); //数据保存数据库中
    //                     resolve(data);//返回给用户
    //                 }
    //             }
    //         })
    //
    //     }))
    // }
    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{

        })
    }

 }