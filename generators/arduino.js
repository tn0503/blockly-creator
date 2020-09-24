/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper functions for generating C for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Arduino');

goog.require('Blockly.Generator');
goog.require('Blockly.utils.global');
goog.require('Blockly.utils.string');


/**
 * C code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Arduino.addReservedWords(
    // https://developer.mozilla.org/en-US/docs/Web/C/Reference/Lexical_grammar#Keywords
    'break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,' +
    'enum,' +
    'implements,interface,let,package,private,protected,public,static,' +
    'await,' +
    'null,true,false,' +
    // Magic variable.
    'arguments,' +
    // Everything in the current environment (835 items in Chrome, 104 in Node).
    Object.getOwnPropertyNames(Blockly.utils.global).join(','));

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/C/Reference/Operators/Operator_Precedence
 */
Blockly.Arduino.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.Arduino.ORDER_NEW = 1.1;            // new
Blockly.Arduino.ORDER_MEMBER = 1.2;         // . []
Blockly.Arduino.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.Arduino.ORDER_INCREMENT = 3;        // ++
Blockly.Arduino.ORDER_DECREMENT = 3;        // --
Blockly.Arduino.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.Arduino.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.Arduino.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.Arduino.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.Arduino.ORDER_TYPEOF = 4.5;         // typeof
Blockly.Arduino.ORDER_VOID = 4.6;           // void
Blockly.Arduino.ORDER_DELETE = 4.7;         // delete
Blockly.Arduino.ORDER_AWAIT = 4.8;          // await
Blockly.Arduino.ORDER_EXPONENTIATION = 5.0; // **
Blockly.Arduino.ORDER_MULTIPLICATION = 5.1; // *
Blockly.Arduino.ORDER_DIVISION = 5.2;       // /
Blockly.Arduino.ORDER_MODULUS = 5.3;        // %
Blockly.Arduino.ORDER_SUBTRACTION = 6.1;    // -
Blockly.Arduino.ORDER_ADDITION = 6.2;       // +
Blockly.Arduino.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.Arduino.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.Arduino.ORDER_IN = 8;               // in
Blockly.Arduino.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.Arduino.ORDER_EQUALITY = 9;         // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 10;     // &
Blockly.Arduino.ORDER_BITWISE_XOR = 11;     // ^
Blockly.Arduino.ORDER_BITWISE_OR = 12;      // |
Blockly.Arduino.ORDER_LOGICAL_AND = 13;     // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 14;      // ||
Blockly.Arduino.ORDER_CONDITIONAL = 15;     // ?:
Blockly.Arduino.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
Blockly.Arduino.ORDER_YIELD = 17;           // yield
Blockly.Arduino.ORDER_COMMA = 18;           // ,
Blockly.Arduino.ORDER_NONE = 99;            // (...)

/*
 * C Board profiles
 *
 */
