import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from 'react';

export const useAuthHandlers = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  const checkEnrolledLevel = async () => {
    const level = await LocalAuthentication.getEnrolledLevelAsync();

    // If the level is greater than 0, it means the user has already set up a passcode
    // isEnrolled state will be set to true if passcode is set up
    setIsEnrolled(level > 0);
  };

  const tryAuthenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Please authenticate to continue'
      });

      return result.success;
    } catch (error) {
      console.error('Authentication error', error);

      return false;
    }
  };

  return {
    isEnrolled,
    checkEnrolledLevel,
    tryAuthenticate
  };
};
