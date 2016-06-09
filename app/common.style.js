'use strict';
import React, {
    StyleSheet,
    Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export const rateNum = function (num, state){
    let rate = 1;
    if(deviceWidth > 375) {
        rate = 1.1
    } else if (deviceWidth == 375) {
        rate = 1
    } else if (deviceWidth < 375 && deviceWidth >= 350) {
        rate = 0.9
    } else if (deviceWidth < 350 && deviceWidth >= 320) {
        rate = 0.8
    } else {
        rate = 0.8
    }
    if(state == "int") {
        return parseInt(Number((rate * num).toFixed(1)));
    } else {
        return Number((rate * num).toFixed(1));
    }

};

export const GetColor = function (type) {
    switch (type) {
        case "dark" :
            return "#2e2e2e";
            break;
        case "gray" :
            return "#757575";
            break;
        case "bg" :
            return "#e9e9e9";
            break;
        case "white" :
            return "#fff";
            break;
        case "black" :
            return "#000";
            break;
        case "color1" :
            return "#708eaa";
            break;
        case "color2" :
            return "#c6d2dd";
            break;
        case "color3" :
            return "#f26f5b";
            break;
        case "color4" :
            return "#fac5bd";
            break;
        default :
            break;
    }
};

export const CommonCSS = StyleSheet.create({
    wrapper : {
        flex:1,
        backgroundColor:"#dddee3"
    },
    contCenter : {
        alignItems : "center",
        justifyContent : "center"
    },
    warningText : {
        fontSize: rateNum(20),
    },
    StatusBarBg1 : {
        backgroundColor:GetColor("black")
    },
    Header : {
        height:rateNum(56),
        backgroundColor: "#3b5999",
        alignItems : 'center',
        justifyContent : 'center',
    },
    h1 : {
        color:"#fff",
        fontSize: rateNum(20),
    },
    Loading : {
        padding:rateNum(30),
        alignItems: "center",
        justifyContent: "center"
    },
    LoadingImg:{
        width:rateNum(20),
        height:rateNum(20)
    }
})



