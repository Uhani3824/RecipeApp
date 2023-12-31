import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./src/components/RegisterScreen";
import LoginScreen from "./src/components/LoginScreen";
import OnboardingScreen from "./src/components/OnboardingScreen";
import DashboardScreen from "./src/components/DashboardScreen";
import UserProfileScreen from "./src/components/UserProfileScreen";
import RecipeListScreen from "./src/components/RecipeListScreen";
import RecipeDetailsScreen from "./src/components/RecipeDetailsScreen";
import { LogBox } from "react-native";

const Stack = createStackNavigator();

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen">
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeList"
          component={RecipeListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
