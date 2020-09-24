/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating C for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Arduino.arduino');

goog.require('Blockly.Arduino');

Blockly.Arduino['arduino_setup'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    var code = //'{\n' +
            branch;// + '\n}\n';
    var setup_key = Blockly.Arduino.variableDB_.getDistinctName('arduino_setup', Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.setups_[setup_key] = code;
    return ""; //do not return any actual code
};

Blockly.Arduino['arduino_loop'] = function(block) {
    var branch = Blockly.Arduino.statementToCode(block, 'DOLOOP');
    branch = Blockly.Arduino.addLoopTrap(branch, block);
    //var code = 'void loop() {\n' + branch + '\n}\n';
    var code = branch;
    return code;
    /*var loop = Blockly.Arduino.statementToCode(this, 'DOLOOP');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    return [loop, Blockly.Arduino.ORDER_ATOMIC];*/
};

Blockly.Arduino['arduino_comment'] = function(block) {
    // Text value.
    var code = '// ' + this.getFieldValue('TEXT') + '\n';
    return code;
};

Blockly.Arduino['arduino_highlow'] = function(block) {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
  
Blockly.Arduino['arduino_digital_write'] = function(block) {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino['arduino_digital_read'] = function(block) {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_analog_write'] = function(block) {
  var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
  return code;
};

Blockly.Arduino['arduino_analog_read'] = function(block) {
  var dropdown_pin = this.getFieldValue('PIN');
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_tone'] = function(block) {
    var dropdown_pin = this.getFieldValue("PIN");
    var value_num = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC);
    var value_num2 = Blockly.Arduino.valueToCode(this, "NUM2", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = "tone(" + dropdown_pin + ", " + value_num + ", " + value_num2 + ");\n";
    return code;
};
  
Blockly.Arduino['arduino_notone'] = function(block) {
    var dropdown_pin = this.getFieldValue("PIN");
    Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = "noTone(" + dropdown_pin + ");\n";
    return code;
};

Blockly.Arduino['arduino_delay'] = function(block) {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'delay(' + delay_time + ');\n';
    return code;
};

Blockly.Arduino['arduino_end'] = function(block) {
    var code = 'while(true);\n';
    return code;
};

Blockly.Arduino['arduino_random'] = function(block) {
    var value_rand_min = Blockly.Arduino.valueToCode(this, 'rand_min', Blockly.Arduino.ORDER_ATOMIC);
    var value_rand_max = Blockly.Arduino.valueToCode(this, 'rand_max', Blockly.Arduino.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'random('+value_rand_min+','+value_rand_max+')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['arduino_random_seed'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'randomSeed(analogRead(0));\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

Blockly.Arduino['arduino_serial_print'] = function(block) {
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
    //content = content.replace('(','').replace(')','');
  
    Blockly.Arduino.setups_['setup_serial_' + profile.default.serial] = 'Serial.begin(' + profile.default.serial + ');\n';
  
    var code = 'Serial.println(' + content + ');\n';
    return code;
  };

Blockly.Arduino['arduino_servo_move'] = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  
    Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
    Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
    Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';
  
    var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n';
    return code;
  };