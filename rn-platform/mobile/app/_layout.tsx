import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <PaperProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Ariyoo' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="chat" options={{ title: 'Chat' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="posts" options={{ title: 'Posts' }} />
        <Stack.Screen name="post/[id]" options={{ title: 'Post' }} />
      </Stack>
    </PaperProvider>
  );
}