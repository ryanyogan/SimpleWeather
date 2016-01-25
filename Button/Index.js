'use strict';

import React, {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from './styles';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.button, this.props.style]}>
          <Text>
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  onPress: React.PropTypes.func,
  label: React.PropTypes.string
};

export default Button;
