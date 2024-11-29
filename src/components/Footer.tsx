import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import Divider from './Divider';
import {
  ICON_BACK,
  ICON_BACKWARD,
  ICON_FORWARD,
  ICON_GROUPING,
  ICON_PAUSE,
  ICON_PLAY,
  ICON_RECORDS,
  ICON_REORDER,
  ICON_SELECT_EXISTING_CARD,
  ICON_SELECT_EXISTING_DECK,
  ICON_SETTINGS,
} from '../assets';
import { Link, usePathname, router } from 'expo-router';
import { primaryColor } from '../styles/common';
import { FooterContentConfig, FooterContentPatterns } from '../constants';

export enum FooterIconPattern {}

const Footer = () => {
  const pathname = usePathname();
  if (!Object.keys(FooterContentConfig).includes(pathname))
    throw new Error('undefined header title');
  const validPathName = pathname as keyof typeof FooterContentConfig;

  const renderButtons = () => {
    if (FooterContentConfig[validPathName] === FooterContentPatterns.HOME_BUTTONS)
      return <Footer.HomeButtons />;
    if (FooterContentConfig[validPathName] === FooterContentPatterns.PLAY_DECK_BUTTONS)
      return <Footer.PlayDeckButtons />;
    if (FooterContentConfig[validPathName] === FooterContentPatterns.EDIT_DECK_BUTTONS)
      return <Footer.EditDeckButtons />;
    if (FooterContentConfig[validPathName] === FooterContentPatterns.CUSTOM)
      return <Footer.BackToHomeButton />;
    return <Footer.BackButton />;
  };

  return (
    <View style={footerStyles.container}>
      <Divider.Up />
      <View style={footerStyles.content}>{renderButtons()}</View>
    </View>
  );
};

const HomeButtons = () => (
  <>
    <Link href="/records" style={footerStyles.iconContainer} asChild>
      <Pressable>
        <Image style={footerStyles.icon} source={ICON_RECORDS} placeholder={'icon_records'} />
      </Pressable>
    </Link>
    <Link href="/play" style={footerStyles.iconPlayContainer} asChild>
      <Pressable>
        <Image style={footerStyles.iconPlay} source={ICON_PLAY} placeholder={'icon_play'} />
      </Pressable>
    </Link>
    <Link href="/settings" style={footerStyles.iconContainer} asChild>
      <Pressable>
        <Image style={footerStyles.icon} source={ICON_SETTINGS} placeholder={'icon_settings'} />
      </Pressable>
    </Link>
  </>
);

const BackButton = () => (
  <Pressable
    style={footerStyles.iconContainer}
    onPress={() => {
      router.back();
    }}
  >
    <Image style={footerStyles.icon} source={ICON_BACK} placeholder={'icon_back'} />
  </Pressable>
);

const BackToHomeButton = () => (
  <Link href="/" style={footerStyles.iconContainer} asChild>
    <Pressable style={footerStyles.iconContainer}>
      <Image style={footerStyles.icon} source={ICON_BACK} placeholder={'icon_back'} />
    </Pressable>
  </Link>
);

const EditDeckButtons = () => (
  <>
    <Link href="/card-select" style={footerStyles.iconContainer} asChild>
      <Pressable>
        <Image
          style={footerStyles.icon}
          source={ICON_SELECT_EXISTING_CARD}
          placeholder={'icon_select_existing_card'}
        />
      </Pressable>
    </Link>
    <Link href="/deck-select" style={footerStyles.iconContainer} asChild>
      <Pressable>
        <Image
          style={footerStyles.icon}
          source={ICON_SELECT_EXISTING_DECK}
          placeholder={'icon_select_existing_deck'}
        />
      </Pressable>
    </Link>
    <Link href="/" style={footerStyles.iconContainer} asChild>
      <Pressable>
        <Image style={footerStyles.icon} source={ICON_BACK} placeholder={'icon_back'} />
      </Pressable>
    </Link>
    <Pressable style={footerStyles.iconContainer}>
      <Image style={footerStyles.icon} source={ICON_GROUPING} placeholder={'icon_grouping'} />
    </Pressable>
    <Pressable style={footerStyles.iconContainer}>
      <Image style={footerStyles.icon} source={ICON_REORDER} placeholder={'icon_reorder'} />
    </Pressable>
  </>
);

const PlayDeckButtons = () => {
  const [isPlay, setPlay] = useState(false);

  return (
    <>
      <View style={footerStyles.iconContainer}>
        <Pressable
          style={footerStyles.icon}
          onPress={() => {
            console.log('backward button press');
          }}
        >
          <Image style={footerStyles.icon} source={ICON_BACKWARD} placeholder={'icon_backward'} />
        </Pressable>
      </View>
      <View style={footerStyles.iconPlayContainer}>
        <Pressable
          style={footerStyles.iconPlay}
          onPress={() => {
            setPlay(!isPlay);
          }}
        >
          <Image
            style={footerStyles.iconPlay}
            source={isPlay ? ICON_PAUSE : ICON_PLAY}
            placeholder={isPlay ? 'icon_pause' : 'icon_play'}
          />
        </Pressable>
      </View>
      <View style={footerStyles.iconContainer}>
        <Pressable
          style={footerStyles.icon}
          onPress={() => {
            console.log('forward button press');
          }}
        >
          <Image style={footerStyles.icon} source={ICON_FORWARD} placeholder={'icon_forward'} />
        </Pressable>
      </View>
    </>
  );
};

Footer.HomeButtons = HomeButtons;
Footer.BackButton = BackButton;
Footer.EditDeckButtons = EditDeckButtons;
Footer.PlayDeckButtons = PlayDeckButtons;
Footer.BackToHomeButton = BackToHomeButton;

const footerStyles = StyleSheet.create({
  content: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 1,
  },
  iconPlay: {
    width: '100%',
    aspectRatio: 150 / 132,
  },
  iconPlayContainer: {
    width: '30%',
  },
  icon: {
    width: 60,
    aspectRatio: 1,
  },
  iconContainer: {
    marginTop: 30,
  },
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: primaryColor,
  },
});

export default Footer;
