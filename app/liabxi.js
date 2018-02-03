import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Button,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';



export default class liabxi extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {text:''};
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}
                                  onPress={()=>this.search()}>
                    <Text style={styles.buttonText}>搜索</Text>
                </TouchableOpacity>
                <TextInput style={styles.textinput}
                           onChangeText={(text)=>this.setState({text})}


                           placeholder={'请输入写字楼，街道名称等'}
                           >

                </TextInput>

                <TouchableOpacity style={styles.leftbutton}>
                    <Image
                        style={styles.backbutton}
                        source={require('../res/images/back.png')}
                    />

                </TouchableOpacity>
            </View>
        );
    }








    //搜索按钮点击
    search(){

            alert("您输入的内容为："+this.state.text);




    }

}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row-reverse',

    },
    backbutton:{
        marginTop:10,

    },
    textinput:{
        flex:1,
        borderRadius:10,
        height:40,
        backgroundColor:'red',
        marginTop:20,
        marginRight:10

    },

    leftbutton:{
        backgroundColor:'red',
        width:44,
        height:40,
        marginTop:20,
        marginRight:10


    },

    button: {

        height: 44,
        width: 44,
        marginTop:20,

    },
    buttonText: {
        textAlign: 'center',
        color: 'red',
        marginTop:15,

        justifyContent:'center',

    },
})