import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChatItem = ({chatObj}) => {
    return (
    <View style={chatObj.role == 'assistant' ? styles.chatLeft : styles.chatRight}>
        <Text>{chatObj.content}</Text>
    </View>
)};

const styles = StyleSheet.create({
    chatLeft: {},
    chatRight: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: "center"
    }
});

export default ChatItem;
