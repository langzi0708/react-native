import React,{Component} from 'react';

import {Provider}from 'react-redux';
import  configureStore  from './store/ConfigureStore';

import AppMain from  './container/AppMain';
const store = configureStore();

export  default  class  Root extends  Component{
    render(){
        return(
            <Provider store={store}>
                <AppMain/>
            </Provider>
        )
    }
}