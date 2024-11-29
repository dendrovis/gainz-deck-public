import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import React, { cloneElement, ReactElement } from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type PanelProps = {
  id: number;
  children: ReactElement;
  isExpanded: SharedValue<number>;
  duration?: number;
  isUsingChildrenLayout?: boolean;
};

const Panel = ({
  id,
  children,
  isExpanded,
  duration = 300,
  isUsingChildrenLayout = false,
}: PanelProps) => {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() => {
    const derivedValue = height.value * Number(isExpanded.value === id);
    return withTiming(derivedValue, {
      duration,
    });
  });

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    height.value = event.nativeEvent.layout.height;
  };

  return (
    <Animated.View style={[styles.container, bodyStyle]}>
      {isUsingChildrenLayout ? (
        <View style={styles.wrapper}>{cloneElement(children, { onLayout })}</View>
      ) : (
        <View style={styles.wrapper} onLayout={onLayout}>
          {children}
        </View>
      )}
    </Animated.View>
  );
};

export default Panel;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
