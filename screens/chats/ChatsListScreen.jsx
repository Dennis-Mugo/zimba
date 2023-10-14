import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React, { useContext } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomColors from "../../constants/colors";
import { ZimbaContext } from "../../context/context";
import { Avatar } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const ChatsListScreen = () => {
  const { currentUser } = useContext(ZimbaContext);
  let userInitial = currentUser?.email[0].toUpperCase();

  const navigation = useNavigation();
  const handleNewChat = () => {
    navigation.navigate("Chat");
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
