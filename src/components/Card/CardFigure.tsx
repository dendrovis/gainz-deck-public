import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { useAnimatedProps, withTiming, type SharedValue } from 'react-native-reanimated';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import Svg, { Circle } from 'react-native-svg';
import { primaryColor, secondaryColor } from '../../styles/common';
import { Image } from 'expo-image';
import {
  ICON_ACTIVE,
  ICON_ACTIVE_DARK,
  ICON_CLUB,
  ICON_CLUB_DARK,
  ICON_TIME,
  ICON_TIME_DARK,
} from '../../assets';

const PI = 3.142;

type CardFigure = {
  image: string;
  roundCount: SharedValue<number>;
  totalRoundCount: number;
  totalTimeRemain: SharedValue<number>;
  totalTime: number;
  isDark?: boolean;
  isEditable?: boolean;
  onTypeChange?: (type: 'break' | 'active') => void;
  onImageChange?: (source: string) => void;
};

const CardFigure = ({
  image,
  roundCount,
  totalRoundCount,
  totalTime,
  totalTimeRemain,
  isEditable = false,
  isDark = false,
  onTypeChange,
  onImageChange,
}: CardFigure) => {
  const [image_, setImage] = useState<string | null>(isEditable ? null : image);

  const onSelectImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageURI = result.assets[0].uri;
      setImage(imageURI);
      if (onImageChange) onImageChange(imageURI);
    }
  };

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const circleWidth = 106;
  const strokeWidth = 7;
  const circleRadius = circleWidth / 2;
  const circumferenceOfCircle = 2 * PI * circleRadius;

  const animatedRoundCountProps = useAnimatedProps(() => {
    const newValue = withTiming((roundCount.value / totalRoundCount) * circumferenceOfCircle, {
      duration: 300,
    });
    return {
      strokeDasharray: [newValue, circumferenceOfCircle],
    };
  });

  const animatedTotalTimeRemainProps = useAnimatedProps(() => {
    const newValue = withTiming((totalTimeRemain.value / totalTime) * circumferenceOfCircle, {
      duration: 300,
    });
    return {
      strokeDasharray: [newValue, circumferenceOfCircle],
    };
  });

  return (
    <View style={styles.clubContainer}>
      {isDark ? (
        <Image style={styles.club} source={ICON_CLUB_DARK} alt={'icon_club_dark'} />
      ) : (
        <Image style={styles.club} source={ICON_CLUB} alt={'icon_club'} />
      )}
      <Pressable
        onPress={isEditable ? onSelectImage : undefined}
        style={styles.figureImageContainer}
      >
        {image_ && <Image style={styles.figureImage} source={image_} alt={'icon_user_image'} />}
      </Pressable>
      <Pressable
        onPress={
          isEditable
            ? () => {
                if (onTypeChange) onTypeChange('active');
              }
            : undefined
        }
        style={styles.activeContainer}
      >
        {isDark ? (
          <Image style={styles.active} source={ICON_ACTIVE} alt={'icon_active'} />
        ) : (
          <Image style={styles.active} source={ICON_ACTIVE_DARK} alt={'icon_active_dark'} />
        )}
      </Pressable>
      <Pressable
        onPress={
          isEditable
            ? () => {
                if (onTypeChange) onTypeChange('break');
              }
            : undefined
        }
        style={styles.timeContainer}
      >
        {isDark ? (
          <Image style={styles.time} source={ICON_TIME} alt={'icon_time'} />
        ) : (
          <Image style={styles.time} source={ICON_TIME_DARK} alt={'icon_time_dark'} />
        )}
      </Pressable>
      {!isEditable && (
        <>
          <View style={styles.circularBarContainerLeft}>
            <Svg
              width={circleWidth + strokeWidth}
              height={circleWidth + strokeWidth}
              transform={[{ rotate: '-90deg' }]}
            >
              <AnimatedCircle
                r={circleRadius}
                cx={(circleWidth + strokeWidth) / 2}
                cy={(circleWidth + strokeWidth) / 2}
                fill={isDark ? primaryColor : secondaryColor}
                stroke={isDark ? secondaryColor : primaryColor}
                strokeWidth={strokeWidth}
                strokeDasharray={[0, circumferenceOfCircle]}
                strokeLinecap={'round'}
                animatedProps={animatedRoundCountProps}
              />
            </Svg>
          </View>
          <View style={styles.circularBarContainerRight}>
            <Svg
              width={circleWidth + strokeWidth}
              height={circleWidth + strokeWidth}
              transform={[{ rotate: '-90deg' }]}
            >
              <AnimatedCircle
                r={circleRadius}
                cx={(circleWidth + strokeWidth) / 2}
                cy={(circleWidth + strokeWidth) / 2}
                fill={isDark ? primaryColor : secondaryColor}
                stroke={isDark ? secondaryColor : primaryColor}
                strokeWidth={strokeWidth}
                strokeDasharray={[0, circumferenceOfCircle]}
                strokeLinecap={'round'}
                animatedProps={animatedTotalTimeRemainProps}
              />
            </Svg>
          </View>
        </>
      )}
    </View>
  );
};

export default CardFigure;

const styles = StyleSheet.create({
  figureImageContainer: {
    width: '30%',
    position: 'absolute',
    top: '5%',
    left: '25%',
    aspectRatio: 1,
    borderRadius: 1000,
  },
  figureImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 1000,
  },
  circularBarContainerLeft: {
    position: 'absolute',
    width: '38%',
    aspectRatio: 1,
    borderRadius: 1000,
    top: '35%',
    left: 0,
    zIndex: 0,
  },
  circularBarContainerRight: {
    position: 'absolute',
    width: '38%',
    aspectRatio: 1,
    borderRadius: 1000,
    top: '35%',
    right: 0,
    zIndex: 0,
  },
  timeContainer: {
    position: 'absolute',
    width: '30%',
    borderRadius: 1000,
    padding: 20,
    top: '40%',
    right: '4%',
    zIndex: 1,
  },
  time: {
    width: '100%',
    aspectRatio: 1,
  },
  activeContainer: {
    position: 'absolute',
    width: '30%',
    borderRadius: 1000,
    padding: 15,
    top: '40%',
    left: '4%',
    zIndex: 1,
  },
  active: {
    width: '100%',
    padding: 15,
    aspectRatio: 1,
  },
  clubContainer: {
    position: 'relative',
    marginBottom: -2,
  },
  club: {
    width: '80%',
    aspectRatio: 221 / 224,
  },
});
