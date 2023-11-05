import React, { useContext, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { ZimbaContext } from "../../context/context";
import CustomColors from "../../constants/colors";
import { Image } from "react-native";
import CustomAvatar from "../../Components/CustomAvatar";
import { Icon } from "@rneui/themed";

const { width, height } = Dimensions.get("window");
const DashScreen = ({ navigation }) => {
  const { searchPlace, logOut, currentUser } = useContext(ZimbaContext);
  useEffect(() => {
    (async () => {
      // await searchPlace();
    })();
  }, []);

  const handleSignOut = async () => {
    await logOut();
    navigation.replace("AuthNavigator");
  };

  const handleMoreInfoPress = () => {
    navigation.navigate("info");
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.header}>
        <View style={styles.dummy} />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Tiba AI</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <CustomAvatar style={{ marginRight: 20 }} />
        </View>
      </View>

      <Image
        source={require("../../assets/images/rafiki_in_screen.png")}
        style={{
          width: width,
          height: 0.55 * height,
          marginVertical: 5,
          borderWidth: 1,
        }}
      />
      <View style={styles.bannerTextCenter}>
        <Text style={styles.bannerText}>Your AI powered health assistant</Text>
      </View>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#DDDDDD"
        style={styles.buttonHighLight}
        onPress={handleMoreInfoPress}
      >
        <View style={styles.buttonWrapper}>
          <Icon
            name="information-circle-outline"
            type="ionicon"
            color={CustomColors.googleBlue}
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.moreInfo}>
            Provide more info to improve the accuracy of responses
          </Text>
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: CustomColors.themeBackground,
    flexGrow: 1,
  },
  title: {
    fontFamily: "nunitoRegular",
    fontSize: 25,
  },
  header: {
    marginTop: 40,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerText: {
    fontFamily: "nunitoRegular",
    marginHorizontal: 20,
    fontSize: 16,
  },
  bannerTextCenter: {
    alignItems: "center",
  },
  dummy: {
    flex: 1,
  },
  buttonHighLight: {
    borderRadius: 10,
    borderColor: CustomColors.greyScale400,
    borderWidth: 1,
    marginHorizontal: 20,
    height: 70,
    marginTop: 25

  },
  buttonWrapper: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    borderRadius: 10
    
    
    // flexWrap: "wrap"
  },
  moreInfo: {
    fontFamily: "nunitoMedium",
    maxWidth: "80%"
  }
});

export default DashScreen;
