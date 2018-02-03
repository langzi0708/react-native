import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
    View
} from 'react-native';

import NavigationBar from '../pageview/NavigationBar'
import DataRepository from '../DataRepository'
import RepositoryCell from '../RepositoryCell'

import LanguageDao,{FLAG_LANGUAGE} from '../../src/data/LanguageDao'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {StackNavigator, TabNavigator} from "react-navigation"
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
//const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);
export default class PopularPage extends Component<{}> {
    constructor (props){
        super (props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state={
            languages:[]
        }

        //this.loadDate();
        this.loadLanguage();

    }

    componentDidMount() {
        //this.loadDate();

    }
    componentWillReceiveProps(){
        //this.loadDate();
    }
    loadDate(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    languages:result
                })
            })
            .catch(error=>{
                console.log(error);
            })
    }

    loadLanguage(){
        this.languageDao.fetch()
            .then((languages)=>{
                if(languages){
                    this.setState({
                        languages:languages,
                    })
                }
            })
            .catch((error)=>{

            })
    }



    render() {
        const { navigate } = this.props.navigation;
        this.loadLanguage();//可能存在不合理
        let content = this.state.languages.length>0? <ScrollableTabView
            tabBarBackgroundColor= "#2196F3"
            tabBarUnderlineStyle={{backgroundColor:'white',height:2}}
            tabBarActiveTextColor='#9B30FF'
            tabBarInactiveTextColor='mintcream'
            tabBarTextStyle={{fontSize: 16}}
            renderTabBar={()=><ScrollableTabBar/>}>
            {this.state.languages.map((result,i,arr)=> {
                let lan = arr[i];
                return lan.checked? <PopularTab key={i}  tabLabel={lan.name} {...this.props}/> : null;


            })}
        </ScrollableTabView>:null;
        return (
            <View style={styles.container}>
                {content}
                </View>
        );
    }
}
class  PopularTab extends Component{
    constructor(props){
        super(props);
        this.dataRespositor = new DataRepository();
        this.state = {
            result:'',
            isLoading:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        }
    }
    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.setState({
            isLoading:true
        })
        this.dataRespositor
            .fetchNetRepository(this.genFetchUrl(this.props.tabLabel))
            .then(result=>{
                this.setState({
                    dataSource :this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false
                });
            })
            .catch(error=>{
                console.log(error);
                this.setState({
                    isLoading:false
                });
            })
    }





    // loadData(){
    //     this.setState({
    //         isLoading:true,
    //
    //     });
    //     let  url = this.genFetchUrl(this.props.tabLabel);
    //     this.dataRespositor
    //         .fetchRepository(url)
    //         .then(result=>{
    //             let items = result && result.items ? result.items:result ? result:[];
    //             this.setState({
    //                 //result:JSON.stringify(result),
    //                 dataSource:this.state.dataSource.cloneWithRows(items),
    //                 isLoading:false,
    //             });
    //
    //             if(result&&result.update_date&&!this.dataRespositor.cheackData(result.update_date)){
    //                 DeviceEventEmitter.emit('showToast','数据过时');
    //
    //                 return this.dataRespositor.fetchNetRepository(url);
    //             }else {
    //
    //                 DeviceEventEmitter.emit('showToast','显示缓存数据');
    //             }
    //         })
    //         .then((items)=>{
    //             if(!items||items.length===0) return;
    //             this.setState({
    //                 dataSource:this.state.dataSource.cloneWithRows(items)
    //             });
    //             DeviceEventEmitter.emit('showToast','显示网络数据');
    //         })
    //         .catch(error=>{
    //             this.setState({
    //                 isLoading:false
    //             })
    //         console.log(error);
    //     })
    //
    // }

    genFetchUrl(key){
        return URL +key +QUERY_STR;
    }
    renderRow(data){
        return(
            <RepositoryCell
                key={data.id}
                data={data}/>
        )
    }
    render(){
        return(
            //View必须要给一个样式 不然没有办法显示菊花  因为没有尺寸。
        <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data) }
                refreshControl={<RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={()=>this.loadData()}//监听上拉刷新
                    color={['#2196F3']}
                    tintColor={'#2196F3'}
                    title={'Loading...'}
                    titleColor={'#2196F3'}
                />}
            />
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#fafff8'

    },


});
