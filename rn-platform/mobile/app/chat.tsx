import { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, FlatList, TextInput as RNTextInput } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import io from 'socket.io-client';

const API_BASE = process.env.API_BASE || 'http://localhost:3333';

export default function Chat() {
  const { sessionId } = useLocalSearchParams<{ sessionId?: string }>();
  const [sid, setSid] = useState<number>(Number(sessionId) || 0);
  const [sessions, setSessions] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const socketRef = useRef<any>(null);

  const loadSessions = async () => {
    const token = await SecureStore.getItemAsync('token');
    const userRaw = await SecureStore.getItemAsync('user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    const headers = { Authorization: `Bearer ${token}` };
    const mode = user?.isSolver ? 'solver' : 'seeker';
    const url = mode === 'seeker' ? `${API_BASE}/api/Message/getallsessionsseeker/${user.userId}` : `${API_BASE}/api/Message/getallsessionssolver/${user.userId}`;
    const res = await axios.get(url, { headers });
    setSessions(res.data);
    if (!sid && res.data.length) setSid(res.data[0].sessionId);
  };

  const loadMessages = async (session: number) => {
    const token = await SecureStore.getItemAsync('token');
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.get(`${API_BASE}/api/Message/getMessagesBySessionId/${session}`, { headers });
    setMessages(res.data);
  };

  useEffect(() => { loadSessions(); }, []);
  useEffect(() => { if (sid) { loadMessages(sid); socketRef.current?.emit('join', String(sid)); } }, [sid]);
  useEffect(() => { socketRef.current = io(API_BASE); return () => socketRef.current?.disconnect(); }, []);
  useEffect(() => { socketRef.current?.on('message', (m: any) => { if (Number(m.sessionId) === Number(sid)) setMessages(prev => [...prev, m]); }); }, [sid]);

  const send = async () => {
    const token = await SecureStore.getItemAsync('token');
    const userRaw = await SecureStore.getItemAsync('user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    const headers = { Authorization: `Bearer ${token}` };
    await axios.post(`${API_BASE}/api/Message/postMessage`, { senderId: user.userId, messageText: text, sessionId: sid }, { headers });
    setText('');
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ width: 220, borderRightWidth: 1, borderColor: '#e5e7eb' }}>
        <FlatList data={sessions} keyExtractor={(i) => String(i.sessionId)} renderItem={({ item }) => (
          <Button onPress={() => setSid(item.sessionId)} mode={sid === item.sessionId ? 'contained' : 'text'}>{item.title}</Button>
        )} />
      </View>
      <View style={{ flex: 1, padding: 12 }}>
        <FlatList style={{ flex: 1 }} data={messages} keyExtractor={(i, idx) => String(i.id || idx)} renderItem={({ item }) => (
          <View style={{ alignItems: 'flex-start', marginBottom: 8 }}>
            {item.messageText ? <Text>{item.messageText}</Text> : null}
            {item.imageUrl ? <Text>Image: {item.imageUrl}</Text> : null}
            <Text style={{ color: '#6b7280', fontSize: 12 }}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
          </View>
        )} />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <RNTextInput style={{ flex: 1, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, paddingHorizontal: 8 }} value={text} onChangeText={setText} onSubmitEditing={send} />
          <Button mode="contained" onPress={send} disabled={!text.trim()}>Send</Button>
        </View>
      </View>
    </View>
  );
}