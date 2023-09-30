import { Icon } from '@rneui/base';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomColors from '../constants/colors';

const {width, height} = Dimensions.get("window");
const BackArrow = ({onPress}) => (
    <View style={styles.backWrapper}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <Icon name='arrow-back-outline' type="ionicon" color={CustomColors.dark1} style={styles.backArrow} />
            </TouchableOpacity>
        
        </View>
);

const styles = StyleSheet.create({
    backWrapper: {
        alignItems: "baseline",
        
    },
    backArrow: {
        marginVertical: 0.045 * height,
        marginHorizontal: 0.07 * width
    }
});
export default BackArrow;
