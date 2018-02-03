import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    RefreshControl,
    View
} from 'react-native';

import Toast,{DURATION}from 'react-native-easy-toast'

var data = {
    "result": [
        {
            "email": "f.lee@taylor.edu",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "g.jackson@hall.net",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "l.hall@rodriguez.com",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "q.lopez@davis.io",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "c.gonzalez@perez.net",
            "fullName": "张三张三张三"
        },
        {
            "email": "a.johnson@williams.net",
            "fullName": "张三张三"
        },
        {
            "email": "i.anderson@lopez.edu",
            "fullName": "张三张三"
        },
        {
            "email": "r.lee@davis.org",
            "fullName": "张三张三"
        },
        {
            "email": "o.young@lee.edu",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "j.wilson@williams.org",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "z.walker@jackson.io",
            "fullName": "张三张三"
        },
        {
            "email": "j.martinez@brown.gov",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "y.martin@lewis.io",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "w.taylor@gonzalez.org",
            "fullName": "张三张三"
        },
        {
            "email": "j.thomas@garcia.org",
            "fullName": "张三张三张三张三"
        }
    ],
    "statusCode": 0
};
export default class ListViewDemo extends Component<{}> {
    //构造方法
    constructor(props){
        super(props);
        // const ds = new  ListView.dataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2)=> {
                r1 !== r2
            }
        });
        this.state={
            dataSource:ds.cloneWithRows(data.result),
            isLoading:true,
        }
        this.onLoad();
    }
//返回的视图
    renderRow(item) {
        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={()=>{
                    this.toast.show('你单击了：'+item.fullName,DURATION.LENGTH_LONG)
                }}>

                <Text style={styles.item}>
                    {item.fullName}
                </Text>
                <Text style={styles.item}>
                    {item.email}
                </Text>

                </TouchableOpacity>

            </View>
        )
    }
    //行与行之间的分割线
    renderSeparator(sectionID,rowID,adjacentRowHighlighted){
        return(
            <View style={styles.separator}>

            </View>
        )
    }
    //返回页脚视图
    renderFooter(){
        return(<View>
            {/*网络图片 必须设置长度和宽度  本地图片不需要*/}
            <Image
                style={{width:400,height:100}}
                source={{uri:'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}}/>

        </View>

        )
    }
//刷新
    onLoad(){
        setTimeout(()=>{
            this.setState({
                isLoading:false,
            })

        },2000);
    }
    render() {
        return (
            <View style={styles.container}>
        <ListView
            dataSource={this.state.dataSource}//ListView与datasource关联起来了
            renderRow={(item)=>this.renderRow (item)}//指定ListView每一行所返回的视图 item是返回的
            renderSeparator={(sectionID,rowID,adjacentRowHighlighted)=> this.renderSeparator(sectionID,rowID,adjacentRowHighlighted)}
            renderFooter={()=>this.renderFooter()}
            refreshControl={<RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={()=>this.onLoad()}
            />}


        ></ListView>
                {/*Toast将被渲染时 将这个组件赋值给this.toast*/}
                <Toast ref={toast=>{this.toast=toast}}/>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    row:{
        height:50,
    },
    separator:{
        height:1,
        backgroundColor:'black',

    }

});
