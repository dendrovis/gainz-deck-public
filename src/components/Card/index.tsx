import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { primaryColor, secondaryColor } from '../../styles/common';
import { SharedValue } from 'react-native-reanimated';
import CardPip from './CardPip';
import CardTimer from './CardTimer';
import CardTask from './CardTask';
import CardFigure from './CardFigure';

type CardProps = {
  index: number;
  type: 'break' | 'active';
  image: string;
  taskName: string;
  roundCount: SharedValue<number>;
  totalRoundCount: number;
  totalTimeRemain: SharedValue<number>;
  totalTime: number;
  duration: number;
  repeatCount?: number;
  isEditable?: boolean;
  onChange?: (args: {
    taskImage?: string; //path to image
    type?: 'active' | 'break';
    taskName?: string;
    taskDuration?: number; //in seconds
    taskInfo?: number | string;
  }) => void;
};

const Card = ({
  index,
  type,
  image,
  taskName,
  roundCount,
  totalRoundCount,
  totalTimeRemain,
  totalTime,
  duration,
  repeatCount,
  isEditable = false,
}: CardProps) => {
  const [isBreak, setBreak] = useState(type === 'break');
  const pipType = isBreak ? 'break' : 'active';
  const StyleContainer = isBreak ? [styles.container, styles.containerDark] : styles.container;
  //use zustand for manage data states controls

  return (
    <View style={StyleContainer}>
      <CardPip type={pipType} index={index} />
      <CardPip type={pipType} index={index} isFlip />
      <CardFigure
        image={image}
        roundCount={roundCount}
        totalRoundCount={totalRoundCount}
        totalTime={totalTime}
        totalTimeRemain={totalTimeRemain}
        isDark={isBreak}
        onTypeChange={(type) => {
          setBreak(type === 'break');
        }}
        isEditable={isEditable}
      />
      <CardTask taskName={taskName} isDark={isBreak} isEditable={isEditable} />
      <View style={styles.diamondGroup}>
        <CardTimer
          digits={duration}
          digitsCount={3}
          isDark={isBreak}
          isEditable={isEditable}
          isPlay={false}
          isPlayable={true}
        />
        <CardTimer
          digits={repeatCount ?? 0}
          digitsCount={2}
          isDark={isBreak}
          unit="rep"
          isHidden={isBreak}
          isEditable={isEditable}
        />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  diamondGroup: {
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerDark: {
    backgroundColor: primaryColor,
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 5,
    borderColor: secondaryColor,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: secondaryColor,
    aspectRatio: 252 / 437,
  },
});
