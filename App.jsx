import { View, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { QueryProvider } from './src/api/QueryProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <QueryProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{ flex: 1, backgroundColor: '#F2F2F7' }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </View>
      </QueryProvider>
    </SafeAreaProvider>
  );
}

export default App;
