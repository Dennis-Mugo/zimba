import React, { useContext, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomColors from "../../constants/colors";
import { Icon } from "@rneui/base";
import BackArrow from "../../Components/BackArrow";
import CustomButton from "../../Components/CustomButton";
import Divider from "../../Components/Divider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ZimbaContext } from "../../context/context";

const { width, height } = Dimensions.get("window");
const SignInScreen = ({ navigation }) => {
  const { saveLogin } = useContext(ZimbaContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(" ");
  const [emailFocused, setEmailFocused] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(" ");
  const [passFocused, setPassFocused] = useState(false);
  const [passMasked, setPassMasked] = useState(true);
  const [signinLoading, setSigninLoading] = useState(false);
  const minPassLength = 8;

  const handleEmail = (input) => {
    setEmailError(" ");
    setEmail(input);
  };

  const handlePassword = (input) => {
    setPassError(" ");
    setPass(input);
  };

  const handleEmailFocused = (event) => {
    setEmailFocused(true);
  };

  const handlePasswordFocused = (event) => {
    setPassFocused(true);
  };

  const handleInputBlurred = (inputName) => {
    if (inputName === "email") {
      setEmailFocused(false);
      if (!email) {
        setEmailError("Email cannot be empty!");
      }
    } else if (inputName === "password") {
      
      setPassFocused(false);
      if (!pass) {
        setPassError("Password cannot be empty!");
      }
      if (pass.length < minPassLength) {
        setPassError("Password should be 8 characters or more!");
      }
    }
  };

  const handleNavigateSignUp = () => {
    navigation.push("signUp");
  }

  const validateData = () => {
    if (!email || !pass || pass.length < minPassLength) return false;
    return true;
  };

  const handleSignInError = (message) => {
    console.log(message);
    if (message === 'auth/invalid-email') {
        setEmailError("Invalid email!");
    } else if (message === 'auth/invalid-login-credentials') {
      setPassError("Invalid credientials!");
    }
    
  }

  const handleSignIn = async () => {
    if (signinLoading || !validateData()) return;
    setSigninLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
  .then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    await saveLogin({userId: user.uid, email: user.email});
    navigation.replace("MainNavigator");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    handleSignInError(errorCode);
    setSigninLoading(false);
  });
  };


  return (
    <ScrollView style={styles.screen}>
      <BackArrow
        onPress={() => {
          navigation.pop();
        }}
      />
      <Text style={styles.title}>Log In to your Account</Text>
      <View
        style={[
          styles.inputWrapper,
          emailFocused && { borderWidth: 1, borderColor: CustomColors.dark1 },
          emailError.length > 1 ? {borderColor: CustomColors.error, borderWidth: 1} : {}
        ]}
      >
        <Icon
          name="mail"
          type="ionicon"
          color={emailFocused ? CustomColors.dark1 : CustomColors.greyScale500}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          onBlur={() => {
            handleInputBlurred("email");
          }}
          onFocus={handleEmailFocused}
          cursorColor={CustomColors.uberDark3}
          placeholder="Email"
          value={email}
          onChangeText={handleEmail}
        />
      </View>
      {emailError && <Text style={styles.helperText}>{emailError}</Text>}

      <View
        style={[
          styles.inputWrapper,
          passFocused && { borderWidth: 1, borderColor: CustomColors.dark1 },
          passError.length > 1 ? {borderColor: CustomColors.error, borderWidth: 1} : {}
        ]}
      >
        <Icon
          name="locked"
          type="fontisto"
          color={passFocused ? CustomColors.dark1 : CustomColors.greyScale500}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          onBlur={() => {
            handleInputBlurred("password");
          }}
          onFocus={handlePasswordFocused}
          cursorColor={CustomColors.uberDark3}
          placeholder="Password"
          secureTextEntry={passMasked}
          value={pass}
          onChangeText={handlePassword}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setPassMasked((prev) => !prev);
          }}
        >
          <Icon
            name={passMasked ? "eye" : "eye-off"}
            type="feather"
            color={passFocused ? CustomColors.dark1 : CustomColors.greyScale500}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
      </View>
      {passError && <Text style={styles.helperText}>{passError}</Text>}

      <CustomButton onPress={handleSignIn} loading={signinLoading} title="Sign in" />
      <View style={[styles.centerContainer, { marginTop: 0.04 * height, marginBottom: 0.03 * height }]}>
        <Divider style={{ width: 0.85 * width }} />
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
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: CustomColors.themeBackground,
  },
  title: {
    fontFamily: "mooli",
    fontSize: 48,
    marginHorizontal: 17,
    marginBottom: 0.02 * height,
    marginTop: 0.05 * height,
  },

  inputIcon: {
    marginHorizontal: 15,
  },

  inputWrapper: {
    width: 0.9 * width,
    marginHorizontal: 0.05 * width,
    height: 60,
    marginTop: 15,
    borderColor: CustomColors.dark2,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: CustomColors.greyScale200,
  },

  input: {
    // borderWidth: 1,
    display: "flex",
    flex: 1,
    fontSize: 15,
    fontFamily: "mooli",
  },

  helperText: {
    color: CustomColors.error,
    fontSize: 13,
    fontFamily: "nunitoMedium",
    marginLeft: 0.05 * width,
    marginTop: 5,
  },
  centerContainer: {
    alignItems: "center",
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

export default SignInScreen;
