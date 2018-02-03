import {AsyncStorage}from 'react-native';

export  default class DataRepository{

    fetchNetRepository(url){
        return new  Promise((resolve, reject) => {
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                })

        })
    }










    // fetchRepository(url){
    //
    //     return new Promise((resolve, reject) => {
    //         //调用本地数据
    //         this.fetchLoaclRepository(url)
    //
    //             .then(result=>{
    //                 if(result){
    //                     resolve(result);
    //                 }else {
    //                     this.fetchNetRepository(url)
    //                         .then(result=>{
    //                             resolve(result);
    //                         })
    //                         .catch(e=>{
    //                             resolve(e);
    //                         })
    //                 }
    //             })
    //             .catch(e=>{
    //                 this.fetchNetRepository(url)
    //                     .then(result=>{
    //                         resolve(result);
    //                     })
    //                     .catch(e=>{
    //                         resolve(e);
    //                     })
    //             })
    //
    //
    //
    //
    //
    //
    //
    //     })
    // }
    //
    // fetchLocalRepository(url) {
    //     return new Promise((resolve, reject)=> {
    //         AsyncStorage.getItem(url, (error, result)=> {
    //             if (!error) {
    //                 try {
    //                     resolve(JSON.parse(result));
    //                 } catch (e) {
    //                     reject(e);
    //                     console.error(e);
    //                 }
    //             } else {
    //                 reject(error);
    //                 console.error(error);
    //             }
    //         })
    //     })
    // }
    //
    //
    //
    // fetchNetRepository(url){
    //     return new  Promise((resolve,reject)=>{
    //         fetch(url)
    //             .then(response=>response.json())
    //             .then(result=>{
    //                 if(!result){
    //                     reject(new Error('返回的数据为空'));
    //                     return;
    //                 }
    //                 resolve(result.items);
    //                 this.saveRepository(url,result.items)
    //
    //
    //
    //
    //
    //             })
    //     })
    //         .catch(error=>{
    //             reject(error);
    //         })
    // }
    //
    // saveRepository(url,items,callBack){
    //     if(!url||!items)return;
    //     let wrapData = {items:items,update_date:new Date().getTime()};
    //     AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack)
    //
    // }
    // //检查数据有没有过时  longTime为时间戳
    // cheackData(longTime){
    //     return false;
    //
    //     let  cDate = new Date();
    //     let tDate =new Date();
    //     tDate.setTime(longTime);
    //     if(cDate.getMonth()!==tDate.getMonth()) return false;
    //     if(cDate.getDay()!==tDate.getDay()) return false;
    //     if(cDate.getHours()-tDate.getHours()>4) return false;
    //
    //     return true;
    //
    //
    // }
  }