import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    TouchableHighlight,
    View
} from 'react-native';
import LanguageDao, {FLAG_LANGUAGE} from "../../src/data/LanguageDao";
import  SortableListView from 'react-native-sortable-listview'
import ArrayUtils from "../../src/data/ArrayUtils";

export default class SortKeyPage extends Component<{}> {
    constructor(props){
        super(props);
        this.dataArray=[]; //从数据库中读取所有标签的数组
        this.sorResultArray=[]; //排序之后新生成的数组
        this.originalCheckedArray=[];  //上一次标签排序的顺序


        this.changeValues=[];
        this.state={
            cheackArray:[], //已经订阅的标签筛选出来

        }
    }
    //组件完成装在之前 读取数据库中所有的标签
    componentDidMount() {
        this.langugaeDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
        this.props.navigation.setParams({
            title:'自定义Header',
            navigatePress:this.navigatePress,

        });

    }
    onSave(){
    if (ArrayUtils.isEqual(this.originalCheckedArray,this.state.cheackArray)) {
    return;
            }
            this.getSortResult();
            this.langugaeDao.save(this.sorResultArray);



    }

    getSortResult(){
        this.sorResultArray = ArrayUtils.clone(this.dataArray)
        for (let i=0;i<this.originalCheckedArray.length;i++){
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);//在原始数组中的位置 indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
            this.sorResultArray.splice(index,1,this.state.cheackArray[i])


        }


 }


    loadData(){
        this.langugaeDao.fetch()
            .then(result=>{
                this.getCheckedItems(result)

            })
            .catch(error=>{

            })


    }

    getCheckedItems(result){
        this.dataArray = result;
        let checkedArray = [];
        for (let i=0;i<result.length;i++){
            let  data =result[i];
            //checked   是json的一个对象
            if(data.checked)checkedArray.push(data);
        }
        this.setState({
            cheackArray:checkedArray,
        })
        this.originalCheckedArray =ArrayUtils.clone(checkedArray);

    }
    static navigationOptions = ({
                                    navigation,
                                    screenProps
                                }) => ({



        headerTitle: "排序标签",
        headerStyle: {
            backgroundColor: '#2196F3',
        },
        headerTintColor: 'white',
        headerRight: (
            <Text style={{marginRight:10,fontcolor:'#f8ffff',fontSize:18}}
                onPress={()=>navigation.state.params.navigatePress()}>保存</Text>
        )
    });

    navigatePress=()=>{
        Alert.alert('傻子')
        this.onSave();

    }



    render(){
        return(<View style={styles.container}>
            {/*<SortableListView*/}
                {/*style={{flex:1}}*/}
                {/*data={this.state.cheackArray}*/}
                {/*order={Object.keys(this.state.cheackArray)}*/}
                {/*onRowMoved={e=>{*/}
                    {/*order.splice(e.to,0,this.state.cheackArray.splice(e,from,1)[0]);*/}
                    {/*this.forceUpdate();*/}
                {/*}}*/}
                {/*renderRow={row => <SortCell data={row}{...this.props}/>}*/}

            {/*/>*/}

            <SortableListView
                data={this.state.cheackArray}
                order={Object.keys(this.state.cheackArray)}
                onRowMoved={(e) => {
                    this.state.cheackArray.splice(e.to, 0, this.state.cheackArray.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
                renderRow={row => <SortCell data={row} {...this.props}/>}
            />

        </View>)

    }
};

class  SortCell extends Component{
    render(){
        console.log('nameeeee'+this.props.data.name)
        return(<View style={{flex:1}}>
            <TouchableHighlight
                underlayColor={'#eee'}
                style={this.props.data.checked ? styles.item : styles.hidden}
                {...this.props.sortHandlers}>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                    <Image source={require('../../res/img/ic_sort.png')} resizeMode='stretch' style={{
                        opacity: 1,
                        width: 16,
                        height: 16,
                        marginRight: 10,
                        tintColor:'#2196F3'
                    }}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },

})