import { Pressable, Text } from 'react-native';

type PropsType = {
  onPress: () => void;
};

const NextButton = ({ onPress }: PropsType) => {
  return (
    <Pressable
      onPress={onPress}
      className="px-12 py-4 mt-16 bg-purple-600 rounded-lg active:opacity-80"
    >
      <Text className="text-lg font-semibold text-white">다음 단어</Text>
    </Pressable>
  );
};

export default NextButton;
