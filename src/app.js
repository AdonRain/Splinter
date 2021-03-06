import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, ScrollView, TextInput, Dimensions, AsyncStorage,
} from 'react-native';

import styles from './styles';
import {menus, pages, data} from './config';
import {stat} from './utils';

export default class Splinter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus, data,
            tabIndex: 0,
            inputText: '',
            maskShow: false,
            isEdit: false,
            editing: {name: '', item: -1},
        };
    }
    componentDidMount(){
        AsyncStorage.getItem('data', (err, res) => {
            if(err){
                alert(JSON.stringify(err));
            }else{
                if(!res){
                    AsyncStorage.setItem('data', JSON.stringify(data), (err) => {
                        if(err){
                            alert(JSON.stringify(err));
                        }
                    });
                }else{
                    this.setState({data: JSON.parse(res)});
                }
            }
        });
    }
    toggleMask(flag, name = '', item = -1){
        const {data} = this.state;
        const inputText = flag && item > -1 ? data[name][item].join(',') : '';

        this.setState({
            inputText,
            maskShow: flag,
            isEdit: !!inputText,
            editing: {name, item},
        });
    }
    doSubmit(type){
        const {data, isEdit, inputText, editing: {name, item}} = this.state;
        const newData = Object.assign({}, data);
        const spliceLen = isEdit ? 1 : 0;

        if(type){
            if(name == 'stat'){
                this.postData(inputText);
            }else{
                newData[name].splice(item, spliceLen, inputText.split(','));
                newData[name].sort((a, b) => (b[1] - a[1]));
            }
        }else{
            if(name == 'stat'){
                this.getData(inputText);
            }else{
                newData[name].splice(item, spliceLen);
            }
        }

        AsyncStorage.setItem('data', JSON.stringify(newData), (err) => {
            if(err){
                alert(JSON.stringify(err));
            }else{
                this.setState({data: newData});
                this.toggleMask(false);
            }
        });
    }
    getData(url){
        fetch(url).then(res => {
            return res.json();
        }).then(({code, msg, data}) => {
            if(code == 200){
                this.setState({data});
            }else{
                alert(msg);
            }
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }
    postData(url){
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.data),
        }).then(res => {
            return res.json();
        }).then(({code, msg}) => {
            alert(code == 200 ? '上传成功' : msg);
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }
    render() {
        const {
            getStat, toggleMask, doSubmit,
            state: {
                data, menus, tabIndex, maskShow, inputText, isEdit,
            }
        } = this;
        const page = pages[tabIndex];
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        const statData = stat(data);

        return (
            <View style={styles.pageWrap}>
                <TouchableOpacity onLongPress={toggleMask.bind(this, true, page.name)}>
                    {
                        tabIndex == 0 ? (
                            <View style={styles.headWrap}>
                                <Text style={styles.headText}>{page.head}</Text>
                            </View>
                        ) : (
                            <View style={styles.listHead}>
                                {page.head.map((item, i) => <Text
                                    key={`tab-${tabIndex}-${i}`}
                                    style={ i == 0 ? styles.listTextLeft : styles.listTextRight}>{item}</Text>)}
                            </View>
                        )
                    }
                </TouchableOpacity>
                {
                    tabIndex == 0 ? (
                        <ScrollView>
                            {
                                statData.map(({left, right}, i) => {
                                    const lv = left.value || 0, rv = right.value || 0;
                                    const ratio = rv > 0 ? lv / rv : 0;
                                    const width = ratio * (screenWidth - 30);
                                    return (
                                        <View
                                            key={`stat-${ i }`}
                                            style={styles.statWrap}>
                                            <View style={styles.statBar}>
                                                <Text style={{
                                                    width,
                                                    height: 30,
                                                    fontSize: 16,
                                                    textAlign: 'center',
                                                    textAlignVertical: 'center',
                                                    backgroundColor: '#ae81ff',
                                                    color: '#ffffff',
                                                }}>{width > 60 && `${ (100 * ratio).toFixed(2) }%`}</Text>
                                            </View>
                                            <View style={styles.statInfo}>
                                                <Text style={styles.statText}>{left.name} ::: {lv}</Text>
                                                <Text style={styles.statText}>{rv} ::: {right.name}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    ) : (
                        <ScrollView>
                            {
                                data[page.name].map((items, rid) => {
                                    return (
                                        <TouchableOpacity
                                            key={`${page.name}-${ rid }`}
                                            onLongPress={toggleMask.bind(this, true, page.name, rid)}>
                                            <View style={styles[`cellWrap${rid % 2}`]}>
                                                {
                                                    items.map((item, cid) => <Text
                                                        key={`list-${rid}-${cid}`}
                                                        style={ cid == 0 ? styles.cellText : styles.cellNumber}
                                                    >{item}</Text>)
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    )
                }
                <View style={styles.menuWrap}>
                    {
                        menus.map((menu, i) => {
                            return (
                                <TouchableOpacity
                                    key={`menu-${i}`}
                                    style={styles[i == tabIndex ? 'menuActive' : 'menuItem']}
                                    onPress={() => this.setState({tabIndex: i})}>
                                    <Text style={styles.menuText}>{menu}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
                {
                    maskShow && (
                        <View style={{
                            top: 0,
                            left: 0,
                            width: screenWidth,
                            height: screenHeight,
                            position: 'absolute',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            backgroundColor: '#ffffff',
                        }}>
                            <View style={styles.operWrap}>
                                <TextInput
                                    style={styles.operInput}
                                    onChangeText={(inputText) => this.setState({inputText})}
                                    value={inputText}
                                    autoCorrect={false}
                                    autoFocus={true}
                                />
                                <View style={styles.operBtnWrap}>
                                    <TouchableOpacity
                                        onPress={doSubmit.bind(this, true)}
                                        style={styles.operBtns}>
                                        <Text style={styles.operBtnText}>
                                            {page.name == 'stat' ? '上传' : (
                                                isEdit ? '确定' : '添加'
                                            )}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={doSubmit.bind(this, false)}
                                        style={styles.operBtns}>
                                        <Text style={styles.operBtnText}>
                                            {page.name == 'stat' ? '下载' : (
                                                isEdit ? '删除' : '取消'
                                            )}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={toggleMask.bind(this, false)} style={styles.operMask} />
                        </View>
                    )
                }
            </View>
        );
    }
};
