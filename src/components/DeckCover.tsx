import {
  View,
  TextInput,
  StyleSheet,
  Text,
  type ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { primaryColor, primaryColorLight, secondaryColor } from '../styles/common';
import { ICON_DECK } from '../assets';
import Animated, {
  AnimatedStyle,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';

type DeckCoverProps = {
  isAnimatedLeft?: boolean;
  isEditable?: boolean;
  imageRepresentative: string;
  imageRepresentativeAlt: string;
  deckName: string;
  isAnimated?: boolean;
  customStyles?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  onChange?: (text: string) => void;
} & ViewProps;

const DeckCover = ({
  id = '0',
  isAnimatedLeft = true,
  isAnimated = true,
  isEditable = false,
  imageRepresentative,
  imageRepresentativeAlt,
  deckName,
  onLayout,
  onChange,
  customStyles,
}: DeckCoverProps) => {
  const animationHandler = (isEntering: boolean) => {
    if (!isAnimated) return;
    if (isEntering) {
      if (isAnimatedLeft) return SlideInLeft;
      return SlideInRight;
    } else if (isAnimatedLeft) return SlideOutRight;
    return SlideOutLeft;
  };

  return (
    <Animated.View
      style={[styles.deckCoverContainer, customStyles ?? {}]}
      key={id}
      entering={animationHandler(true)}
      exiting={animationHandler(false)}
      onLayout={onLayout}
    >
      <Image style={styles.deckCover} source={ICON_DECK} placeholder={'icon_deck'} />
      <Image
        style={styles.deckImageRepresentation}
        source={imageRepresentative}
        placeholder={imageRepresentativeAlt}
      />
      <Text style={styles.id}>{id}</Text>
      <View style={styles.editDeckCoverNameContainer}>
        <TextInput
          style={styles.editDeckCoverName}
          onChangeText={onChange}
          placeholder="please enter task name"
          placeholderTextColor={primaryColorLight}
          keyboardType="default"
          value={deckName}
          maxLength={25}
          readOnly={!isEditable}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  id: {
    color: primaryColor,
    position: 'absolute',
    top: '4.5%',
  },
  deckImageRepresentation: {
    position: 'absolute',
    width: '50%',
    aspectRatio: 102 / 105,
  },
  editDeckCoverName: {
    backgroundColor: secondaryColor,
    borderColor: primaryColor,
    borderWidth: 0.75,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 100,
    color: primaryColor,
  },
  editDeckCoverNameContainer: {
    position: 'absolute',
    bottom: '4.5%',
  },
  deckCover: {
    width: '100%',
    aspectRatio: 252 / 437,
  },
  deckCoverContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 5,
  },
});

export default DeckCover;
