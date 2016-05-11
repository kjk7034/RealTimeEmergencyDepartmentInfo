'use strict';
import React, {
    Component,
    Navigator,
    StatusBar,
    Linking,
    View,
    Platform,
    Alert,
    Text
} from 'react-native';

import {Home} from './home';
import {CommonCSS, GetColor} from './common.style';
import {HomeCSS} from './home.style';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initRoute : null
        }
    }
    componentDidMount() {

    }
    render() {
        const _this = this;
        var navigatorProps = {
            initialRoute: {name:"Home"},
            renderScene: (route, navigator) => {

                const routeName = route.name;
                let $StatusBarHeight = null;
                if(Platform.OS == "ios") {
                    $StatusBarHeight = 20;
                } else {
                    $StatusBarHeight = 0;
                }

                switch (routeName) {
                    case 'Home' :
                        return (
                            <View style={[CommonCSS.StatusBarBg1, {flex:1, paddingTop: $StatusBarHeight}]}>
                                <StatusBar backgroundColor={GetColor("black")} barStyle="light-content" />
                                <Home title="HOME" navigator={navigator} />
                            </View>
                        );
                        break;

                    default :
                        return (
                            <View ><Text>페이지를 찾을 수 없습니다.</Text></View>
                        );
                        break;
                }
            },
            configureScene : (route)=>{
                if (route.sceneConfig) {
                    return route.sceneConfig;
                } else {
                    return Navigator.SceneConfigs.FloatFromRight;
                }
            }
        }
        return (
            <Navigator {...navigatorProps} ref="Nav" />
        );
    }
}