import { CARD_DATA_TYPE } from './getDeckData';

export const createCardData = (): CARD_DATA_TYPE => ({
  id: `${Date.now()}`,
  taskImage: '',
  taskName: 'new tasks',
  type: 'active',
  taskDuration: 10,
});
