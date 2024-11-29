import { StyleSheet } from 'react-native';

export const primaryColor = '#2A2A2A';
export const secondaryColor = '#EDEBE2';
export const primaryColorLight = '#2A2A2A40';

export const appStyles = StyleSheet.create({
  background: {
    backgroundColor: primaryColor,
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: secondaryColor,
  },
  textHeader: {
    fontSize: 26,
    color: secondaryColor,
  },
  textSubHeader: {
    fontSize: 22,
    color: secondaryColor,
  },
  textDescription: {
    fontSize: 14,
    color: secondaryColor,
  },
  hidden: {
    opacity: 0,
  },
  darkModeText: {
    color: secondaryColor,
  },
});
