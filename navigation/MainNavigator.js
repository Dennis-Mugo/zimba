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
import Profile from "../screens/auth/Profile";

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatsStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

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
    <ChatsStack.Screen name="ChatsList" component={ChatsListScreen} />
    <ChatsStack.Screen name="Chat" component={ChatScreen} />
  </ChatsStack.Navigator>
);

const UserNavigator = () => (
  <UserStack.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      headerTitle: "",
    })}
    initialRouteName="ConditionsMenu"
  >
    <UserStack.Screen name="profile" component={Profile} />
  </UserStack.Navigator>
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
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon type="ionicon" name={focused ? "person" : "person-outline"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigator;
