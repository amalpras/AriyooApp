import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const API_BASE = process.env.API_BASE || 'http://localhost:3333';

export default function Home() {
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTags = async () => {
    const token = await SecureStore.getItemAsync('token');
    const res = await axios.get(`${API_BASE}/api/Tags/getAll`);
    setTags(res.data.map((t: any) => t.tagName));
  };

  useEffect(() => { loadTags(); }, []);

  const onChange = (text: string) => {
    setMessage(text);
    const hashIndex = text.lastIndexOf('#');
    if (hashIndex >= 0) {
      const q = text.slice(hashIndex + 1).split(' ')[0].toLowerCase();
      if (q.length) setSuggestions(tags.filter(t => t.toLowerCase().includes(q)).slice(0, 6));
      else setSuggestions([]);
    } else setSuggestions([]);
  };

  const selectTag = (t: string) => {
    const hashIndex = message.lastIndexOf('#');
    const before = message.slice(0, hashIndex);
    const after = message.slice(hashIndex).split(' ').slice(1).join(' ');
    setMessage(`${before}${after ? ' ' + after : ''}`.trim());
    if (!selectedTags.includes(t)) setSelectedTags([...selectedTags, t]);
    setSuggestions([]);
  };

  const ask = async () => {
    const token = await SecureStore.getItemAsync('token');
    const userRaw = await SecureStore.getItemAsync('user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    if (!user) return router.replace('/login');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/Message/postQuestion`, { seekerId: user.userId, message, tag: selectedTags.map(t => ({ tagName: t })) }, { headers: { Authorization: `Bearer ${token}` } });
      router.push({ pathname: '/chat', params: { sessionId: String(res.data.sessionId) } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>Ask a question</Text>
      <TextInput value={message} onChangeText={onChange} placeholder="Type your question... use #tag"
        mode="outlined" multiline style={{ marginBottom: 8 }} />
      {suggestions.length > 0 && (
        <FlatList data={suggestions} keyExtractor={(i) => i}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectTag(item)} style={{ paddingVertical: 8 }}>
              <Text>#{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 }}>
        {selectedTags.map(t => <Chip key={t} onClose={() => setSelectedTags(selectedTags.filter(x => x !== t))}>#{t}</Chip>)}
      </View>
      <Button mode="contained" onPress={ask} loading={loading} disabled={!message.trim()}>Ask</Button>
    </View>
  );
}