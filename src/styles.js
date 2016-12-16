import React from 'react';
import {StyleSheet} from 'react-native';

const menuBase = {
    flex: 1,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
};

const cellWrapBase = {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}

export default StyleSheet.create({
    pageWrap: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f5fcff',
    },
    headWrap: {
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:'#c7254e',
    },
    headText: {
        fontSize: 22,
        color: '#ffffff',
        textAlign: 'center',
    },
    statWrap: {
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    statBar: {
        height: 30,
        backgroundColor: '#42b983',
    },
    statInfo: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statText: {
        fontSize: 16,
    },
    listHead: Object.assign({}, cellWrapBase, {
        backgroundColor: '#e96900',
    }),
    listTextLeft: {
        width: 100,
        fontSize: 18,
        textAlign: 'left',
        color: '#ffffff',
    },
    listTextRight: {
        width: 100,
        fontSize: 18,
        textAlign: 'right',
        color: '#ffffff',
    },
    cellWrap0: Object.assign({}, cellWrapBase),
    cellWrap1: Object.assign({}, cellWrapBase, {
        backgroundColor: '#e0f6ff',
    }),
    cellText: {
        width: 100,
        fontSize: 18,
        textAlign: 'left',
    },
    cellNumber: {
        width: 100,
        fontSize: 18,
        textAlign: 'right',
    },
    menuWrap: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    menuItem: Object.assign({}, menuBase, {
        backgroundColor: '#f9f2f4',
    }),
    menuActive: Object.assign({}, menuBase),
    menuText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#c7254e',
    },
    operWrap: {
        padding: 15,
    },
    operMask: {
        flex: 1,
        backgroundColor: '#333333',
    },
    operInput: {
        height: 40,
        backgroundColor: '#f8f8f8',
    },
    operBtnWrap: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    operBtns: {
        width: 80,
        height: 36,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2973b7',
    },
    operBtnText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff',
    }
});
