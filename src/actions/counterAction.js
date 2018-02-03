import *as types from '../constants/counterTypes';

export  function dexrement() {
    return {
        type:types.DECREMENT,
    }

}

export function increment() {

    return{
        type:types.INCREMENT,
    }

}