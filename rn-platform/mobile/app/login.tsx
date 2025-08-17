import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const API_BASE = process.env.API_BASE || 'http://localhost:3333';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      await SecureStore.setItemAsync('token', res.data.token);
      await SecureStore.setItemAsync('user', JSON.stringify(res.data));
      router.replace('/home');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>Login</Text>
      <TextInput mode="outlined" label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{ marginBottom: 12 }} />
      <TextInput mode="outlined" label="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 12 }} />
      {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
      <Button mode="contained" onPress={submit} loading={loading}>Continue</Button>
    </View>
  );
}