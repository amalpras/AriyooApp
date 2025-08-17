import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';

const DATA = [
  { id: 1, title: 'How do I get started as a data analyst?', excerpt: 'Looking for a roadmap and resources...', tags: ['data', 'career'], createdAt: new Date() },
  { id: 2, title: 'Best cafes to work in Bangalore?', excerpt: 'Quiet work-friendly cafes', tags: ['bangalore', 'work', 'cafes'], createdAt: new Date() },
];

export default function Posts() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList data={DATA} keyExtractor={(i) => String(i.id)} renderItem={({ item }) => (
        <Link href={{ pathname: '/post/[id]', params: { id: String(item.id) } }} asChild>
          <TouchableOpacity style={{ paddingVertical: 12 }}>
            <Text variant="titleMedium">{item.title}</Text>
            <Text>{item.excerpt}</Text>
          </TouchableOpacity>
        </Link>
      )} />
    </View>
  );
}