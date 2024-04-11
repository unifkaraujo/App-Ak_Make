import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default props => {

    if (props.num!='') {
    return (
        <View style={style.Container}>

            <Text style={style.Num}> {props.num} </Text>
            
        </View>
    )
    } else {
        return ''
    }
}

const style = StyleSheet.create ({
    Container: {
      height: 20,
      width: 20,
      backgroundColor: '#b35f6d',
      marginLeft: 5,
      borderRadius: 10,
      flexDirection: "row", 
      justifyContent: "center", 
      alignItems: "center",
    },

    Num: {
      color: '#FFF',
    }
})