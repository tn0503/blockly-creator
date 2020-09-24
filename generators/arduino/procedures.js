/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating C for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Arduino.procedures');

goog.require('Blockly.Arduino');


Blockly.Arduino['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var xfix1 = '';
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    xfix1 += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_PREFIX,
        block);
  }
  if (Blockly.Arduino.STATEMENT_SUFFIX) {
    xfix1 += Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX,
        block);
  }
  if (xfix1) {
    xfix1 = Blockly.Arduino.prefixLines(xfix1, Blockly.Arduino.INDENT);
  }
  var loopTrap = '';
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.Arduino.prefixLines(
        Blockly.Arduino.injectId(Blockly.Arduino.INFINITE_LOOP_TRAP,
        block), Blockly.Arduino.INDENT);
  }
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN',
      Blockly.Arduino.ORDER_NONE) || '';
  var xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Blockly.Arduino.INDENT + 'return ' + returnValue + ';\n';
  }
  var returnType = returnValue ? 'int' : 'void';
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = 'int ' + Blockly.Arduino.variableDB_.getName(variables[i],
        Blockly.VARIABLE_CATEGORY_NAME);
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      xfix1 + loopTrap + branch + xfix2 + returnValue + '}';
  code = Blockly.Arduino.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Arduino.userFunctions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Arduino['procedures_defnoreturn'] =
    Blockly.Arduino['procedures_defreturn'];

Blockly.Arduino['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.Arduino.valueToCode(block, 'ARG' + i,
        Blockly.Arduino.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  // Generated code is for a function call as a statement is the same as a
  // function call as a value, with the addition of line ending.
  var tuple = Blockly.Arduino['procedures_callreturn'](block);
  return tuple[0] + ';\n';
};

Blockly.Arduino['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (Blockly.Arduino.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the return is triggered.
    code += Blockly.Arduino.prefixLines(
        Blockly.Arduino.injectId(Blockly.Arduino.STATEMENT_SUFFIX, block),
        Blockly.Arduino.INDENT);
  }
  if (block.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || 'null';
    code += Blockly.Arduino.INDENT + 'return ' + value + ';\n';
  } else {
    code += Blockly.Arduino.INDENT + 'return;\n';
  }
  code += '}\n';
  return code;
};
