import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

// App Screens
import { HomeScreen } from '../screens/HomeScreen';
import { WordListScreen } from '../screens/WordListScreen';
import { LearningScreen } from '../screens/LearningScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // App Stack
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 