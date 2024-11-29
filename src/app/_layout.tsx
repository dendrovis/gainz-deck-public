import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Slot } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyles } from '../styles/common';
import { Footer, Header } from '../components';
import { usePathname } from 'expo-router';
import { HeaderNameIDs } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { useKeyboardVisible } from '../hooks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CommonLayout = () => {
  const pathname = usePathname();
  if (!Object.keys(HeaderNameIDs).includes(pathname)) throw new Error('undefined header title');
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <GestureHandlerRootView style={[appStyles.background, styles.container]}>
      <StatusBar style={'light'} />
      <SafeAreaView style={styles.container}>
        {!isKeyboardVisible && (
          <Header title={HeaderNameIDs[pathname as keyof typeof HeaderNameIDs]} />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Slot />
        </KeyboardAvoidingView>
        {!isKeyboardVisible && <Footer />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: '5%',
    height: '85%',
  },
  container: {
    flex: 1,
  },
});

export default CommonLayout;
