import { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import wordsData from '@/assets/data/words.json';

type Word = {
  emoji: string;
  language: string;
  korean: string;
  translation: string;
  pronunciation: string;
};

export default function HomeScreen() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWords(wordsData);
    setLoading(false);
  }, []);

  const nextWord = () => {
    if (words.length === 0) return;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * words.length);
    } while (newIndex === currentIndex && words.length > 1);

    setCurrentIndex(newIndex);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>단어를 불러오는 중...</Text>
      </View>
    );
  }

  if (words.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>단어를 불러올 수 없습니다</Text>
      </View>
    );
  }

  const word = words[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>쓸데없는 외국어 학습</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.emoji}>{word.emoji}</Text>
        <Text style={styles.language}>{word.language}</Text>
        <Text style={styles.korean}>"{word.korean}"</Text>
        <Text style={styles.translation}>{word.translation}</Text>
        <Text style={styles.pronunciation}>({word.pronunciation})</Text>

        <Pressable style={styles.button} onPress={nextWord}>
          <Text style={styles.buttonText}>다음 단어</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  emoji: {
    fontSize: 80,
    marginBottom: 40
  },
  language: {
    fontSize: 18,
    color: '#6b7280'
  },
  korean: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8
  },
  translation: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9333ea',
    marginTop: 32
  },
  pronunciation: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 8
  },
  button: {
    backgroundColor: '#9333ea',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 64
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});
