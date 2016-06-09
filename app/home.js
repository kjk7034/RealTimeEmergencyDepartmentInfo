import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Picker,
    TouchableHighlight,
    Dimensions,
    Animated,
    Image,
    ListView
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
            locationSetAni : new Animated.ValueXY(),
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            dataLoading : false,
            pickerState1 :this.props.stage1,
            pickerState2 :this.props.stage2,
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
                        pickerState1 : responseText.name1,
                        pickerState2 : responseText.name2
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
                this._getData(this.state.stage1, this.state.stage2)
            })
            .catch((error)=>{
                console.log("ERROR  ", error)
            })
    }
    _setLocation (){
        this.setState({
            locationSetState : !this.state.locationSetState,
            dataLoading : false,
            stage1 : this.state.pickerState1,
            stage2 : this.state.pickerState2,
        })
        this._getData(this.state.pickerState1, this.state.pickerState2);
    }
    _locationDimmed (){
        this.setState({
            locationSetState : !this.state.locationSetState
        })
    }
    _getData(stage1, stage2){
        var _this = this;
        return new Promise((resolve, reject)=>{
            var fetchUrl = "http://wagunblog.com/School/api_parser.php?STAGE1=" + stage1 + "&STAGE2=" + stage2 + "&numOfRows=999&pageNo=1";
            fetch(fetchUrl)
                .then((response) => response.json())
                .then((responseText) => {

                    if(responseText.response.body.items.item.length > 1) {
                        _this.setState({
                            //dataArray : responseText.response.body.items.item,
                            dataSource : _this.state.dataSource.cloneWithRows(responseText.response.body.items.item),
                            dataLoading : true
                        })
                    } else {
                        var dataArray = [];
                        dataArray.push(responseText.response.body.items.item)
                        _this.setState({
                            dataSource : _this.state.dataSource.cloneWithRows(dataArray),
                            dataLoading : true
                        })
                    }


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
                                <Text style={HomeCSS.LocationBtnText}>지역 변경</Text>
                            </TouchableHighlight>
                        </View>
                        <Text style={CommonCSS.h1}>{this.props.title}</Text>
                    </View>
                    <View style={HomeCSS.LocationWrap}>
                        <Text style={HomeCSS.LocationText}>지역 : {this.state.stage1} / {this.state.stage2}</Text>
                    </View>
                    <ListHospital {...this.props} dataLoading={this.state.dataLoading} dataSource={this.state.dataSource} />
                    <Animated.View style={[HomeCSS.PickerWrap, {left:-deviceWidth,transform: this.state.locationSetAni.getTranslateTransform()}]}>
                        <View style={HomeCSS.PickerTextWrap}>
                            <Text style={HomeCSS.PickerText}>지역 설정하기</Text>
                        </View>
                        <View style={HomeCSS.PickerWrapInner}>
                            <Picker
                                style={HomeCSS.Picker1}
                                selectedValue={this.state.setStage1}
                                onValueChange={(setStage1) => {this.setState({setStage1, setStage2: 0, pickerState1 : this.state.datas[setStage1].name})}}>
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
                                onValueChange={(stage2) => {this.setState({setStage2: stage2, pickerState2: localAddr[this.state.setStage1].items[stage2].name})}}>
                                {localAddr[this.state.setStage1].items.map((data, index) => (
                                    <Picker.Item key={this.state.setStage1 + "_" + index} value={index} label={data.name} />
                                ))}
                            </Picker>
                            <View style={HomeCSS.BtnConfirmWrap}>
                                <TouchableHighlight onPress={()=>_this._setLocation()} underlayColor={'transparent'}>
                                    <View style={HomeCSS.BtnConfirm}>
                                        <Text style={HomeCSS.BtnConfirmText}>설정</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={()=>_this._locationDimmed()} underlayColor={'transparent'}>
                                    <View style={HomeCSS.BtnCancel}>
                                        <Text style={HomeCSS.BtnCancelText}>취소</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={HomeCSS.PickerNextTextWrap}>
                            <Text style={HomeCSS.PickerNextText}>* 설정 버튼을 누르면 지역이 변경됩니다.</Text>
                        </View>
                    </Animated.View>

                </View>
            )
        }
    }
}

class ListHospital extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoading : this.props.dataLoading,
        }
    }
    _goView(data){
        this.props.navigator.push({
            name : "Detail",
            title : data.dutyName,
            data : data
        })
    }
    _renderRow (data, sectionId, rowID){
        var viewData = {
            'dutyName' : data.dutyName,
            'dutyTel3' : data.dutyTel3,
            'hvec' : data.hvec || 0,
            'hvcc' : data.hvcc || 0,
            'hvncc' : data.hvncc || 0,
            'hvccc' : data.hvccc || 0,
            'hv2' : data.hv2 || 0,
            'hv3' : data.hv3 || 0,
            'hv4' : data.hv4 || 0,
            'hv5' : data.hv5 || 0,
            'hv6' : data.hv6 || 0,
            'hv7' : data.hv7 || 0,
            'hv8' : data.hv8 || 0,
            'hv9' : data.hv9 || 0,
            'hv10' : data.hv10 || "N",
            'hv11' : data.hv11 || "N"
        }
        var _this = this;
        return(
            <View style={HomeCSS.ListItem}>
                <TouchableHighlight onPress={()=>_this._goView(viewData)} underlayColor={'transparent'}>
                    <View style={HomeCSS.ListItemBtn}><Text style={HomeCSS.ListItemBtnText}>{data.dutyName}</Text></View>
                </TouchableHighlight>
            </View>


        )
    }
    render() {
        if(!this.props.dataLoading) {
            return(
                <View style={CommonCSS.Loading}>
                    <Image source={require('./images/loader.gif')} style={CommonCSS.LoadingImg} />
                </View>
            )
        }
        return(
            <ListView
                dataSource={this.props.dataSource}
                contentContainerStyle={HomeCSS.Lists}
                renderRow={this._renderRow.bind(this)}
            />
        )
    }
}