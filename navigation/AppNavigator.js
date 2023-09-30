import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <AppStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerShadowVisible: false,
        title: "",
      })}
    >
      <AppStack.Screen name="AuthNavigator" component={AuthNavigator} />
      <AppStack.Screen name="MainNavigator" component={MainNavigator} />
    </AppStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
