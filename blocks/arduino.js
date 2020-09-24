/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Loop blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.arduino');  // Deprecated
goog.provide('Blockly.Constants.Arduino');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldNumber');
goog.require('Blockly.FieldVariable');
goog.require('Blockly.Warning');


/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg['LOOPS_HUE']. (2018 April 5)
 */
Blockly.Constants.Arduino.HUE = 120;

Blockly.Blocks['arduino_setup'] = {
  init: function () {
    this.setColour("%{BKY_ARDUINO_HUE}");
    //this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_SETUP_HELPURL);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARDUINO_GENERAL_MSG_SETUP);
    this.appendStatementInput('DO');
    this.setTooltip("Exécuté seulement dans le 'Setup'");
  },
  /** @return {!boolean} True if the block instance is in the workspace. */
  getArduinoLoopsInstance: function() {
    return true;
  }
};

Blockly.Blocks['arduino_loop'] = {
  /*init: function() {
    this.appendDummyInput()
        .appendField("LOOP");
    this.appendStatementInput("DOLOOP")
        .setCheck(null);
    this.setColour(180);
    this.setTooltip("");
    this.setHelpUrl("");
  }*/
  init: function () {
    this.setColour("%{BKY_ARDUINO_HUE}");
    //this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_SETUP_LOOP_HELPURL);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARDUINO_GENERAL_MSG_LOOP);
    this.appendStatementInput('DOLOOP');
    this.setInputsInline(false);
    this.setTooltip("Exécuté seulement dans le 'Loop'");
    this.contextMenu = false;
  },
  /** @return {!boolean} True if the block instance is in the workspace. */
  getArduinoLoopsInstance: function() {
    return true;
  }
};

Blockly.Blocks['arduino_comment'] = {
  init: function() {
    //this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_COMMENT_HELPURL);
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_GENERAL_MSG_COMMENT)
        .appendField(new Blockly.FieldTextInput(''), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Human readable comment in text");
  }
};

Blockly.Blocks['arduino_highlow'] = {
  //helpUrl: 'http://arduino.cc/en/Reference/Constants',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), 'BOOL')
    this.setOutput(true, 'Boolean');
    this.setTooltip('');
  }
};
  
Blockly.Blocks['arduino_digital_write'] = {
  //helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
          .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_DWITE)
          .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
          .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_STATE)
          .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port');
  }
};

Blockly.Blocks['arduino_digital_read'] = {
  //helpUrl: 'http://arduino.cc/en/Reference/DigitalRead',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
	      .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_DREAD)
	      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip('');
  }
};

Blockly.Blocks['arduino_analog_write'] = {
  //helpUrl: 'http://arduino.cc/en/Reference/AnalogWrite',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_AWITE)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendValueInput("NUM", 'Number')
        .appendField(Blockly.Msg.ARDUINO_INOUTL_MSG_VALUE)
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write analog value between 0 and 255 to a specific Port');
  }
};

Blockly.Blocks['arduino_analog_read'] = {
  //helpUrl: 'http://arduino.cc/en/Reference/AnalogRead',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_AREAD)
        .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.setOutput(true, 'Number');
    this.setTooltip('Return value between 0 and 1024');
  }
};

Blockly.Blocks['arduino_tone'] = {
  //helpUrl: 'http://www.arduino.cc/en/Reference/Tone',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_TONE)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendValueInput("NUM", "Number")
        .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_FREQ)
        .setCheck("Number");
    this.appendValueInput("NUM2", "Number")
        .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_DURA)
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Generate audio tones on a pin");
  }
};

Blockly.Blocks['arduino_notone'] = {
  //helpUrl: 'http://www.arduino.cc/en/Reference/NoTone',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_INOUT_MSG_NOTONE)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Stop generating a tone on a pin");
  }
};

Blockly.Blocks['arduino_delay'] = {
  //helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendValueInput("DELAY_TIME", 'Number')
        .appendField(Blockly.Msg.ARDUINO_OTHERS_MSG_DELAY)
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time');
  }
};

Blockly.Blocks['arduino_end'] = {
  //helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
    .appendField(Blockly.Msg.ARDUINO_OTHERS_MSG_END)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time');
  }
};

Blockly.Blocks['arduino_random'] = {
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.setHelpUrl("");
    this.appendValueInput("rand_min")
        .setCheck("Number")
        .appendField(Blockly.Msg.ARDUINO_OTHERS_MSG_RAND);
    this.appendValueInput("rand_max")
        .setCheck("Number")
        .appendField(Blockly.Msg.ARDUINO_OTHERS_MSG_TO);
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setTooltip('');
  }
};

Blockly.Blocks['arduino_random_seed'] = {
  //helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
    .appendField(Blockly.Msg.ARDUINO_OTHERS_MSG_RSEED)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Random seed');
  }
};

Blockly.Blocks['arduino_serial_print'] = {
  //helpUrl: 'http://www.arduino.cc/en/Serial/Print',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendValueInput("CONTENT", 'String')
        .appendField(Blockly.Msg.ARDUINO_OTHERS_MSG_SERIAL);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Prints data to the console/serial port as human-readable ASCII text.');
  }
};

Blockly.Blocks['arduino_servo_move'] = {
  //helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
  init: function() {
    this.setColour("%{BKY_ARDUINO_HUE}");
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_OTHERS_MSG_SERVO)
        //.appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/EMAX%20Servo.jpg", 64, 64))
        //.appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendValueInput("DEGREE", 'Number')
        .setCheck('Number')
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_OTHERS_MSG_ANGLE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('move between 0~180 degree');
  }
};