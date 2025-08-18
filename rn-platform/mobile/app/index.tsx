import { Link, router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  useEffect(() => {
    SecureStore.getItemAsync('token').then(t => {
      if (t) router.replace('/home');
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>Ariyoo</Text>
      <Link href="/login" asChild>
        <Button mode="contained" style={{ marginBottom: 8 }}>Login</Button>
      </Link>
      <Link href="/register" asChild>
        <Button mode="outlined">Register</Button>
      </Link>
    </View>
  );
}