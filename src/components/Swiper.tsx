import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import React, { ReactNode, useEffect, useState } from 'react';
import { ICON_LEFT, ICON_RIGHT } from '../assets';
import { MAX_DECK_COUNT } from '../constants';

type SwiperProps = {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
} & UseSwiperProps;

type UseSwiperProps = {
  maxItemIndex?: number;
  initialItemIndex: number;
  onCurrentItemIndexChange?: (currentItemIndex: number) => void;
};

const Swiper = ({
  children,
  initialItemIndex,
  maxItemIndex,
  onSwipeLeft,
  onSwipeRight,
  onCurrentItemIndexChange,
}: SwiperProps) => {
  const { isFirst, isLast, decrementItemIndex, incrementItemIndex } = useSwiper({
    initialItemIndex,
    maxItemIndex,
    onCurrentItemIndexChange,
  });
  const onSwipeLeftHandler = () => {
    decrementItemIndex();
    if (onSwipeLeft) onSwipeLeft();
  };
  const onSwipeRightHandler = () => {
    incrementItemIndex();
    if (onSwipeRight) onSwipeRight();
  };

  return (
    <View style={styles.swiperContainer}>
      <TouchableOpacity
        onPress={onSwipeLeftHandler}
        style={isFirst ? styles.buttonContainerInvisible : styles.buttonContainer}
      >
        <Image style={styles.buttonSwipe} source={ICON_LEFT} placeholder={'icon_left'} />
      </TouchableOpacity>
      <View style={styles.childrenContainer}>{children}</View>
      <TouchableOpacity
        onPress={onSwipeRightHandler}
        style={isLast ? styles.buttonContainerInvisible : styles.buttonContainer}
      >
        <Image style={styles.buttonSwipe} source={ICON_RIGHT} placeholder={'icon_right'} />
      </TouchableOpacity>
    </View>
  );
};

const isMinItemIndex = (value: number) => value === 0;
const isMaxItemIndex = (value: number) => value === MAX_DECK_COUNT - 1;

const useSwiper = ({
  initialItemIndex,
  maxItemIndex,
  onCurrentItemIndexChange,
}: UseSwiperProps) => {
  const [currentItemIndex, setItemIndex] = useState<number>(initialItemIndex);
  const [isFirst, setFirst] = useState<boolean>(isMinItemIndex(initialItemIndex));
  const [isLast, setLast] = useState<boolean>(
    maxItemIndex === initialItemIndex || isMaxItemIndex(initialItemIndex)
  );
  useEffect(() => {
    if (onCurrentItemIndexChange) onCurrentItemIndexChange(currentItemIndex);
  }, [currentItemIndex]);

  const decrementItemIndex = () => {
    if (isMinItemIndex(currentItemIndex)) return;
    if (isMinItemIndex(currentItemIndex - 1)) {
      setItemIndex(currentItemIndex - 1);
      setFirst(true);
      return;
    }
    setItemIndex(currentItemIndex - 1);
    setFirst(false);
    setLast(false);
  };
  const incrementItemIndex = () => {
    if (maxItemIndex === currentItemIndex || isMaxItemIndex(currentItemIndex)) return;
    if (maxItemIndex === currentItemIndex + 1 || isMaxItemIndex(currentItemIndex + 1)) {
      setItemIndex(currentItemIndex + 1);
      setLast(true);
      return;
    }
    setItemIndex(currentItemIndex + 1);
    setLast(false);
    setFirst(false);
  };
  return { isFirst, isLast, currentItemIndex, decrementItemIndex, incrementItemIndex };
};

const styles = StyleSheet.create({
  childrenContainer: {
    width: '70%',
  },
  swiperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSwipe: {
    aspectRatio: 1,
  },
  buttonContainer: {
    width: '15%',
  },
  buttonContainerInvisible: {
    width: '15%',
    opacity: 0,
  },
});

export default Swiper;
