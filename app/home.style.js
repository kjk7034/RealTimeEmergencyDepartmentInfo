'use strict';
import React, {
    StyleSheet,
    Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
import {rateNum} from './common.style';

export const HomeCSS = StyleSheet.create({
    Picker1 : {
        height : rateNum(200),
        width: rateNum(200),
        backgroundColor : "red"
    },
    Picker2 : {
        height : rateNum(200),
        width: rateNum(200),
        backgroundColor : "yellow"
    }
})



