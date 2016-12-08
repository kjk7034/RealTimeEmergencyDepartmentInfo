import {
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
        case "gray" :
            return "#828282";
        case "bg" :
            return "#e9e9e9";
        case "white" :
            return "#fff";
        case "color1" :
            return "#3b5999";
        case "color2" :
            return "#4267b2";
        case "color3" :
            return "#c6c7cc";
        case "color4" :
            return "#e9ebee";
        case "color5" :
            return "#1d2129";
        case "color6" :
            return "#141b23";
        case "black" :
        default :
            return "#000";
    }
};

export const CommonCSS = StyleSheet.create({
    wrapper : {
        flex:1,
        backgroundColor: GetColor("white")
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
        backgroundColor: GetColor("color1"),
        alignItems : 'center',
        justifyContent : 'center',
    },
    h1 : {
        color: GetColor("white"),
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



