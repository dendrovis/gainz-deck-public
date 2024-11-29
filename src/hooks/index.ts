import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { Keyboard } from 'react-native';

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

type DeckStore = {
  currentDeckIndex: number;
  isCreateDeck: boolean;
  setCurrentDeckIndex: (newDeckIndex: number) => void;
  setCreateDeck: (isCreateDeck: boolean) => void;
};

export const useDeckStore = create<DeckStore>((set) => ({
  currentDeckIndex: 0,
  setCurrentDeckIndex: (newDeckIndex) =>
    set({
      currentDeckIndex: newDeckIndex,
    }),
  isCreateDeck: false,
  setCreateDeck: (isCreateDeck) => set({ isCreateDeck }),
}));

// useCardStore

// useRecordStore

// useSettingStore

// useCacheStore
