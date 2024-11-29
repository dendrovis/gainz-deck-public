import { View, Pressable, StyleSheet, PressableProps } from 'react-native';
import React, { ReactNode } from 'react';
import Panel from './Panel';
import { CARD_HEIGHT } from '../constants';

type AccordionProps = { children: ReactNode };

const Accordion = ({ children }: AccordionProps) => (
  <View style={styles.container}>{children}</View>
);

type AccordionHeaderProps = { children: ReactNode } & PressableProps;

const AccordionHeader = ({ children, onPress }: AccordionHeaderProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>{children}</View>
    </Pressable>
  );
};

Accordion.Header = AccordionHeader;
Accordion.Panel = Panel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    borderRadius: 30,
    height: CARD_HEIGHT,
    width: '100%',
    backgroundColor: '#EDEBE2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
});

export default Accordion;
