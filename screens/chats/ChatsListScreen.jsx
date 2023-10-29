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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const { width, height } = Dimensions.get("window");

const ChatsListScreen = ({navigation}) => {
  const { currentUser } = useContext(ZimbaContext);
  const [conversations, setConversations] = useState([]);
  let userInitial = currentUser?.email[0].toUpperCase();

  useEffect(() => {
    (async () => {
      let conversationsRef = collection(db, `users/${currentUser.userId}/conversations`);
      let result = await getDocs(conversationsRef);
      let list = []
      result.forEach((conversationItem) => {
        list.push(conversationItem);
      })
      setConversations(list);
                                                                        
    })()
  }, [])

 
  const handleNewChat = () => {
    navigation.navigate("Chat", {conversationId: null});
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Avatar.Text
          size={30}
          label={userInitial}
          style={{ backgroundColor: CustomColors.googleBlue }}
        />
        <Text style={styles.headerText}>Chats</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={handleNewChat}>
          <Icon type="antdesign" name="plus" color={CustomColors.uberDark1} />
        </TouchableOpacity>
      </View>
      {conversations.map(item => <TouchableOpacity style={{marginVertical: 10}} key={item.id} onPress={() => {
        navigation.navigate("Chat", {conversationId: item.id})
      }}><Text>{item.id}</Text></TouchableOpacity>)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
  header: {
    height: 0.07 * height,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,

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
