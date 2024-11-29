import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { appStyles } from '../styles/common';
import Divider from './Divider';
import { CapitalizedWords, isUndefined } from '../utils';

type HeaderProps = { title: string };

const Header = ({ title }: HeaderProps) => {
  const normalisedTitle = isUndefined(title) ? 'undefined' : CapitalizedWords(title);

  return (
    <View style={headerStyles.container}>
      <Divider.Down />
      <View style={headerStyles.headerContent}>
        <Text style={appStyles.textSubHeader}>{normalisedTitle}</Text>
      </View>
      <Divider.Down />
    </View>
  );
};

const headerStyles = StyleSheet.create({
  headerContent: {
    padding: 4,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '12%',
    maxHeight: '12%',
  },
});

export default Header;
