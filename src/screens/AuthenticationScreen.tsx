import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  AppState,
  AppStateStatus,
  Button,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList, Route } from "../models";
import { useAuthHandlers } from "../hooks/useAuthHandlers";

const IOS_SETTINGS_URL = "App-Prefs:PASSCODE";
const ANDROID_SETTINGS_INTENT = "android.settings.SECURITY_SETTINGS";

type Props = StackScreenProps<RootStackParamList, Route.Authentication>;

export const AuthenticationScreen: React.FC<Props> = ({ navigation }) => {
  const { isEnrolled, checkEnrolledLevel, tryAuthenticate } = useAuthHandlers();
  const message = isEnrolled
    ? "Authenticate Now!"
    : "You need to setup password first.";
  const buttonText = isEnrolled ? "Authenticate" : "Go to Settings";

  useEffect(() => {
    checkEnrolledLevel();

    // We need to check the enrolled level when the app is resumed
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
          checkEnrolledLevel();
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const openSettings = async () => {
    try {
      if (Platform.OS === "ios") {
        await Linking.openURL(IOS_SETTINGS_URL);
        return;
      }

      await Linking.sendIntent(ANDROID_SETTINGS_INTENT);
    } catch (error) {
      console.error("Failed to open passcode settings", error);

      // If we can't open the passcode settings page, we will just navigate to the app settings page as a fallback
      Linking.openSettings();
    }
  };

  const handleAuthentication = async () => {
    const isAuthenticationSuccess = await tryAuthenticate();

    if (isAuthenticationSuccess) {
      navigation.navigate(Route.TodoList);
    }
  };

  const handlePress = () => {
    if (isEnrolled) {
      handleAuthentication();
      return;
    }

    openSettings();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 24,
    color: "red",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
  },
});
