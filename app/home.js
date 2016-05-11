import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Picker
} from 'react-native';

import {CommonCSS} from './common.style';
import {HomeCSS} from './home.style';
const localAddr = require('./addr.json')

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage1 : null,
            stage2 : null,
            setStage1 : 0,
            setStage2 : 0,
            datas : localAddr
        }
    }
    getCurrentPos(){
        return new Promise((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition((position)=>{
                resolve(position.coords)
            }, (error) =>{
                var defaultPos = {
                    longitude : 127.1163593869371,
                    latitude : 37.40209529907863
                }
                resolve(defaultPos)
                console.log("ERROR", error)
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
                    resolve()
                })
                .catch((error) => {
                    console.log("ERROR", error);
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
            resolve()
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
            return(
                <View style={CommonCSS.wrapper}>
                    <Picker
                        style={HomeCSS.Picker1}
                        selectedValue={this.state.setStage1}
                        onValueChange={(setStage1) => {
                            this.setState({setStage1, setStage2: 0, stage1 : this.state.datas[setStage1].name})
                        }}>
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
                        onValueChange={(stage2) => this.setState({setStage2: stage2, stage2: localAddr[this.state.setStage1].items[stage2].name})}>
                        {localAddr[this.state.setStage1].items.map((data, index) => (
                            <Picker.Item key={this.state.setStage1 + "_" + index} value={index} label={data.name} />
                        ))}
                    </Picker>
                </View>
            )
        }
    }
}
