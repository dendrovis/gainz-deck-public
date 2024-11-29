import { ICON_EXERCISE_TYPE_1, ICON_EXERCISE_TYPE_2, ICON_EXERCISE_TYPE_3 } from '../assets';

type DECKS_BASE_DATA_TYPE = { id: string; deckName: string; deckImage: string }[];
export type DECKS_DATA_TYPE = DECK_DATA_TYPE[];

export type DECK_DATA_TYPE = {
  id: string;
  deckType: 'exercise';
  deckName: string;
  deckImage: string;
  tasks: CARDS_DATA_TYPE;
  tasksGrouping: CARDS_GROUPING_TYPE;
};

export type CARDS_GROUPING_TYPE = {
  ids: number[] | [];
  repeats: { [ids: string]: number };
};

export type CARD_DATA_TYPE = {
  id: string;
  taskImage: string; //path to image
  type: 'active' | 'break';
  taskName: string;
  taskDuration: number; //in seconds
  taskInfo?: number | string;
};

export type CARDS_DATA_TYPE = CARD_DATA_TYPE[];

const DECK_MOCK_DATA: DECKS_BASE_DATA_TYPE = [
  {
    id: '1729000848',
    deckName: 'Core Day',
    deckImage: ICON_EXERCISE_TYPE_1,
  },
  {
    id: '1729000864',
    deckName: 'Push Day',
    deckImage: ICON_EXERCISE_TYPE_2,
  },
  {
    id: '1729000871',
    deckName: 'Pull Day',
    deckImage: ICON_EXERCISE_TYPE_3,
  },
];

const DECK_MOCK_DETAIL_DATA: DECKS_DATA_TYPE = [
  {
    id: '1729000848',
    deckName: 'Core Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_1,
    tasksGrouping: {
      ids: [123, 123, -1, 321, 321, 321, 333, 333, -1, -1, -1],
      repeats: { '123': 3, '321': 5, '333': 2 },
    },
    tasks: [
      {
        id: '1729001640',
        taskImage: ICON_EXERCISE_TYPE_1,
        type: 'active',
        taskName: 'task 1',
        taskDuration: 60,
        taskInfo: 30,
      },
      {
        id: '1729001641',
        taskImage: '',
        type: 'break',
        taskName: 'task 2',
        taskDuration: 30,
      },
      {
        id: '1729001642',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'active',
        taskName: 'task 3',
        taskDuration: 40,
      },
      {
        id: '1729001643',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'active',
        taskName: 'task 4',
        taskDuration: 40,
        taskInfo: 60,
      },
      {
        id: '1729001644',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'active',
        taskName: 'task 5',
        taskDuration: 40,
      },
      {
        id: '1729001645',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'active',
        taskName: 'task 6',
        taskDuration: 40,
      },
      {
        id: '1729001646',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'active',
        taskName: 'task 7',
        taskDuration: 40,
      },
      {
        id: '1729001647',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'active',
        taskName: 'task 8',
        taskDuration: 40,
      },
      {
        id: '1729001648',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'break',
        taskName: 'task 9',
        taskDuration: 40,
      },
      {
        id: '1729001649',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'active',
        taskName: 'task 10',
        taskDuration: 40,
      },
      {
        id: '1729001650',
        taskImage: ICON_EXERCISE_TYPE_2,
        type: 'break',
        taskName: 'task 11',
        taskDuration: 40,
      },
    ],
  },
  {
    id: '1729000929',
    deckName: 'Core Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_2,
    tasksGrouping: {
      ids: [],
      repeats: {},
    },
    tasks: [
      {
        id: '1729001639',
        taskImage: ICON_EXERCISE_TYPE_3,
        type: 'active',
        taskName: 'task A',
        taskDuration: 60,
      },
      {
        id: '1729001638',
        taskImage: '',
        type: 'break',
        taskName: 'task last',
        taskDuration: 30,
      },
    ],
  },
  {
    id: '1729000959',
    deckName: 'Core Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_2,
    tasksGrouping: {
      ids: [],
      repeats: {},
    },
    tasks: [],
  },
  {
    id: '1729001018',
    deckName: 'Push Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_3,
    tasksGrouping: {
      ids: [],
      repeats: {},
    },
    tasks: [],
  },
  {
    id: '1729001019',
    deckName: 'Pull Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_3,
    tasksGrouping: {
      ids: [],
      repeats: {},
    },
    tasks: [],
  },
  {
    id: '1729001020',
    deckName: 'Push Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_3,
    tasksGrouping: {
      ids: [],
      repeats: {},
    },
    tasks: [],
  },
  {
    id: '1729001021',
    deckName: 'Core Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_3,
    tasksGrouping: {
      ids: [],
      repeats: {},
    },
    tasks: [],
  },
  {
    id: '1729001022',
    deckName: 'Pull Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_3,
    tasksGrouping: {
      ids: [],
      repeats: {},
    },
    tasks: [],
  },
  {
    id: '1729001023',
    deckName: 'Last Day',
    deckType: 'exercise',
    deckImage: ICON_EXERCISE_TYPE_3,
    tasksGrouping: {
      ids: [],
      repeats: {},
    },
    tasks: [],
  },
];

const covers = () => DECK_MOCK_DATA;
const cards = (id: string) => DECK_MOCK_DETAIL_DATA.find((deck) => deck.id === id);

const getDeckMockData = { covers, cards };

export default getDeckMockData;
