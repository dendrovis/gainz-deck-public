import { View, Text, StyleSheet, Pressable, PressableProps } from 'react-native';
import React from 'react';
import { primaryColor, secondaryColor } from '../../styles/common';
import { CARD_HEIGHT, REPEAT_UNIT, TIME_UNIT } from '../../constants';
import useCardSlice from './useCardSlice';
import CardSliceImage from './CardSliceImage';

type CardSliceProps = {
  index: number;
  type: CardSliceType;
  duration: number;
  repeat: string;
  name: string;
  isSelected?: boolean;
} & PressableProps;

export type CardSliceType = 'active' | 'break';

const CardSlice = ({
  index,
  onPress,
  onLongPress,
  type,
  duration,
  repeat = '00',
  name,
  isSelected = false,
}: CardSliceProps) => {
  const { indexWithPadding, viewBackgroundColor, textColor } = useCardSlice({
    type,
    index,
    isSelected,
  });

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <View style={[styles.container, ...viewBackgroundColor]}>
        <Text style={[(styles.text, textColor)]}>{indexWithPadding}</Text>
        <CardSliceImage type={type} isSelected={isSelected} />
        <Text style={[(styles.text, textColor)]}>
          {duration}
          {TIME_UNIT}
        </Text>
        <Text style={[(styles.text, textColor)]}>
          {repeat}
          {REPEAT_UNIT}
        </Text>
        <Text style={[(styles.text, textColor)]}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    backgroundColor: secondaryColor,
    justifyContent: 'space-between',
    borderColor: primaryColor,
    borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    zIndex: 1000,
  },
  text: {
    color: primaryColor,
  },
});

export default CardSlice;
