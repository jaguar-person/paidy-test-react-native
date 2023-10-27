import 'react-native-get-random-values';
import { registerRootComponent } from 'expo';
import AppNavigator from './AppNavigator';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
}

registerRootComponent(App);
