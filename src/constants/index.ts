import { Dimensions } from 'react-native';

type ValueOf<T> = T[keyof T];
type PathNamesType = ValueOf<typeof PathNames>;
type FooterContentPatternsType = ValueOf<typeof FooterContentPatterns>;

export const PathNames = {
  CARD_SELECT: '/card-select',
  CARD_EDIT: '/card-edit',
  DECK_EDIT: '/deck-edit',
  DECK_SELECT: '/deck-select',
  HOME: '/',
  PLAY: '/play',
  RECORDS: '/records',
  REPORTS: '/reports',
  SETTINGS: '/settings',
} as const;

export const HeaderNameIDs: Record<PathNamesType, string> = {
  '/card-select': 'select existing card',
  '/card-edit': 'edit card',
  '/deck-edit': 'edit deck',
  '/deck-select': 'select existing deck',
  '/': 'deck',
  '/play': 'play',
  '/records': 'records',
  '/reports': 'reports',
  '/settings': 'settings',
};

export const FooterContentPatterns = {
  EDIT_DECK_BUTTONS: 'edit-deck-buttons',
  HOME_BUTTONS: 'home-buttons',
  PLAY_DECK_BUTTONS: 'play-deck-buttons',
  BACK_BUTTON: 'back-button',
  CUSTOM: 'custom',
} as const;

export const FooterContentConfig: Record<PathNamesType, FooterContentPatternsType> = {
  '/card-select': 'back-button',
  '/card-edit': 'back-button',
  '/deck-edit': 'back-button',
  '/deck-select': 'back-button',
  '/': 'home-buttons',
  '/play': 'play-deck-buttons',
  '/records': 'back-button',
  '/reports': 'custom',
  '/settings': 'back-button',
};

// set reasonable resource allocation
export const MAX_DECK_COUNT = 10;

export const CUSTOM_SCROLL_PAGES = [PathNames.DECK_EDIT] as string[];

export const CARD_HEIGHT = 50;

export const CARD_GAP = 25;

export const CARD_MAX_COUNT = 30;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const TIME_UNIT = 's';
export const REPEAT_UNIT = 'rep';
