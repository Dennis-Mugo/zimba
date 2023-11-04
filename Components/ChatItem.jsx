import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import CustomAvatar from "./CustomAvatar";
import CustomColors from "../constants/colors";

const {width, height} = Dimensions.get("window");
const ChatItem = ({ chatObj }) => {
  return (
    <>
      {chatObj.role == "assistant" ? (
        <View style={styles.chatLeftContainer}>
          <CustomAvatar type="bot" style={{marginRight: 5}} />
          <View style={styles.contentContainer}>
            <View style={styles.contentWrapperLeft}>
              <Text style={styles.contentLeft}>{chatObj.content}</Text>
            </View>
            <Text style={[styles.date, styles.dateLeft]}>{new Date(parseInt(chatObj.dateCreated)).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).toLowerCase()}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.chatRightContainer}>
          
          <View style={styles.contentContainerRight}>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentRight}>{chatObj.content}</Text>
            </View>
            <Text style={[styles.date, styles.dateRight]}>
              {new Date(parseInt(chatObj.dateCreated)).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).toLowerCase()}
            </Text>
          </View>
          <CustomAvatar style={{marginLeft: 5}} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  chatLeftContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  chatRightContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",

    marginVertical: 10,
    paddingHorizontal: 15,
  },
  contentContainer: {
    maxWidth: width * 0.8,
  },
  contentContainerRight: {
    // borderWidth: 1,
    alignItems: "flex-end",
    maxWidth: width * 0.8,
  },
  avatar: { marginRight: 8 },
  contentWrapper: {
    backgroundColor: CustomColors.greyScale200,
    padding: 10,
    borderRadius: 15,
    borderTopRightRadius: 0,

  },
  contentWrapperLeft: {
    backgroundColor: CustomColors.uberDark3,
    padding: 10,
    borderRadius: 15,
    borderTopLeftRadius: 0,
  },
  contentRight: {
    fontFamily: "nunitoMedium",
    fontSize: 13,
    color: CustomColors.black,
  },
  contentLeft: {
    fontFamily: "nunitoMedium",
    fontSize: 13,
    color: CustomColors.white,
  },
  date: {
    color: CustomColors.greyScale700,
    fontSize: 11,
    fontFamily: 'nunitoLight',
    
  },
  dateRight: {
    marginRight: 10
  },
  dateLeft: {
    marginLeft: 10
  }
});

export default ChatItem;
