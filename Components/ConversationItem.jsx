import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import CustomColors from "../constants/colors";

const ConversationItem = ({ conversationObj }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Chat", {
      conversationId: conversationObj.conversationId,
    });
  };

  const formatContent = (text) => {
    return text.slice(0, 20) + "...";
  }

  const formatDate = (date) => {
    return new Date(parseInt(date)).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).toLowerCase()
  }

  return (
    <View style={styles.container}>
    <TouchableHighlight
      onPress={handlePress}
      underlayColor="#DDDDDD"
      activeOpacity={0.6}
      style={{borderRadius: 10}}
    //   delayPressIn={true}
    >
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
            <Icon type="ionicon" name="chatbox" style={styles.icon} />
            <Text style={styles.titleText}>{formatContent(conversationObj.title)}</Text>
        </View>
        <View style={styles.dateWrapper}>
            <Text style={styles.date}>{formatDate(conversationObj.dateCreated)}</Text>

        </View>
      </View>
    </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        paddingVertical: 7,
        paddingHorizontal: 15
    },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    borderWidth: 1,
    borderColor: CustomColors.greyScale300,
    borderRadius: 10,
    
    paddingHorizontal: 20,
    backgroundColor: CustomColors.white
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  date: {
    fontFamily: "nunitoExtraLight",
    fontSize: 12
  },
  dateWrapper: {
    justifyContent: 'center',
  },
  icon: {
    marginRight: 15,
  },
  titleText: {
    fontFamily: "nunitoMedium",
  },
});

export default ConversationItem;