var profile = {
  Arduino: {
    description: "Arduino standard-compatible board",
    digital: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    serial: 9600
  },
  Arduino_mega: {
    description: "Arduino Mega-compatible board"
    //53 digital
    //15 analog
  }
};
//set default profile to Arduino standard-compatible board
profile["default"] = profile["Arduino"];
//alert(profile.default.digital[0]);

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Arduino.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.Arduino.ORDER_LOGICAL_NOT, Blockly.Arduino.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.Arduino.ORDER_MULTIPLICATION, Blockly.Arduino.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.Arduino.ORDER_ADDITION, Blockly.Arduino.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.Arduino.ORDER_LOGICAL_AND, Blockly.Arduino.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.Arduino.ORDER_LOGICAL_OR, Blockly.Arduino.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function(workspace) {
  // Create a dictionary of definitions to be printed at the top of the sketch
  Blockly.Arduino.includes_ = Object.create(null);
  // Create a dictionary of global definitions to be printed after variables
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary of variables
  Blockly.Arduino.variables_ = Object.create(null);
  // Create a dictionary of functions from the code generator
  Blockly.Arduino.codeFunctions_ = Object.create(null);
  // Create a dictionary of functions created by the user
  Blockly.Arduino.userFunctions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions)
  Blockly.Arduino.functionNames_ = Object.create(null);
  // Create a dictionary of setups to be printed in the setup() function
  Blockly.Arduino.setups_ = Object.create(null);
  // Create a dictionary of pins to check if their use conflicts
  Blockly.Arduino.pins_ = Object.create(null);

  if (!Blockly.Arduino.variableDB_) {
    Blockly.Arduino.variableDB_ =
        new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.variableDB_.reset();
  }

  Blockly.Arduino.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.Arduino.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    //console.log(variables[i].type);
    defvars.push(Blockly.Arduino.variableDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME));
    
  }

  // Declare all of the variables.
  //if (defvars.length) {
    Blockly.Arduino.definitions_['variables'] = '';
  for (var i = 0; i < defvars.length; i++) {
    switch(variables[i].type){
      case 'Boolean':
      Blockly.Arduino.definitions_['variables'] +=
      'boolean ' + defvars[i] + ';\n';
      break;
      case 'Number':
      Blockly.Arduino.definitions_['variables'] +=
      'int16_t ' + defvars[i] + ';\n';
      break;
      /*case 'Float':
      Blockly.Arduino.definitions_['variables'] +=
      'float ' + defvars[i] + ';\n';
      break;*/
      case 'Array':
      //Blockly.Arduino.definitions_['variables'] =
      //'int ' + defvars.join() + '[][];\n';
      break;
      default:
      break;
    }
  }
};

Blockly.Arduino.finish = function(code) {
  // Indent every line.
  /*code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  code = 'void loop() \n{\n' + code + '\n}';*/

  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Arduino.definitions_) {
    var def = Blockly.Arduino.definitions_[name];
    if (def.match(/^#include/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }

  var includes = [], definitions = [], variables = [], functions = [];
  for (var name in Blockly.Arduino.includes_) {
    includes.push(Blockly.Arduino.includes_[name]);
  }
  if (includes.length) {
    includes.push('\n');
  }
  for (var name in Blockly.Arduino.definitions_) {
    definitions.push(Blockly.Arduino.definitions_[name]);
  }
  if (definitions.length) {
    definitions.push('\n');
  }
  for (var name in Blockly.Arduino.variables_) {
    variables.push(Blockly.Arduino.variables_[name]);
  }
  if (variables.length) {
    variables.push('\n');
  }
  for (var name in Blockly.Arduino.codeFunctions_) {
    functions.push(Blockly.Arduino.codeFunctions_[name]);
  }
  for (var name in Blockly.Arduino.userFunctions_) {
    functions.push(Blockly.Arduino.userFunctions_[name]);
  }
  if (functions.length) {
    functions.push('\n');
  }

  // Convert the setups dictionary into a list.
  /*var setups = [];
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }*/
  // userSetupCode added at the end of the setup function without leading spaces
  var setups = [''], userSetupCode= '';
  if (Blockly.Arduino.setups_['userSetupCode'] !== undefined) {
    userSetupCode = '\n' + Blockly.Arduino.setups_['userSetupCode'];
    delete Blockly.Arduino.setups_['userSetupCode'];
  }
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }
  if (userSetupCode) {
    setups.push(userSetupCode);
  }

  // Clean up temporary data
  delete Blockly.Arduino.includes_;
  delete Blockly.Arduino.definitions_;
  delete Blockly.Arduino.codeFunctions_;
  delete Blockly.Arduino.userFunctions_;
  delete Blockly.Arduino.functionNames_;
  delete Blockly.Arduino.setups_;
  delete Blockly.Arduino.pins_;
  Blockly.Arduino.variableDB_.reset();

  //var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n') + '\n\n';//'\nvoid setup() \n{\n  '+setups.join('\n  ') + '\n}'+ '\n\n';
  var allDefs = includes.join('\n') + definitions.join('\n') + variables.join('\n') + functions.join('\n\n');
  var setup = 'void setup() {' + setups.join('\n  ') + '\n}\n\n';
  var loop = 'void loop() {\n  ' + code.replace(/\n/g, '\n  ') + '\n}';
  
  return allDefs + setup + loop;
  //return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Adds a string of "include" code to be added to the sketch.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} includeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.Arduino.addInclude = function(includeTag, code) {
  if (Blockly.Arduino.includes_[includeTag] === undefined) {
    Blockly.Arduino.includes_[includeTag] = code;
  }
};

/**
 * Adds a string of code to be declared globally to the sketch.
 * Once it is added it will not get overwritten with new code.
 * @param {!string} declarationTag Identifier for this declaration code.
 * @param {!string} code Code to be added below the includes.
 */
Blockly.Arduino.addDeclaration = function(declarationTag, code) {
  if (Blockly.Arduino.definitions_[declarationTag] === undefined) {
    Blockly.Arduino.definitions_[declarationTag] = code;
  }
};

/**
 * Adds a string of code to declare a variable globally to the sketch.
 * Only if overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} varName The name of the variable to declare.
 * @param {!string} code Code to be added for the declaration.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the declaration overwrote a previous one.
 */
Blockly.Arduino.addVariable = function(varName, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.variables_[varName] === undefined)) {
    Blockly.Arduino.variables_[varName] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code into the Arduino setup() function. It takes an
 * identifier to not repeat the same kind of initialisation code from several
 * blocks. If overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} setupTag Identifier for the type of set up code.
 * @param {!string} code Code to be included in the setup() function.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the new setup code overwrote a previous one.
 */
