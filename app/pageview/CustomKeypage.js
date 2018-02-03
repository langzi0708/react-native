import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,

    View
} from 'react-native';

import  NavigationBar from '../pageview/NavigationBar'
import Toast,{DURATION}from 'react-native-easy-toast'
import LanguageDao, {FLAG_LANGUAGE} from '../../src/data/LanguageDao'
import ArrayUtils from '../../src/data/ArrayUtils'
import ViewUtils from '../util/ViewUtils'
import  CheckBox from 'react-native-check-box'
export default class CustomKeypage extends Component<{}> {
    constructor(props){
        super(props);



        const {params} = this.props.navigation.state;
        this.isRemoveKey = params.isRemoveKey?true:false;
        this.changeValues=[];
        this.state={
            dataArray:[]
        }
    }

    componentDidMount() {

        this.langugaeDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
        //在static中使用this方法
        //动态添加点击事件
        this.props.navigation.setParams({
            title:this.isRemoveKey?'移除标签':'自定义标签',
            navigatePress:this.navigatePress,
            rightTitle:this.isRemoveKey?'移除':'保存',

        });

    }
    navigatePress=()=>{
        Alert.alert('傻子')
        this.onSave()

    }

    loadData(){
        this.langugaeDao.fetch()
            .then((data)=>{
                this.setState({
                    dataArray:data
                })
            }).catch((error)=>{
                console.log(error);
        })

    }


    static navigationOptions = ({
                                    navigation,
                                    screenProps
                                }) => ({



        headerTitle:navigation.state.params.title,
        headerStyle: {
            backgroundColor: '#2196F3',
        },
        headerTintColor: 'white',
        headerRight: (
            <Text onPress={()=>navigation.state.params.navigatePress()}>{navigation.state.params.rightTitle}</Text>
        )
  });



    onSave() {
        if (this.changeValues.length === 0) {

            return;
        }
        // if(this.isRemoveKey){
        //     for(let i=0,l=this.changeValues.length;i<l;i++){
        //         ArrayUtils.remove(this.state.dataArray,this.changeValues[i]);
        //     }
        // }
        for(let i=0;i<this.changeValues.length;i++){
            ArrayUtils.remove(this.state.dataArray,this.changeValues[i]);
        }
        this.langugaeDao.save(this.state.dataArray);

    }

   onClick(data){
    if(!this.isRemoveKey)data.checked = !data.checked;
    ArrayUtils.updataArray(this.changeValues,data);
    }
   renderCheckBox(data){
    let leftTexyt = data.name;
    let isChecked = this.isRemoveKey?false:data.checked;
return (<CheckBox
    onClick={()=>this.onClick(data)}
    style={{flex:1,margin:10}}
    leftText={leftTexyt}
    isChecked={isChecked}
    checkedImage={<Image style={{tintColor:'#6495ED'}} source={require('../../res/img/ic_check_box.png')}/>}
    unCheckedImage={<Image style={{tintColor:'#6495ED'}} source={require('../../res/img/ic_check_box_outline_blank.png')}/>}

/>)

}

renderView(){
    if(!this.state.dataArray||this.state.dataArray.length===0) return;
    let  len = this.state.dataArray.length;
    let ViewArray = [];
    for(let i=0,l=len-2;i<l;i+=2){
        ViewArray.push(
            <View key={i}>
                <View style={styles.items}>


                    {this.renderCheckBox(this.state.dataArray[i])}
                    {this.renderCheckBox(this.state.dataArray[i+1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
    }
    ViewArray.push(
        <View key={len-1}>
            <View style={styles.items}>

                {len%2===0?this.renderCheckBox(this.state.dataArray[len-2]):null}
                {this.renderCheckBox(this.state.dataArray[len-1])}
            </View>
            <View style={styles.line}></View>
        </View>
    )
    return ViewArray;
}



    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderView()}
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    line:{
        height:0.3,
        backgroundColor:'darkgray'

    },
    items:{

        flexDirection:'row',
        alignItems:'center',
        height:44
    }

})