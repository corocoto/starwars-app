// Libs
import { RuleObject } from 'rc-field-form/lib/interface';

export const COLORS = {
  blue: 'blue',
  blueGray: 'blue-gray',
  black: 'black',
  orange: 'orange',
  yellow: 'yellow',
  brown: 'brown',
  green: 'green',
  red: 'red',
  grey: 'grey',
  auburn: 'auburn',
  white: 'white',
  gold: 'gold',
  greenTan: 'green-tan'
};

export const UNKNOWN_VALUE = 'unknown';
export const HAVE_NOT_ATTR = 'n/a';

export const EYE_COLOR_OPTIONS = [
  {
    value: COLORS.blue, label: COLORS.blue,
  },
  {
    value: COLORS.blueGray, label: COLORS.blueGray,
  },
  {
    value: COLORS.black, label: COLORS.black,
  },
  {
    value: COLORS.orange, label: COLORS.orange,
  },
  {
    value: COLORS.yellow, label: COLORS.yellow,
  },
  {
    value: COLORS.brown, label: COLORS.brown,
  },
  {
    value: COLORS.green, label: COLORS.green,
  },
  {
    value: COLORS.red, label: COLORS.red
  },
  {
    value: UNKNOWN_VALUE, label: UNKNOWN_VALUE
  },
  {
    value: HAVE_NOT_ATTR, label: 'doesn\'t have'
  }
];

export const HAIR_COLOR_OPTIONS = [
  {
    value: 'blond', label: 'blond'
  },
  {
    value: HAVE_NOT_ATTR, label: 'doesn\'t have'
  },
  {
    value: UNKNOWN_VALUE, label: UNKNOWN_VALUE
  },
  {
    value: COLORS.brown, label: COLORS.brown
  },
  {
    value: COLORS.grey, label: COLORS.grey
  },
  {
    value: COLORS.black, label: COLORS.black
  },
  {
    value: COLORS.auburn, label: COLORS.auburn
  },
  {
    value: COLORS.white, label: COLORS.white
  }
];

export const BODY_COLOR_OPTIONS = [
  {
    value: 'fair', label: 'fair',
  },
  {
    value: COLORS.gold, label: COLORS.gold
  },
  {
    value: COLORS.white, label: COLORS.white
  },
  {
    value: COLORS.blue, label: COLORS.blue
  },
  {
    value: 'light', label: 'light'
  },
  {
    value: COLORS.red, label: COLORS.red
  },
  {
    value: UNKNOWN_VALUE, label: UNKNOWN_VALUE
  },
  {
    value: COLORS.green, label: COLORS.green
  },
  {
    value: COLORS.greenTan, label: COLORS.greenTan
  },
  {
    value: COLORS.brown, label: COLORS.brown
  },
  {
    value: 'pale', label: 'pale'
  }
];

export const GENDER_OPTIONS = [
  {
    value: 'male', label: 'female'
  },
  {
    value: 'female', label: 'female'
  },
  {
    value: HAVE_NOT_ATTR, label: 'doesn\'t have'
  },
  {
    value: 'hermaphrodite', label: 'hermaphrodite'
  }
];

export const RULES = {
  required: [{required: true}],
  multiplyValuesValidator: [{ validator: (_fieldSchema: RuleObject, values: string[]) => {
    const hasNotValueSelected = values.includes(HAVE_NOT_ATTR);
    const hasUnknownValueSelected = values.includes(UNKNOWN_VALUE);

      if (values.length > 1 && (hasNotValueSelected || hasUnknownValueSelected)) {
        return Promise.reject('Logical error! You can\'t save values where some of them can contradict to each other');
      }

      return Promise.resolve();
    }}]
};
