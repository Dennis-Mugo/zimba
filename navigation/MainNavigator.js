import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ChatScreen from "../screens/chats/ChatScreen";
import ChatsListScreen from "../screens/chats/ChatsListScreen";
import { Icon } from "@rneui/themed";
import CustomColors from "../constants/colors";
import DashScreen from "../screens/home/DashScreen";
import InfoForm from "../screens/home/InfoForm";

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatsStack = createNativeStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      headerTitle: "",
    })}
    initialRouteName="dash"
  >
    <HomeStack.Screen name="dash" component={DashScreen} />
    <HomeStack.Screen name="info" component={InfoForm} />
  </HomeStack.Navigator>
);

const ChatsNavigator = () => (
  <ChatsStack.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      headerTitle: "",
    })}
    initialRouteName="ConditionsMenu"
  >
    <HomeStack.Screen name="ChatsList" component={ChatsListScreen} />
    <HomeStack.Screen name="Chat" component={ChatScreen} />
  </ChatsStack.Navigator>
);

function MainNavigator() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#f1f1f1" }}
      // barStyle={{ backgroundColor: "#c2e7ff" }}

      activeColor="#1f1f1f"
      inactiveColor="#1f1f1f"
      shifting={true}
      tabBarColor="#c2e7ff"
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#c2e7ff",
          tabBarIcon: ({ focused, color }) => (
            <Icon type="ionicon" name={focused ? "home" : "home-outline"} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsNavigator}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ focused }) => (
            <Icon
              type="ionicon"
              name={focused ? "chatbox" : "chatbox-outline"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigator;
