import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { appStyles } from '../../styles/common';
import Diamonds from '../Diamonds';

type CardTimerProps = {
  digits: number;
  isEditable?: boolean;
  unit?: string;
  digitsCount: number;
  isDark?: boolean;
  isHidden?: boolean;
  onChange?: (digits: number) => void;
  isPlay?: boolean;
  isPlayable?: boolean;
};

const CardTimer = ({
  digits,
  isDark = false,
  isEditable = false,
  unit = 's',
  digitsCount,
  isHidden = false,
  onChange,
  isPlay = false,
  isPlayable = false,
}: CardTimerProps) => {
  const StyleUnitText = [styles.timerUnit, isDark && appStyles.darkModeText];
  const StyleTimerUnitContainer = [styles.timerUnitContainer, isHidden && appStyles.hidden];
  const [digits_, setDigits] = useState(digits);
  if (onChange) onChange(digits_);

  useEffect(() => {
    if (!isPlayable) return;

    let tickInterval = undefined;

    const tick = () => {
      setDigits((digits) => {
        if (digits > 0) return digits - 1;
        else return 0;
      });
    };

    if (isPlay) {
      tickInterval = setInterval(tick, 1000);
    }

    return () => {
      if (tickInterval) clearInterval(tickInterval);
    };
  }, [isPlay]);

  return (
    <Diamonds
      digits={digits_}
      isEditable={isEditable}
      digitsCount={digitsCount}
      onChange={onChange}
      isHidden={isHidden}
      isDark={isDark}
    >
      <View style={StyleTimerUnitContainer}>
        <Text style={StyleUnitText}>{unit}</Text>
      </View>
    </Diamonds>
  );
};

export default CardTimer;

const styles = StyleSheet.create({
  timerUnitContainer: {
    position: 'absolute',
    right: 0,
    width: '20%',
    top: 27,
    transform: [{ scaleX: -1 }, { scaleY: -1 }],
    transformOrigin: 'right',
    fontSize: 20,
  },
  timerUnit: {
    paddingLeft: 10,
    transform: [{ rotate: '180deg' }],
  },
});
