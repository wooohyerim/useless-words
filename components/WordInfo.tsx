import { StyleSheet, Text, View } from 'react-native';

type InfoType = {
  language: string;
  korean: string;
  translation: string;
  pronunciation: string;
};

const WordInfo = ({
  language,
  korean,
  translation,
  pronunciation
}: InfoType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.language}>{language}</Text>

      <Text style={styles.korean}>"{korean}"</Text>

      <Text style={styles.translation}>{translation}</Text>

      <Text style={styles.pronunciation}>({pronunciation})</Text>
    </View>
  );
};

export default WordInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
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
  }
});
