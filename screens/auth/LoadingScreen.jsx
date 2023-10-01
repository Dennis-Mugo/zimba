import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ZimbaContext } from '../../context/context';
import { useNavigation } from '@react-navigation/native';
import CustomColors from '../../constants/colors';

const LoadingScreen = ({navigation}) => {
    const { currentUser, fetchUser } = useContext(ZimbaContext);
    useEffect(() => {
        (async () => {
            let user = await fetchUser();
            if (!user) {
                navigation.replace("letIn");
            } else {
                navigation.replace("MainNavigator");
            }
        })()
    }, [])
    
    
    return (
    <View style={styles.container}>
       <ActivityIndicator size="large" color={CustomColors.dark1} />
       <Text style={styles.appName}>Zimba AI</Text>
    </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomColors.themeBackground,
        justifyContent: "center",
        alignItems: "center"
    },
    appName: {
        fontFamily: "mooli",
        fontSize: 24,
        marginTop: 20
    }
    
});

export default LoadingScreen;
