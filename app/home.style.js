import {
    StyleSheet,
    Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
import {rateNum, GetColor} from './common.style';

export const HomeCSS = StyleSheet.create({
    LocationWrap: {
        padding:rateNum(15),
        backgroundColor: GetColor("white"),
        borderBottomWidth:1,
        borderBottomColor: GetColor("color3"),
        marginBottom:rateNum(15)
    },
    LocationTextWrap: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding: rateNum(5),
        paddingHorizontal: rateNum(2),
        borderWidth: 1,
        marginRight:rateNum(10),
        marginTop: rateNum(15),
        backgroundColor:GetColor("color4"),
        borderRadius:5
    },
    LocationBtnWrap: {
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
    LocationBtnText: {
        fontSize: rateNum(16),
        color:GetColor("color2")
    },
    LocationText: {
        fontSize: rateNum(16),
        color:GetColor("color5")
    },
    LocationInfo: {
        marginTop: rateNum(10),
        alignItems: "center"
    },
    LocationInfoText: {
        fontSize: rateNum(16)
    },
    PickerWrap: {
        position:"absolute",
        left:0,
        right:0,
        top:0,
        bottom:0,
        backgroundColor: GetColor("white"),
        padding:10,
        flex:1,
        width:deviceWidth
    },
    PickerTextWrap:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding:rateNum(25)
    },
    PickerText:{
        fontSize: rateNum(25),
        color: GetColor("black")
    },
    PickerWrapInner: {
        flexDirection: "row",
        alignItems: "center",
    },
    Picker1: {
        flex:0.4,
        padding:10,
        overflow:"hidden"
    },
    Picker2: {
        flex:0.4,
        padding:10
    },
    PickerNextTextWrap: {
        marginTop:rateNum(15),
        alignItems:"center"
    },
    PickerNextText: {
        fontSize: rateNum(16),
        color: "#333"
    },
    BtnConfirmWrap: {
        flex:0.2
    },
    BtnConfirm:{
        borderWidth:1,
        alignItems:"center",
        padding:rateNum(10),
        borderRadius:5,
        backgroundColor: GetColor("color1"),
        borderColor: GetColor("color1"),
        marginHorizontal:rateNum(5)
    },
    BtnConfirmText: {
        fontSize: rateNum(16),
        color:GetColor("white")
    },
    BtnCancel: {
        borderWidth:1,
        alignItems:"center",
        padding:rateNum(10),
        borderRadius:5,
        backgroundColor: GetColor("gray"),
        borderColor: GetColor("gray"),
        marginTop:rateNum(7),
        marginHorizontal:rateNum(5)
    },
    BtnCancelText: {
        fontSize: rateNum(16),
        color:GetColor("white")
    },
    Lists: {
        flex:1,
    },
    ListItem: {
        borderWidth: 1,
        justifyContent:"center",
        marginHorizontal: rateNum(15),
        backgroundColor: GetColor("white"),
        marginBottom:rateNum(15),
        borderRadius:5
    },
    ListItemBtn: {
        padding:rateNum(15)
    },
    ListItemBtnText: {
        color:GetColor("color6")
    },
    ListItemIcon: {
        position:"absolute",
        right:rateNum(15),

    }
})



