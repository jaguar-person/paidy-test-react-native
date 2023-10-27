import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthenticationScreen } from "./screens/AuthenticationScreen";
import { TodoListScreen } from "./screens/TodoListScreen";
import { RootStackParamList, Route } from "./models";

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#dddddd" },
      }}
    >
      <Stack.Navigator initialRouteName={Route.Authentication}>
        <Stack.Screen
          name={Route.Authentication}
          component={AuthenticationScreen}
        />
        <Stack.Screen
          name={Route.TodoList}
          component={TodoListScreen}
          options={{ headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
