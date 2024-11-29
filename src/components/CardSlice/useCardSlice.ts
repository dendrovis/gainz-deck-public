import { primaryColor, secondaryColor } from '../../styles/common';
import { stringNumberWithZeroPadding } from '../../utils';
import { CardSliceType } from '.';

type UseCardSliceProps = { type: CardSliceType; index: number; isSelected: boolean };

const useCardSlice = ({ type, index, isSelected }: UseCardSliceProps) => {
  const indexWithPadding = stringNumberWithZeroPadding(index, 2);

  const viewBackgroundColor = [
    type === 'break' && { backgroundColor: primaryColor, borderColor: secondaryColor },
    isSelected && { backgroundColor: '#A4EBA7' },
  ];

  const textColor =
    type === 'break' && !isSelected ? { color: secondaryColor } : { color: primaryColor };

  return { indexWithPadding, viewBackgroundColor, textColor };
};

export default useCardSlice;
