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
  TextInput,
  View,
  Switch,
  Picker
} from 'react-native';

class TipResult extends Component{
  render() {
    var totalPrice = parseFloat(this.props.data.totalPrice);
    var tax = parseFloat(this.props.data.tax);
    var minTip = parseFloat(this.props.data.tipPercent);
    var multiplier = 1.0 + minTip;

    var price = totalPrice;

    if (tax > 0) {
      price = price / (1.0 + tax);
    }

    var minimumTip = price*multiplier - price;
    var tipResult = minimumTip;
    if (this.props.data.roundNearestDollar) {
       tipResult = Math.ceil(totalPrice + minimumTip) - totalPrice;
    }
    if (price == 0) {
      actualTip = 0
    } else {
        actualTip =(tipResult/price).toFixed(2);
    }
    return (
      <View style={styles.resultContainer}>
      <Text style={styles.label}>
           Total Tip: ${tipResult.toFixed(2)} Tip Percent: {actualTip*100}%
      </Text>
      <Text style={styles.label}>
             Total Bill: ${(totalPrice + tipResult).toFixed(2)}
      </Text>
      </View>
    );
  }
}


class AwesomeProject extends Component {
  constructor() {
     super();
      this.state = {
       totalPrice:'0',
       tax:'0',
       tipPercent:'0',
       roundNearestDollar: true
      };
    }

  buildPickerItems() {
    var items = new Array(<Picker.Item label="None" value="" key='none'/>);
    for (var i = 1; i <= 25; i++) {
        items.push(React.createElement("Picker.Item",{label:i+"%",value:(i/100).toString(),key:i.toString()}));
    }
    return items;
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>
           Tip Calculator
      </Text>
        <Text style={styles.label}>
             Total Price
        </Text>
        <TextInput keyboardType='numeric' onChangeText={(text) => this.setState({totalPrice:text})} value={this.state.totalPrice} />
        <Text style={styles.label}>
          Tax To Remove
        </Text>

        <Picker
          selectedValue={this.state.tax}
          onValueChange={(text) => this.setState({tax:text})}>
          {this.buildPickerItems()}

        </Picker>
        <Text style={styles.label}>
          Minimum Tip
        </Text>
        <Picker
          selectedValue={this.state.tipPercent}
          onValueChange={(text) => this.setState({tipPercent:text})}>
          {this.buildPickerItems()}
        </Picker>

        <Text style={styles.label}>
          Round up to nearest dollar
        </Text>
        <View style={{justifyContent: 'center', alignItems:'flex-start'}}>
          <Switch onValueChange={(value) => this.setState({roundNearestDollar:value})} value={this.state.roundNearestDollar} />
        </View>
        <TipResult data={this.state} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight:'bold',
    textAlign: 'center',
    color:'darkblue'
  },
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
  },
  label: {
    fontSize: 20,
    fontWeight:'bold',
    textAlign: 'left',
    color:'black'
  },
  resultContainer: {
    borderColor:'black',
    backgroundColor:'wheat',
    borderStyle:'solid',
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
