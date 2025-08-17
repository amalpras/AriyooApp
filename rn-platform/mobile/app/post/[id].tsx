import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="headlineSmall">Post {id}</Text>
      <Text>Detail coming soon...</Text>
    </View>
  );
}