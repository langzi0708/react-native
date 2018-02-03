/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    Button,
    TouchableOpacity,
    View
} from 'react-native';



export default class Fetch extends Component<{}>{
    constructor(props) { //构造器
        super(props);
        this.state = {  //定义的三个状态
            title: '',
            description: '',
            movies: ''
        };
    }

    //列表点击事件
    itemClick(item, index) {
        alert('点击了第' + index + '项，电影名称：' + item.title + '上映年份：' + item.releaseYear);
    }

    //FlatList的key
    _keyExtractor = (item, index) => index;

    //子item渲染
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.itemClick.bind(this, item, index)}>

                <View style={[WebTestStyles.item, {backgroundColor: index % 2 == 0 ? 'lightgray' : 'whitesmoke'}]}>
                    <Text style={WebTestStyles.itemTitle}>{item.title}</Text>
                    <Text style={WebTestStyles.itemYear}>上映年份：{item.releaseYear}</Text>
                </View>

            </TouchableOpacity>
        );
    }

    //列表分割线
    _itemDivide = () => {
        return (
            <View style={{height: 10, backgroundColor: 'blue'}}/>
        );
    }

    //getMoviesFromApiAsync() {
    _fetchData = () => {
        fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())//把response转为json格式
            .then((jsondata) => {    //上面的转好的json
                //alert(jsondata.movies[0].title);
                this.setState({ //将获取到的数据更新到state中
                    title: jsondata.title,
                    description: jsondata.description,
                    movies: jsondata.movies,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={WebTestStyles.container}>
                <Text style={WebTestStyles.title}>{this.state.title}</Text>
                <Text style={WebTestStyles.description}>{this.state.description}</Text>
                <FlatList   //列表组件
                    style={{marginTop: 20}}
                    data={this.state.movies}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._itemDivide}/>
                <Button title="请求网络" onPress={this._fetchData}/>
            </View>
        );
    }
}
;

const WebTestStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'

    },

    description: {
        fontSize: 12,
        alignSelf: 'center'
    },

    item: {
        padding: 10
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemYear: {
        fontSize: 16,
    }
})

