import { Text } from 'react-native';

type EmojiType = {
  emoji: string;
};

const EmojiDisplay = ({ emoji }: EmojiType) => {
  return <Text>{emoji}</Text>;
};

export default EmojiDisplay;
