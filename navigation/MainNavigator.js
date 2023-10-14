import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConditionsMenu from "../screens/home/ConditionsMenu";
import ChatScreen from "../screens/chats/ChatScreen";
import ChatsListScreen from "../screens/chats/ChatsListScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatsStack = createNativeStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      headerTitle: "",
    })}
    initialRouteName="ConditionsMenu"
  >
    <HomeStack.Screen name="ConditionsMenu" component={ConditionsMenu} />
    <HomeStack.Screen name="ChatScreen" component={ChatScreen} />
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
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsNavigator}
        options={{ tabBarLabel: "Chats" }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigator;
