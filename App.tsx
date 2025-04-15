import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import { WordListScreen } from './src/screens/WordListScreen';
import { LearningScreen } from './src/screens/LearningScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { AuthProvider } from './src/context/AuthContext';
import theme from './src/styles/theme';

// Define the navigator parameters
type RootStackParamList = {
  Home: undefined;
  WordList: undefined;
  Learning: undefined;
  Quiz: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: '#4CAF50',
              background: '#0F172A',
              card: '#1E293B',
              text: '#FFFFFF',
              border: '#334155',
              notification: '#FF9800',
            },
            fonts: {
              regular: {
                fontFamily: 'System',
                fontWeight: 'normal',
              },
              medium: {
                fontFamily: 'System',
                fontWeight: '500',
              },
              bold: {
                fontFamily: 'System',
                fontWeight: '700',
              },
              heavy: {
                fontFamily: 'System',
                fontWeight: '800',
              },
            },
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <Stack.Navigator 
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#1E293B',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                  color: '#FFFFFF',
                },
                cardStyle: { backgroundColor: '#0F172A' }
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'WordPecker' }}
              />
              <Stack.Screen
                name="WordList"
                component={WordListScreen}
                options={{ title: 'Kelime Listeleri' }}
              />
              <Stack.Screen
                name="Learning"
                component={LearningScreen}
                options={{ title: 'Öğrenme Modu' }}
              />
              <Stack.Screen
                name="Quiz"
                component={QuizScreen}
                options={{ title: 'Sınav Modu' }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profil' }}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});

export default App;
