import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    ScrollView,
    Alert,
    Linking
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

import {CommonCSS} from './common.style';
import {DetailCSS} from './detail.style.js';

export class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _pop(){
        this.props.navigator.pop();
    }
    _phoneTel (TelNum) {
        const telNum = "tel:" + TelNum.replace(/-/gi,"");
        Alert.alert(
            '',
            '연결하시겠습니까?',
            [
                {text: '예', onPress: () => {
                    Linking.canOpenURL(telNum).then(supported => {
                        if (supported) {
                            Linking.openURL(telNum);
                        } else {
                            alert("tel:기능을 지원하지 않습니다.")
                        }
                    });
                }},
                {text: '아니오', onPress: () => {}},
            ]
        )
    }
    render() {
        console.log(this)
        return(
            <View style={[CommonCSS.wrapper, DetailCSS.wrapper]}>
                <View style={CommonCSS.Header}>
                    <View style={DetailCSS.PopBtnWrap}>
                        <TouchableHighlight onPress={()=>this._pop()} underlayColor={'transparent'}>
                            <Text style={DetailCSS.PopBtnText}>이전</Text>
                        </TouchableHighlight>
                    </View>
                    <Text style={CommonCSS.h1}>{this.props.title}</Text>
                </View>
                <ScrollView style={DetailCSS.DetailList}>
                    <View style={DetailCSS.Heading2}>
                        <Text style={DetailCSS.Heading2Text}>주요정보</Text>
                    </View>
                    <View style={DetailCSS.HospitalName}>
                        <View style={DetailCSS.innerView}><Text style={DetailCSS.HospitalNameText}>{this.props.data.dutyName}</Text></View>
                        <View style={DetailCSS.innerView}>
                            <TouchableHighlight onPress={()=>this._phoneTel(this.props.data.dutyTel3)} underlayColor={'transparent'}>
                                <Text style={DetailCSS.innerViewText}>응급실전화 : <Text style={DetailCSS.telNum}>{this.props.data.dutyTel3}</Text></Text>
                            </TouchableHighlight>
                        </View>
                        <View style={DetailCSS.innerView}><Text style={DetailCSS.innerViewText}>응급실 수 : <Text>{this.props.data.hvec}</Text></Text></View>
                    </View>
                    <View style={DetailCSS.info}>
                        <Text style={DetailCSS.infoText2}>응급실 수 추가정보</Text>
                        <View style={DetailCSS.infoInner}>
                            <Text style={DetailCSS.infoText}>예를들어 "응급실 : -24" 숫자는 정상적인 숫자입니다. 응급실 병상 수가 20개로 허가를 받고 운영을 하지만 환자가 그 이상이 내원했을 경우 발생하는 경우입니다. 위 같은 경우 총 44명의 환자를 접수 받았다는 것입니다. 병상이 20개 인데 어떻게 받을 수 있는가 의아해 하실 수 있으시지만 병원에서 임시 베드라는 것을 운영하여 환자를 추가 받을 수 있습니다.</Text>
                        </View>
                    </View>
                    <View style={DetailCSS.Heading2}>
                        <Text style={DetailCSS.Heading2Text}>기타정보</Text>
                    </View>
                    <View style={DetailCSS.DetailEtcList}>
                        <View style={DetailCSS.DetailItem}><Text>수술실 : <Text>{this.props.data.hvec}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>신경중환자 : <Text>{this.props.data.hvcc}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>신생중환자 : <Text>{this.props.data.hvncc}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>흉부중환자 : <Text>{this.props.data.hvccc}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>내과중환자실 : <Text>{this.props.data.hv2}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>외과중환자실 : <Text>{this.props.data.hv3}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>외과입원실(정형외과) : <Text>{this.props.data.hv4}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>신경과입원실 : <Text>{this.props.data.hv5}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>신경외과중환자실 : <Text>{this.props.data.hv6}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>약물중환자 : <Text>{this.props.data.hv7}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>화상중환자 : <Text>{this.props.data.hv8}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>외상중환자 : <Text>{this.props.data.hv9}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>venti(소아) : <Text>{this.props.data.hv10}</Text></Text></View>
                        <View style={DetailCSS.DetailItem}><Text>인큐베이터(보육기) : <Text>{this.props.data.hv11}</Text></Text></View>
                    </View>
                </ScrollView>

            </View>
        )
    }
}