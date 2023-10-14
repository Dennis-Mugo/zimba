import { Icon } from "@rneui/themed";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import CustomColors from "../../constants/colors";
import { ZimbaContext } from "../../context/context";

import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import Divider from "../../Components/Divider";
import { examplePrompts } from "../../constants/text";

const { width, height } = Dimensions.get("window");
const ChatScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(ZimbaContext);
  const [userChat, setUserChat] = useState("");
  const userInitials = currentUser?.email[0].toUpperCase();

  const handleGoBack = () => {
    navigation.pop();
  };

  const handleExamplePress = (index) => {
    let text = examplePrompts[index];
    text = text.title + text.sub;
    setUserChat(text);
  };

  const handleChat = (text) => {
    setUserChat(text);
  };

  const handleSendChat = async () => {
    console.log(userChat);
    setUserChat("");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color={CustomColors.dark1}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tiba AI</Text>
        <Avatar.Text
          size={30}
          label={userInitials}
          style={{ backgroundColor: CustomColors.googleBlue }}
        />
      </View>
      <Divider />
      <Image
        source={require("../../assets/images/ask_rafiki.png")}
        style={{
          width: width,
          height: 0.55 * height,
          marginVertical: 5,
          borderWidth: 1,
        }}
      />
      {examplePrompts.map((prompt, promptInd) => (
        <TouchableHighlight
        key={promptInd}
        underlayColor="#DDDDDD"
        style={styles.exampleWrapper}
        onPress={() => {
          handleExamplePress(promptInd);
        }}
      >
        <View style={styles.examplePrompts}>
          <View style={styles.exampleLeft}>
            <Text style={styles.exampleMain}>{prompt.title}</Text>
            <Text style={styles.exampleSub}>{prompt.sub}</Text>
          </View>
          <Icon
            name="send-outline"
            type="material-community"
            color={CustomColors.googleBlue}
          />
        </View>
      </TouchableHighlight>
      ))}
      

      <View style={styles.chatWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={userChat}
            onChangeText={handleChat}
            cursorColor={CustomColors.uberDark1}
            placeholder="Ask Tiba AI..."
          />

          {userChat.length ? (<Icon
            onPress={handleSendChat}
            reverse
            size={17}
            style={styles.sendIcon}
            name="send"
            type="material-community"
            color={CustomColors.uberDark1}
          />) : <></>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: CustomColors.white,
  },

  exampleWrapper: {
    borderWidth: 1,
    borderColor: CustomColors.greyScale400,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },

  examplePrompts: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exampleMain: {
    fontFamily: "nunitoSemiBold",
    fontSize: 14,
  },
  exampleSub: {
    fontFamily: "nunitoLight",
  },

  chatWrapper: {
    position: "absolute",
    bottom: 0,
    // borderWidth: 1,
    borderTopWidth: 1,
    borderTopColor: CustomColors.greyScale300,
    backgroundColor: CustomColors.white,
    width: width,
    // height: 65,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: CustomColors.greyScale400,
    height: 48,
    borderRadius: 27,
    width: 0.93 * width,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontFamily: "mooli",
    marginLeft: 15,
    fontSize: 16,
  },
  sendIcon: {
    
  },
  header: {
    flexDirection: "row",
    height: 0.07 * height,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",

    backgroundColor: CustomColors.white,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,

    // elevation: 1,
  },
  headerText: {
    fontFamily: "nunitoMedium",
    fontSize: 16,
  },
});

export default ChatScreen;
