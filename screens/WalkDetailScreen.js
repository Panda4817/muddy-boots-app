import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const WalkDetailScreen = (props) => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export const screenOptions = (navData) => {
    return {
        headerTitle: navData.route.params.title
    }
};

const styles = StyleSheet.create({});

export default WalkDetailScreen;
