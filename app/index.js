import React, {Component} from 'react';
import {
    Navigator,
    StatusBar,
    Linking,
    View,
    Platform,
    Alert,
    Text
} from 'react-native';

import Home from './home';
import Detail from './detail';
import CodePushPage from "./codePushPage";
import {CommonCSS, GetColor} from './common.style';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initRoute : null
        }
    }
    render() {
        const navigatorProps = {
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
                                <CodePushPage />
                            </View>
                        );
                    case 'Detail' :
                        return (
                            <View style={[CommonCSS.StatusBarBg1, {flex:1, paddingTop: $StatusBarHeight}]}>
                                <StatusBar backgroundColor={GetColor("black")} barStyle="light-content" />
                                <Detail title="상세정보" data={route.data} navigator={navigator} />
                            </View>
                        );
                    default :
                        return (
                            <View><Text>페이지를 찾을 수 없습니다.</Text></View>
                        );
                }
            },
            configureScene : (route)=>{
                if (route.sceneConfig) {
                    return route.sceneConfig;
                }
                return Navigator.SceneConfigs.FloatFromRight;
            }
        }
        return (
            <Navigator {...navigatorProps} ref="Nav" />
        );
    }
}
