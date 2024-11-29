import { View, StyleSheet } from 'react-native';
import React from 'react';
import { secondaryColor } from '../styles/common';

const Divider = () => <View style={dividerStyles.container} />;

const DividerUp = () => {
  return (
    <View style={dividerStyles.containerUp}>
      <View style={dividerStyles.curveUp} />
    </View>
  );
};

const DividerDown = () => {
  return (
    <View style={dividerStyles.containerDown}>
      <View style={dividerStyles.curveDown} />
    </View>
  );
};

Divider.Up = DividerUp;
Divider.Down = DividerDown;

const dividerStyles = StyleSheet.create({
  container: {
    backgroundColor: secondaryColor,
    width: '80%',
    height: 1,
  },
  curveUp: {
    height: 50,
    width: 50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: secondaryColor,
    transform: [{ scaleX: 10 }],
  },
  curveDown: {
    height: 50,
    width: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: secondaryColor,
    transform: [{ scaleX: 10 }],
  },
  containerDown: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  containerUp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -70,
  },
});

export default Divider;
