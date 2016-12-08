import {
    StyleSheet,
    Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
import {rateNum, GetColor} from './common.style';


export const DetailCSS = StyleSheet.create({
    PopBtnWrap: {
        position:"absolute",
        left:rateNum(11),
        top:rateNum(11),
        height:rateNum(34),
        alignItems: "center",
        justifyContent: "center",
        borderRadius:5,
        borderWidth: 1,
        backgroundColor:GetColor("white"),
        borderColor:GetColor("white"),
        paddingHorizontal:rateNum(8)
    },
    PopBtnText: {
        fontSize: rateNum(16),
        color: GetColor("color2")
    },
    DetailList: {
        marginTop:rateNum(15)
    },
    DetailEtcList: {
        borderWidth: 1,
        justifyContent:"center",
        marginHorizontal: rateNum(15),
        backgroundColor: GetColor("white"),
        marginBottom:rateNum(15),
        borderRadius:5,
        padding:rateNum(10)
    },
    DetailItem: {
        marginVertical:rateNum(2)
    },
    telNum: {
        fontWeight: "bold"
    },
    HospitalNameText: {
        fontSize: rateNum(16),
        fontWeight:"bold"
    },
    HospitalName:{
        borderWidth: 1,
        marginHorizontal: rateNum(15),
        backgroundColor: GetColor("white"),
        marginBottom:rateNum(15),
        borderRadius:5,
        padding:rateNum(10)
    },
    innerViewText: {
        fontSize:rateNum(14)
    },
    innerView: {
        marginVertical:rateNum(2)
    },
    infoInner: {
        marginTop:rateNum(5)
    },
    infoText: {
        color: GetColor("color2")
    },
    infoText2: {
        fontWeight:"bold"
    },
    info: {
        marginHorizontal: rateNum(15),
        marginBottom: rateNum(15),
        borderWidth: 1,
        borderColor:GetColor("white"),
        backgroundColor: GetColor("white"),
        borderRadius:5,
        padding:rateNum(10)
    },
    Heading2Text: {
        fontWeight:"bold",
        fontSize: rateNum(20)
    },
    Heading2: {
        marginHorizontal: rateNum(15),
        marginBottom: rateNum(10)
    }
})



