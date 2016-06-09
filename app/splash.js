import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Picker,
    TouchableHighlight,
    Dimensions,
    Animated
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

import {CommonCSS} from './common.style';
import {HomeCSS} from './home.style';
const localAddr = require('./addr.json')

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage1 : this.props.stage1,
            stage2 : this.props.stage2,
            setStage1 : 0,
            setStage2 : 0,
            datas : localAddr,
            locationSetState : false,
            locationSetAni : new Animated.ValueXY()
        }
    }
    getCurrentPos(){
        return new Promise((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition((position)=>{
                //console.log("getCurrentPos - success")
                resolve(position.coords)
            }, (error) =>{
                var defaultPos = {
                    longitude : 127.1163593869371,
                    latitude : 37.40209529907863
                }
                resolve(defaultPos);
                reject("getCurrentPos - ERROR");
            })
        })
    }
    getCoord2addr(pos){
        return new Promise((resolve, reject)=>{
            var fetchUrl = "http://wagunblog.com/School/api_coord2addr.php?longitude="+pos.longitude+'&latitude='+pos.latitude;
            fetch(fetchUrl)
                .then((response) => response.json())
                .then((responseText) => {
                    this.setState({
                        stage1 : responseText.name1,
                        stage2 : responseText.name2,
                    })
                    console.log("getCoord2addr - success");
                    resolve()
                })
                .catch((error) => {
                    reject("getCoord2addr - ERROR");
                });
        })
    }
    setStage(){
        return new Promise((resolve, reject)=>{
            var _this = this;
            var STAGE1 = localAddr.findIndex(function(addr){
                return addr.name == _this.state.stage1
            })
            if(STAGE1 < 0) {
                STAGE1 = 0;
            }
            var STAGE2 = localAddr[STAGE1].items.findIndex(function(addr){
                return addr.name == _this.state.stage2
            })
            if(STAGE2 < 0) {
                STAGE2 = 0;
            }
            this.setState({
                setStage1 : String(STAGE1),
                setStage2 : STAGE2,
            })
            resolve("success");
        })
    }
    componentDidMount (){
        this.getCurrentPos()
            .then((pos)=>{
                return this.getCoord2addr(pos)
            })
            .then(()=>{
                this.setStage()
            })
            .then(()=>{
                this._getData()
            })
            .catch((error)=>{
                console.log("ERROR  ", error)
            })
    }
    _setLocation (){
        this.setState({
            locationSetState : !this.state.locationSetState
        })
    }
    _locationDimmed (){
        console.log("_locationDimmed")
        this.setState({
            locationSetState : !this.state.locationSetState
        })
    }
    _getData(){
        return new Promise((resolve, reject)=>{
            var fetchUrl = "http://wagunblog.com/School/api_parser.php?STAGE1=" + this.state.stage1 + "&STAGE2=" + this.state.stage2 + "&numOfRows=999&pageNo=1";
            fetch(fetchUrl)
                .then((response) => response.json())
                .then((responseText) => {
                    console.log("responseText", responseText.response.body.items.item)
                    resolve()
                })
                .catch((error) => {
                    reject("_getData - ERROR")
                });
        })
    }
    render() {
        if(!this.state.setStage1) {
            return(
                <View style={[CommonCSS.wrapper, CommonCSS.contCenter]}>
                    <Text style={CommonCSS.warningText}>현재 위치값을 가져오고 있습니다.</Text>
                    <Text style={CommonCSS.warningText}>잠시만 기다려주세요.</Text>
                </View>
            )

        } else {
            var _this = this;
            if(this.state.locationSetState) {
                Animated.sequence([
                    Animated.timing(
                        this.state.locationSetAni,
                        {
                            duration:200,
                            toValue: {x: deviceWidth, y:0}
                        }
                    )
                ]).start();
            } else {
                Animated.sequence([
                    Animated.timing(
                        this.state.locationSetAni,
                        {
                            duration:150,
                            toValue: {x: 0, y:0}
                        }
                    )
                ]).start();
            }
            return(
                <View style={[CommonCSS.wrapper, HomeCSS.wrapper]}>
                    <View style={CommonCSS.Header}>
                        <View style={HomeCSS.LocationBtnWrap}>
                            <TouchableHighlight onPress={()=>this._locationDimmed()} underlayColor={'transparent'}>
                                <Text style={HomeCSS.LocationBtnText}>지역 설정</Text>
                            </TouchableHighlight>
                        </View>
                        <Text style={CommonCSS.Title}>{this.props.title}</Text>
                    </View>
                    <View style={HomeCSS.LocationWrap}>
                        <View style={HomeCSS.LocationInner}>
                            <View style={HomeCSS.LocationTextWrap}>
                                <Text style={HomeCSS.LocationText}>{this.state.stage1}</Text>
                            </View>
                            <View style={HomeCSS.LocationTextWrap}>
                                <Text style={HomeCSS.LocationText}>{this.state.stage2}</Text>
                            </View>

                        </View>
                        <View style={HomeCSS.LocationInfo}>
                            <Text style={HomeCSS.LocationInfoText}>설정된 지역변경은 지역명을 클릭해주세요.</Text>
                        </View>
                    </View>
                    <Animated.View style={[HomeCSS.PickerWrap, {left:-deviceWidth,transform: this.state.locationSetAni.getTranslateTransform()}]}>
                        <View style={HomeCSS.PickerTextWrap}>
                            <Text style={HomeCSS.PickerText}>지역 설정하기</Text>
                        </View>
                        <View style={HomeCSS.PickerWrapInner}>
                            <Picker
                                style={HomeCSS.Picker1}
                                selectedValue={this.state.setStage1}
                                onValueChange={(setStage1) => {this.setState({setStage1, setStage2: 0, stage1 : this.state.datas[setStage1].name})}}>
                                {Object.keys(this.state.datas).map((setStage1) => (
                                    <Picker.Item
                                        key={setStage1}
                                        value={setStage1}
                                        label={this.state.datas[setStage1].name}
                                    />
                                ))}
                            </Picker>
                            <Picker
                                style={HomeCSS.Picker2}
                                key={this.state.setStage1}
                                selectedValue={this.state.setStage2}
                                onValueChange={(stage2) => {this.setState({setStage2: stage2, stage2: localAddr[this.state.setStage1].items[stage2].name})}}>
                                {localAddr[this.state.setStage1].items.map((data, index) => (
                                    <Picker.Item key={this.state.setStage1 + "_" + index} value={index} label={data.name} />
                                ))}
                            </Picker>
                            <View style={HomeCSS.BtnConfirmWrap}>
                                <TouchableHighlight onPress={()=>_this._setLocation()} underlayColor={'transparent'}>
                                    <View style={HomeCSS.BtnConfirm}>
                                        <Text style={HomeCSS.BtnConfirmText}>확인</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Animated.View>

                </View>
            )
        }
    }
}
