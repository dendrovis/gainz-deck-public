import { Pressable, StyleSheet, PressableProps } from 'react-native';
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { primaryColor, secondaryColor } from '../../styles/common';

type ToggleType = {
  isEnabled?: boolean;
  isToggle: boolean;
  onPress?: (isToggle: boolean) => void;
} & PressableProps;

const Toggle = ({ isEnabled = true, onPress, isToggle = false }: ToggleType) => {
  const [isToggled, setToggle] = useState(isToggle);
  const initialXOffset = useSharedValue(33);
  const easeInOut = (deviation: number) => {
    'worklet';
    return withTiming(initialXOffset.value + deviation, { duration: 300 });
  };

  const animatedButtonStyles = useAnimatedStyle(() => ({
    backgroundColor: isToggled
      ? withTiming(primaryColor, { duration: 300 })
      : withTiming(secondaryColor, { duration: 300 }),
    transform: [
      {
        translateX: isToggled ? easeInOut(0) : easeInOut(-30),
      },
      { translateY: 3 },
    ],
  }));

  const animatedContainerStyles = useAnimatedStyle(() => ({
    backgroundColor: isToggled
      ? withTiming(secondaryColor, { duration: 300 })
      : withTiming(primaryColor, { duration: 300 }),
  }));

  const onPressHandler = () => {
    setToggle(!isToggled);
    if (onPress) onPress(isToggled);
  };

  return (
    <Pressable onPress={isEnabled ? onPressHandler : undefined}>
      <Animated.View style={[styles.container, animatedContainerStyles]}>
        <Animated.View style={[styles.button, animatedButtonStyles]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: secondaryColor,
    borderRadius: 30,
    width: 60,
    height: 30,
  },
  button: {
    borderRadius: 50,
    width: 20,
    aspectRatio: 1,
  },
});

export default Toggle;
