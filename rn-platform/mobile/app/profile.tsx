import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Switch, Text, TextInput } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const API_BASE = process.env.API_BASE || 'http://localhost:3333';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState('');
  const [isSolver, setIsSolver] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('user').then(u => {
      if (u) {
        const ju = JSON.parse(u);
        setUser(ju); setUserName(ju.userName || ''); setIsSolver(!!ju.isSolver);
      }
    });
  }, []);

  const save = async () => {
    const token = await SecureStore.getItemAsync('token');
    await axios.put(`${API_BASE}/api/user`, { id: user.userId, userName, fullName: user.fullName, isSolver }, { headers: { Authorization: `Bearer ${token}` } });
    const updated = { ...user, userName, isSolver };
    await SecureStore.setItemAsync('user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="titleMedium" style={{ marginBottom: 12 }}>Profile</Text>
      <TextInput mode="outlined" label="Username" value={userName} onChangeText={setUserName} style={{ marginBottom: 12 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Text>Guru mode</Text>
        <Switch value={isSolver} onValueChange={setIsSolver} />
      </View>
      <Button mode="contained" onPress={save}>Save</Button>
    </View>
  );
}