import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { ZimbaContext } from '../../context/context';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = ({navigation}) => {
    const { currentUser } = useContext(ZimbaContext);
    useEffect(() => {
        if (!currentUser) {
            navigation.replace("letIn");
        }
    }, [])
    
    
    return (
    <View>
        <Text>"Loading screen"</Text>
    </View>
)};

export default LoadingScreen;
