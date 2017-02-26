/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';

import FormatTime from 'minutes-seconds-milliseconds';


export default class Stopwatch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={[styles.header, ]}>
          <View style={[styles.timerWrapper]}>
            <Text style={styles.timer}>
              {FormatTime(this.state.timeElapsed)}
            </Text>
          </View>

          <View style={[styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>

        <View style={[styles.footer]}>
          {this.laps()}
        </View>

      </View>
    );
  }

  laps() {
    return this.state.laps.map((time, index) => {
      return (
          <View key={index} style={styles.lap}>
            <Text style={styles.lapText}>
              Lap #{index + 1}
            </Text>
            <Text style={styles.lapText}>
              {FormatTime(time)}
            </Text>
          </View>
      );
    });
  }

  startStopButton() {

    let style = this.state.running ? styles.stopButton : styles.startButton;

    return (
        <TouchableHighlight underlayColor='gray'
                            style={[styles.button, style]}
                            onPress={this.handleStartPress.bind(this)}>
          <Text>
            {this.state.running ? 'Stop': 'Start'}
          </Text>
        </TouchableHighlight>
    );
  }

  lapButton() {
    return (
        <TouchableHighlight underlayColor='gray'
                            style={styles.button}
                            onPress={this.handleLapPress.bind(this)}>
          <Text>Lap</Text>
        </TouchableHighlight>
    );
  }

  handleStartPress(event) {
    // console.log('Start was Pressed.');

    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({
        running: false,
      });
      return;
    }


    let startTime = new Date();
    this.setState({startTime});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      });
    }, 5);

  }


  handleLapPress(event) {
    console.log('Lap was Pressed.')
    let lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap]),
    })

  }

  // border(color) {
  //   return {
  //     borderColor: color,
  //     borderWidth: 4,
  //   }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: '',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    marginTop: Platform.OS === 'ios' ? 20: 0,
  },
  header: {    // Yellow
    flex: 1,
    backgroundColor: 'yellow',
  },
  footer: {    // Blue
    flex: 1,
    backgroundColor: 'blue',
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  timer: {
    fontSize: 50,
  },

  button: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderColor: '#00CC00',
  },
  stopButton: {
    borderColor: '#cc0000',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  lapText: {
    fontSize: 30,
  }
});

AppRegistry.registerComponent('Stopwatch', () => Stopwatch);
