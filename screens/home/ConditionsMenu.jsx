import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ZimbaContext } from '../../context/context';

const ConditionsMenu = ({ navigation }) => {
    const { searchPlace, logOut, currentUser } = useContext(ZimbaContext);
    useEffect(() => {
        (async () => {
            // await searchPlace();
        })()
    }, []);

    const handleSignOut = async () => {
        await logOut();
        navigation.replace("AuthNavigator");

    }
    return(
    <View>
        <Text>ConditionsMenu</Text>
        <Text>{currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut}><Text>Sign out</Text></TouchableOpacity>
    </View>
)};

const styles = StyleSheet.create({
    
});

export default ConditionsMenu;