Blockly.Arduino.addSetup = function(setupTag, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.Arduino.setups_[setupTag] === undefined)) {
    Blockly.Arduino.setups_[setupTag] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code as a function. It takes an identifier (meant to be the
 * function name) to only keep a single copy even if multiple blocks might
 * request this function to be created.
 * A function (and its code) will only be added on first request.
 * @param {!string} preferedName Identifier for the function.
 * @param {!string} code Code to be included in the setup() function.
 * @return {!string} A unique function name based on input name.
 */
Blockly.Arduino.addFunction = function(preferedName, code) {
  if (Blockly.Arduino.codeFunctions_[preferedName] === undefined) {
    var uniqueName = Blockly.Arduino.variableDB_.getDistinctName(
        preferedName, Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.codeFunctions_[preferedName] =
        code.replace(Blockly.Arduino.DEF_FUNC_NAME, uniqueName);
    Blockly.Arduino.functionNames_[preferedName] = uniqueName;
  }
  return Blockly.Arduino.functionNames_[preferedName];
};

/**
 * Description.
 * @param {!Blockly.Block} block Description.
 * @param {!string} pin Description.
 * @param {!string} pinType Description.
 * @param {!string} warningTag Description.
 */
Blockly.Arduino.reservePin = function(block, pin, pinType, warningTag) {
  if (Blockly.Arduino.pins_[pin] !== undefined) {
    if (Blockly.Arduino.pins_[pin] != pinType) {
      block.setWarningText(Blockly.Msg.ARD_PIN_WARN1.replace('%1', pin)
		.replace('%2', warningTag).replace('%3', pinType)
		.replace('%4', Blockly.Arduino.pins_[pin]), warningTag);
    } else {
      block.setWarningText(null, warningTag);
    }
  } else {
    Blockly.Arduino.pins_[pin] = pinType;
    block.setWarningText(null, warningTag);
  }
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped C string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} C string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Encode a string as a properly escaped multiline C string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} C string.
 * @private
 */
Blockly.Arduino.multiline_quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  var lines = string.split(/\n/g).map(Blockly.Arduino.quote_);
  return lines.join(' + \"\\n\" +\n');
};

/**
 * Common tasks for generating C from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The C code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} C code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment,
          Blockly.Arduino.COMMENT_WRAP - 3);
      commentCode += Blockly.Arduino.prefixLines(comment + '\n', '// ');
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.Arduino.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.Arduino.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.Arduino.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Arduino.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.Arduino.valueToCode(block, atId,
        Blockly.Arduino.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.Arduino.valueToCode(block, atId,
        Blockly.Arduino.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Arduino.valueToCode(block, atId,
        Blockly.Arduino.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.Arduino.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = Number(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.Arduino.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Arduino.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Arduino.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
