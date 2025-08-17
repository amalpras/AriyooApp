import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const API_BASE = process.env.API_BASE || 'http://localhost:3333';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flname, setFlname] = useState('');
  const [isSeeker, setIsSeeker] = useState(true);
  const [isSolver, setIsSolver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${API_BASE}/auth/register`, { email, password, flname, isSeeker, isSolver });
      await SecureStore.setItemAsync('token', res.data.token);
      await SecureStore.setItemAsync('user', JSON.stringify(res.data));
      router.replace('/home');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>Register</Text>
      <TextInput mode="outlined" label="Full name" value={flname} onChangeText={setFlname} style={{ marginBottom: 12 }} />
      <TextInput mode="outlined" label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{ marginBottom: 12 }} />
      <TextInput mode="outlined" label="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 12 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Checkbox status={isSeeker ? 'checked' : 'unchecked'} onPress={() => setIsSeeker(!isSeeker)} />
        <Text>Seeker</Text>
        <Checkbox status={isSolver ? 'checked' : 'unchecked'} onPress={() => setIsSolver(!isSolver)} />
        <Text>Solver</Text>
      </View>
      {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
      <Button mode="contained" onPress={submit} loading={loading}>Continue</Button>
    </View>
  );
}