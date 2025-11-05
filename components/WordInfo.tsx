import { Text, View } from 'react-native';

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
    <View className="items-center">
      <Text className="text-lg text-gray-500">{language}</Text>

      <Text className="mt-2 text-2xl font-bold">"{korean}"</Text>

      <Text className="mt-8 text-3xl font-bold text-purple-600">
        {translation}
      </Text>

      <Text className="mt-2 text-lg text-gray-500">({pronunciation})</Text>
    </View>
  );
};

export default WordInfo;
