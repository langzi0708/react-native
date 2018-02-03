'use strict' // 严格的语法


import * as types from '../constants/loginType'

let user = {
    name:'haolin',
    age:18,
}

export function login() {
    console.log('登陆方法')
    return dispatch =>{
        dispatch(isLogining());
        //模拟用户登陆
        let result = fetch('https://www.baidu.com/')
            .then((res)=>{
                dispatch(loginSuccess(true,user));

            }).catch((e)=>{
                dispatch(loginError(false));
            })
    }

}

function isLogining() {
    return{
        type:types.LOGIN_IN_DOING
    }

}

function loginSuccess(isSuccess,user) {
    console.log('success');

    return {
        type:types.LOGIN_IN_DONE,
        user:user,
    }

}

function  loginError(isError) {
    console.log('error');
    return {
        type:types.LOGIN_IN_ERROR,
    }

}