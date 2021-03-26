import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, TouchableNativeFeedbackComponent } from 'react-native';
import Colors from '../constants/Colors';

const MainButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21){
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.viewContainer}>
            <ButtonComponent onPress={props.onPress} activeOpacity={0.6}>
                <View style={{...styles.buttonContainer, ...props.styleContainer}}>
                    <Text style={{...styles.buttonText, ...props.styleText}}>
                        {props.children}
                    </Text>
                </View>
            </ButtonComponent>
        </View>
    );
};


const styles = StyleSheet.create({
    viewContainer: {
        borderRadius: 50,
        overflow: 'hidden'
    },
    buttonContainer: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50
    },
    buttonText: {
        fontSize: 25,
        fontFamily: 'caveat-brush',
        color: Colors.accent
    }

});

export default MainButton;