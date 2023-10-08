import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "@rneui/themed";
import CustomColors from "../constants/colors";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import "expo-dev-client";
import { GOOGLE_SIGNIN_CLIENT_ID } from "../constants";
import { ZimbaContext } from "../context/context";

const { width, height } = Dimensions.get("window");
const GoogleLogin = (props) => {
  const navigation = useNavigation();
  const { saveUser } = useContext(ZimbaContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  GoogleSignin.configure({
    webClientId: GOOGLE_SIGNIN_CLIENT_ID,
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    // Get the users ID token
    try {
      setLoading(true);
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user_sign_in = auth().signInWithCredential(googleCredential);
      user_sign_in
        .then(async (user) => {
          console.log(user.user.email, "just signed in");
          const userId = user.user.uid;
          const userObj = {
            dateCreated: Date.now(),
            email: user.user.email,
            displayName: user.user.displayName,
            photoUrl: user.user.photoURL,
            provider: "google",
          };
          await saveUser(userId, userObj);
          navigation.replace("MainNavigator");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log("signed out");
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return null;

  return (
    <TouchableOpacity
      style={styles.socialBtn}
      activeOpacity={0.5}
      onPress={onGoogleButtonPress}
    >
      {loading ? (
        <ActivityIndicator
          style={{ marginRight: 14 }}
          size="small"
          color={CustomColors.googleBlue}
        />
      ) : (
        <Icon
          name="logo-google"
          type="ionicon"
          color={CustomColors.googleBlue}
          style={{ marginRight: 15 }}
        />
      )}
      <Text style={styles.btnText}>
        {loading ? "Signing you in..." : "Continue with Google"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "mooli",
    fontSize: 16,
    color: CustomColors.uberDark1,
  },

  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: CustomColors.greyScale400,
    width: 0.85 * width,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 20,
  },
});

export default GoogleLogin;
