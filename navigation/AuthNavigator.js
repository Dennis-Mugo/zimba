import React from "react";
import LoadingScreen from "../screens/auth/LoadingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LetInScreen from "../screens/auth/LetInScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerShadowVisible: false,
        title: "",
      })}
      initialRouteName="authLoading"
    >
      <AuthStack.Screen name="authLoading" component={LoadingScreen} />
      <AuthStack.Screen name="letIn" component={LetInScreen} />
      <AuthStack.Screen name="signIn" component={SignInScreen} />
      <AuthStack.Screen name="signUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
