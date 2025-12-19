import { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';

import Toast from 'react-native-toast-message';

import wordsData from '@/assets/data/words.json';
import EmojiDisplay from '@/components/EmojiDisplay';
import NextButton from '@/components/NextButton';
import WordInfo from '@/components/WordInfo';
import { languageMap } from '@/constants/languageMap';
import { SafeAreaView } from 'react-native-safe-area-context';

import Tts from 'react-native-tts';

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
  const [ttsReady, setTtsReady] = useState(false);

  useEffect(() => {
    const initializeTts = async () => {
      if (Platform.OS === 'web') {
        Toast.show({
          type: 'error',
          text1: '웹 환경에서는 음성 듣기를 사용할 수 없습니다',
          text2: '웹 환경에서는 음성 듣기를 사용할 수 없습니다',
          position: 'bottom',
          bottomOffset: 100
        });

        return;
      }

      try {
        // TTS 초기화
        await Tts.getInitStatus();

        // 기본 설정
        Tts.setDefaultLanguage('ko-KR'); // 또는 필요한 언어
        Tts.setDefaultVoice('ko-KR-standard');
        Tts.setDefaultRate(0.5); // 말하기 속도
        Tts.setDefaultPitch(1.0); // 음높이

        setTtsReady(true);
        console.log('TTS 초기화 성공');
      } catch (error) {
        console.error('TTS 초기화 실패:', error);
        setTtsReady(false);
      }
    };

    initializeTts();
    setWords(wordsData);
    setLoading(false);

    // 클린업
    return () => {
      if (Platform.OS !== 'web' && Tts) {
        Tts.stop();
      }
    };
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

  const handleSpeakWord = async () => {
    if (Platform.OS === 'web') {
      Toast.show({
        type: 'error',
        text1: '웹 환경에서는 발음 듣기를 사용할 수 없습니다',
        text2: '웹 환경에서는 발음 듣기를 사용할 수 없습니다',
        position: 'bottom',
        bottomOffset: 100
      });

      return;
    }

    if (!word) return;

    // 모바일 환경
    if (!ttsReady || !Tts) {
      Toast.show({
        type: 'info',
        text1: 'TTS 준비 중',
        text2: '잠시 후 다시 시도해주세요',
        position: 'bottom'
      });
      return;
    }

    try {
      const detectedLang = Object.keys(languageMap).find((lang) =>
        word.language.includes(lang)
      );

      if (!detectedLang) {
        Toast.show({
          type: 'info',
          text1: '음성 미지원',
          text2: `${word.language}는 음성이 지원되지 않습니다\n발음: ${word.pronunciation}`,
          position: 'bottom',
          visibilityTime: 3000
        });
        return;
      }

      Tts.setDefaultLanguage(languageMap[detectedLang]);
      await Tts.speak(word.translation);
    } catch (error) {
      console.error('TTS 재생 실패:', error);
      Toast.show({
        type: 'error',
        text1: '재생 실패',
        text2: '음성을 재생할 수 없습니다',
        position: 'bottom'
      });
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>쓸데없는 외국어 학습</Text>
        </View>

        <View style={styles.content}>
          <EmojiDisplay emoji={word.emoji} />
          <WordInfo
            language={word.language}
            korean={word.korean}
            translation={word.translation}
            pronunciation={word.pronunciation}
          />
          <NextButton onPress={handleSpeakWord} text={'발음 듣기'} />
          <NextButton onPress={nextWord} text={'다음 단어'} />
        </View>
      </SafeAreaView>

      <Toast />
    </>
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
  }
});
