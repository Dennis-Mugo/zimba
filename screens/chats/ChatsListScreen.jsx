import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomColors from "../../constants/colors";
import { ZimbaContext } from "../../context/context";
import { Avatar } from "react-native-paper";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import ConversationItem from "../../Components/ConversationItem";
import Divider from "../../Components/Divider";
import CustomAvatar from "../../Components/CustomAvatar";

const { width, height } = Dimensions.get("window");

const ChatsListScreen = ({navigation}) => {
  const { currentUser } = useContext(ZimbaContext);
  const [conversations, setConversations] = useState([]);
  let userInitial = currentUser?.email[0].toUpperCase();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        let conversationsRef = collection(db, `users/${currentUser.userId}/conversations`);
        const conversationsQuery = query(conversationsRef, orderBy("dateCreated", "desc"));

        let result = await getDocs(conversationsQuery);
        let list = []
        result.forEach((conversationItem) => {
          list.push({...conversationItem.data(), conversationId: conversationItem.id});
        })
        setConversations(list);
                                                                          
      })()
    })
    return unsubscribe;
  }, [])

 
  const handleNewChat = () => {
    navigation.navigate("Chat", {conversationId: null});
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {/* <Avatar.Text
          size={30}
          label={userInitial}
          style={{ backgroundColor: CustomColors.googleBlue }}
        /> */}
        <CustomAvatar />
        <Text style={styles.headerText}>Chats</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={handleNewChat}>
          <Icon type="antdesign" name="plus" color={CustomColors.uberDark1} />
        </TouchableOpacity>
      </View>
      <Divider />
      <FlatList 
        data={conversations}
        renderItem={({ item }) => (
          <ConversationItem key={item.conversationId} conversationObj={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    height: 0.07 * height,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: CustomColors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  headerText: {
    fontFamily: "nunitoMedium",
    fontSize: 15,
  },
});

export default ChatsListScreen;
