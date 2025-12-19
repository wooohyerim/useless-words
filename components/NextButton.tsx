import { Pressable, StyleSheet, Text } from 'react-native';

type PropsType = {
  onPress: () => void;
  text: string;
};

const NextButton = ({ onPress, text }: PropsType) => {
  return (
    <Pressable onPress={onPress} style={style.button}>
      <Text style={style.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default NextButton;

const style = StyleSheet.create({
  button: {
    backgroundColor: '#9333ea',
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});
