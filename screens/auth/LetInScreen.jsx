import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomColors from "../../constants/colors";
import { Icon } from "@rneui/themed";
import Divider from "../../Components/Divider";
import CustomButton from "../../Components/CustomButton";
import GoogleLogin from "../../Components/GoogleLogin";

const { height, width } = Dimensions.get("window");

const LetInScreen = ({ navigation }) => {
  const handleNavigateSignUp = () => {
    navigation.push("signUp");
  }
  return (
  <ScrollView style={styles.container}>
    <View style={styles.centerContainer}>
      <Image
        style={styles.bannerImage}
        source={require("../../assets/images/letin.png")}
      />
      <Text style={styles.bannerText}>Tiba AI</Text>
      <GoogleLogin />
      <Divider text={"or"} style={{ width: 0.85 * width, marginTop: 10 }} />
      <CustomButton
        title="Sign In with password"
        onPress={() => {
          navigation.navigate("signIn");
        }}
      />
    </View>
    <View style={styles.centerContainer}>
      <View style={styles.footerWrapper}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={handleNavigateSignUp}>
          <Text style={styles.signUpText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
)};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: CustomColors.themeBackground,
  },

  centerContainer: {
    marginTop: width * 0.1,
    alignItems: "center",
  },

  bannerImage: {
    width: width * 0.7,
    height: 0.35 * height,
    marginHorizontal: 10,
    marginVertical: 15,
  },

  bannerText: {
    fontFamily: "mooli",
    fontSize: 32,
    color: CustomColors.dark1,
  },
  btnText: {
    fontFamily: "mooli",
    fontSize: 16,
    color: CustomColors.uberDark1,
  },

  
  signInBtn: {
    backgroundColor: CustomColors.gradientBlue,
    width: 0.85 * width,
    height: 60,
    borderRadius: 20,
    marginVertical: 15,
  },
  passText: {
    fontFamily: "mooli",
    color: "white",
  },

  footerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  noAccountText: {
    fontFamily: "mooli",
    fontSize: 13,
  },
  signUpText: {
    fontFamily: "mooli",
    color: CustomColors.googleBlue,
    fontSize: 13,
  },
});

export default LetInScreen;
