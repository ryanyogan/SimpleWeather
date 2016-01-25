'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Image,
  Component
} from 'react-native';

import Forecast from './Forecast';
import LocationButton from './LocationButton';
import PhotoBackdrop from './PhotoBackdrop';

import textStyles from './styles/typography';

const STORAGE_KEY = '@SimpleWeather:zip';
const WEATHER_API_KEY = 'bbeb34ebf60ad50f7893e7440a1e2b0b';
const API_STEM = 'http://api.openweathermap.org/data/2.5/weather?';

class SimpleWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch((error) => console.log('Storage error: ' + error))
      .done();
  }

  _getForecastForZip(zip) {
    AsyncStorage.setItem(STORAGE_KEY, zip)
      .then(() => console.log('Saved selection to disk' + zio))
      .catch((error) => console.log('Storage Error: ' + error))
      .done();

    this._getForecast(
      `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`);
  }

  _getForecaseForCoords(lat, lon) {
    this._getForecast(
      `${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`);
  }

  _getForecast(url, cb) {
    fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  _handleTextChange(event) {
    const zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  }

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
          <Forecast
            main={this.state.forecast.main}
            description={this.state.forecast.description}
            temp={this.state.forecast.temp} />
        </View>
      );
    }

    return (
      <PhotoBackdrop>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={textStyles.mainText}>
              Current weather for
            </Text>
            <View style={styles.zipContainer}>
              <TextInput
                style={[styles.mainText, styles.zipCode]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange.bind(this)} />
            </View>
          </View>
          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords.bind(this)} />
          </View>
          {content}
        </View>
      </PhotoBackdrop>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5
  },
  row: {
    width: 400,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    width: 10
  },
  zipCode: {
    width: 50,
    height: textStyles.baseFontSize
  }
});

export default SimpleWeather;