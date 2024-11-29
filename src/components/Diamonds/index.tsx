import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import Diamond from '../Diamond';

type DiamondsProps = {
  digits: number;
  isEditable?: boolean;
  digitsCount: number;
  isDark?: boolean;
  isHidden?: boolean;
  onChange?: (digits: number) => void;
  children?: ReactNode;
};

const Diamonds = ({
  digits,
  isEditable,
  digitsCount,
  onChange,
  isHidden,
  isDark,
  children,
}: DiamondsProps) => {
  const digitsArray = new Array(digitsCount).fill(0);

  return (
    <View style={[styles.diamonds]}>
      {digitsArray.map((_, index) => {
        const digit = Number(`${digits}`.padStart(3, '0')[index]);
        const onChangeHandler = (value: number) => {
          const newDigitsArray = digits.toString().split('');
          newDigitsArray[index] = `${value}`;
          const newDigits = newDigitsArray.join('').padStart(3, '0');
          if (onChange) onChange(Number(newDigits));
        };
        return (
          <Diamond
            key={index}
            digit={digit}
            isHidden={isHidden}
            isDark={isDark}
            isEditable={isEditable}
            onChange={onChangeHandler}
          />
        );
      })}
      {children}
    </View>
  );
};

export default Diamonds;

const styles = StyleSheet.create({
  diamonds: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
  },
});
