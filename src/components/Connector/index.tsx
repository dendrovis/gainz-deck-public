import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { ICON_CONNECTOR, ICON_CONNECTOR_OFF } from '../../assets';

type ConnectorProps = { isDisplay?: boolean; isConnected: boolean } & PressableProps;

const Connector = ({ onPress, isDisplay = true, isConnected }: ConnectorProps) => {
  const connectorImageAlt = isConnected ? 'icon-connector' : 'icon-connector-off';
  const connectorImageSource = isConnected ? ICON_CONNECTOR : ICON_CONNECTOR_OFF;

  return (
    isDisplay && (
      <Pressable onPress={onPress} style={styles.connector}>
        <Image source={connectorImageSource} style={styles.connector} alt={connectorImageAlt} />
      </Pressable>
    )
  );
};

const styles = StyleSheet.create({
  connector: {
    height: 50,
    aspectRatio: 19 / 43,
  },
});

export default Connector;
