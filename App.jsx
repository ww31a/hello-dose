import { View, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ flex: 1, backgroundColor: '#F2F2F7' }}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

export default App;
