import { AppRegistry ,    Platform} from 'react-native';
import {StackNavigator} from 'react-navigation';
import App from './App';
//import listView from './app/assets/listView'
import  Main from './app/assets/Main'
//import  listview from './app/assets/listview'
import ListView from './app/ListViewe'

import SectionListView from './app/SectionListView'
import  Fetch from './app/Fetch'
import  liabxi from './app/liabxi'
import ListViewDemo from './app/ListViewDemo'

import NatieAndReact from './app/NatieAndReact'

import Root from './src/Root';//reduxe 案例
//数据存储
import AsyncStoragee from './app/AsyncStoragee'
//项目入口
import  githubPopular from './app/githubPopular'
import CustomKeypage from './app/pageview/CustomKeypage'
import SortKeyPage from './app/pageview/SortKeyPage'
import My from './app/pageview/My'
import PopularPage from "./app/pageview/PopularPage";

import WebViewTest  from './app/pageview/WebViewTest'
import RepositoryDetail from './app/pageview/RepositoryDetail'
const MainScreen = StackNavigator({
    githubPopular:{screen:githubPopular}, //默认第一个吧
    CustomKeypage:{screen:CustomKeypage},
    PopularPage:{screen:PopularPage},
    SortKeyPage:{screen:SortKeyPage},
    WebViewTest:{screen:WebViewTest},
    RepositoryDetail:{screen:RepositoryDetail},

});
//要显示那个界面就注册哪个 然后指向。
AppRegistry.registerComponent('cqbListView', () => MainScreen);
