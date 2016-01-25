'use strict';

import React, {
  StyleSheet
} from 'react-native';

const BASE_FONT_SIZE = 18;

const styles = StyleSheet.create({
  bigText: {
    fontSize: BASE_FONT_SIZE + 8,
    color: '#FFFFFF'
  },
  mainText: {
    fontSize: BASE_FONT_SIZE,
    color: '#FFFFFF'
  }
});

Object.assign(styles, {
  baseFontSize: BASE_FONT_SIZE
});

export default styles;
