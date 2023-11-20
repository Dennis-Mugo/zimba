import { Icon } from "@rneui/themed";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
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
import Divider from "../../Components/Divider";
import { examplePrompts } from "../../constants/text";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import ChatItem from "../../Components/ChatItem";
import "react-native-get-random-values";
import { v4 } from "uuid";
import Avatar from "../../Components/CustomAvatar";
import CustomAvatar from "../../Components/CustomAvatar";

const { width, height } = Dimensions.get("window");
const ChatScreen = ({ route, navigation }) => {
  const {
    conversationList,
    setConversationList,
    currentUser,
    generateChatResponse,
  } = useContext(ZimbaContext);
  const [conversationId, setConversationId] = useState(
    route.params.conversationId
  );
  // const [conversationId, setConversationId] = useState("p7S2h7eD7XdI3kNyyDpI");
  const [userChat, setUserChat] = useState("");
  const [chatInputFocused, setChatInputFocused] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  // const chatFlatList = useRef(null);

  useEffect(() => {
    (async () => {
      setResponseLoading(true);
      await fetchChats();
      setResponseLoading(false);
    })();
  }, []);

  const fetchChats = async () => {
    if (!conversationId) {
      setConversationList([]);
      return;
    }
    setConversationList([]);
    // const query = query(citiesRef, orderBy("name"), limit(3));
    let chatsRef = collection(
      db,
      `users/${currentUser.userId}/conversations/${conversationId}/chats`
    );
    const chatQuery = query(chatsRef, orderBy("dateCreated", "asc"));
    const response = await getDocs(chatQuery);
    let list = [];
    response.forEach((chatItem) => {
      list.push({ chatId: chatItem.id, ...chatItem.data() });
    });

    setConversationList(list);
  };

  const handleGoBack = () => {
    navigation.pop();
  };

  const handleExamplePress = (index) => {
    let text = examplePrompts[index];
    text = text.title + text.sub;
    handleChat(text);
  };

  const handleChat = (text) => {
    setUserChat(text);
  };

  const handleChatFocus = () => {
    setChatInputFocused(true);
  };

  const handleChatBlur = () => {
    setChatInputFocused(false);
  };

  const handleSendChat = async () => {
    setResponseLoading(true);
    let newConversation = false;
    let convId;
    if (!conversationId) {
      convId = v4();
      newConversation = true;
    } else {
      convId = conversationId;
    }
    setConversationId(convId);
    let currentChat = {
      role: "user",
      dateCreated: Date.now().toString(),
      content: userChat,
      chatId: v4(),
    };
    console.log("Conversation ID", convId);
    if (!convId) return;
    setConversationList(conversationList.concat([currentChat]));

    await generateChatResponse(currentChat, convId, newConversation);
    setResponseLoading(false);
  };

  console.log(conversationList);

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
        <CustomAvatar />
      </View>
      <Divider />
      {!conversationId ? (
        <ScrollView>
          <Image
            source={require("../../assets/images/ask_rafiki.png")}
            style={{
              width: width,
              height: 0.5 * height,
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
        </ScrollView>
      ) : (
        <FlatList
          contentContainerStyle={styles.chatList}
          ref={(ref) => (this.chatFlatList = ref)}
          onContentSizeChange={() =>
            this.chatFlatList != null &&
            this.chatFlatList.scrollToEnd({ animated: true })
          }
          onLayout={() =>
            this.chatFlatList != null &&
            this.chatFlatList.scrollToEnd({ animated: true })
          }
          ListFooterComponent={<ResponseLoader loading={responseLoading} />}
          data={conversationList}
          renderItem={({ item }) => (
            <ChatItem key={item.chatId} chatObj={item} />
          )}
        />
      )}

      <View style={styles.chatWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={userChat}
            onChangeText={handleChat}
            cursorColor={CustomColors.uberDark1}
            onFocus={handleChatFocus}
            onBlur={handleChatBlur}
            placeholder="Ask Tiba AI..."
          />

          {userChat.length ? (
            <Icon
              onPress={async () => {
                if (responseLoading) return;
                setUserChat("");
                await handleSendChat();
              }}
              reverse
              size={17}
              style={styles.sendIcon}
              name="send"
              type="material-community"
              color={CustomColors.uberDark1}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};

const ResponseLoader = ({ loading }) => {
  if (!loading) return <></>
  return (
    <ChatItem chatObj={{role: "loader"}} />
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
    // position: "absolute",

    // bottom: 0,
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
    height: 0.06 * height,
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
  sendIcon: {},
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
  chatList: {
    // height: 0.75 * height,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default ChatScreen;
