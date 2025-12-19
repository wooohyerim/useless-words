import { StyleSheet, Text } from 'react-native';

type EmojiType = {
  emoji: string;
};

const EmojiDisplay = ({ emoji }: EmojiType) => {
  return <Text style={styles.emoji}>{emoji}</Text>;
};

export default EmojiDisplay;

const styles = StyleSheet.create({
  emoji: {
    fontSize: 80,
    marginBottom: 40
  }
});
