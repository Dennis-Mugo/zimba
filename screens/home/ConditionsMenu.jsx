import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ZimbaContext } from '../../context/context';

const ConditionsMenu = () => {
    const { searchPlace } = useContext(ZimbaContext);
    useEffect(() => {
        (async () => {
            // await searchPlace();
        })()
    }, [])
    return(
    <View>
        <Text>ConditionsMenu</Text>
    </View>
)};

const styles = StyleSheet.create({
    
});

export default ConditionsMenu;
