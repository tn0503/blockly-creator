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

goog.provide('Blockly.Blocks.mygame');  // Deprecated
goog.provide('Blockly.Constants.Mygame');

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

Blockly.Blocks['mg_begin'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_GENERAL_MSG_BEGIN);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

Blockly.Blocks['mg_width'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MYGAME_GENERAL_MSG_SWIDTH);
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour("%{BKY_MYGAME_HUE}");
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['mg_height'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MYGAME_GENERAL_MSG_SHEIGHT);
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour("%{BKY_MYGAME_HUE}");
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['mg_clear_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MYGAME_GENERAL_MSG_CLEAR);
    this.appendValueInput("W/B")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("W/B");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("%{BKY_MYGAME_HUE}");
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['mg_flash'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.MYGAME_GENERAL_MSG_FLASH);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("%{BKY_MYGAME_HUE}");
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['mg_update'] = {
    init: function() {
    this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_GENERAL_MSG_UPDATE);
    this.appendDummyInput()
          .appendField(new Blockly.FieldNumber("50"), "INTERVAL");
    this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_GENERAL_MSG_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("%{BKY_MYGAME_HUE}");
    this.setTooltip('');
    this.setHelpUrl('');
    }
  };

  Blockly.Blocks['mg_draw_pixel'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_PIXEL);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_draw_line'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_LINE);
      this.appendValueInput("X0")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X0);
      this.appendValueInput("Y0")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y0);
      this.appendValueInput("X1")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X1);
      this.appendValueInput("Y1")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y1);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_draw_fast_vline'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_VLINE);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("H")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_LENGTH);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_draw_fast_hline'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_HLINE);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("W")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_LENGTH);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_draw_rect'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_RECT);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("W")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WIDTH);
      this.appendValueInput("H")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_HEIGHT);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_fill_rect'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_FRECT);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("W")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WIDTH);
      this.appendValueInput("H")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_HEIGHT);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_draw_circle'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_CIRCLE);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("R")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_RAD);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_fill_circle'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_FCIRCLE);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("R")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_RAD);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_draw_round_rect'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_RRECT);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("W")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WIDTH);
      this.appendValueInput("H")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_HEIGHT);
      this.appendValueInput("R")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_RAD);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_fill_round_rect'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_FRRECT);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("W")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WIDTH);
      this.appendValueInput("H")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_HEIGHT);
      this.appendValueInput("R")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_RAD);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_draw_ellipse'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(Blockly.Msg.MYGAME_DRAW_MSG_ELLIPSE);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      /*this.appendValueInput("R")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_RAD);*/
      this.appendValueInput("A")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_XAXIS);
      this.appendValueInput("B")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_YAXIS);
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_fill_ellipse'] = {
      init: function() {
        this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_FELLIPSE);
        this.appendValueInput("X")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
        this.appendValueInput("Y")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
        /*this.appendValueInput("R")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MYGAME_DRAW_MSG_RAD);*/
        this.appendValueInput("A")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MYGAME_DRAW_MSG_XAXIS);
        this.appendValueInput("B")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MYGAME_DRAW_MSG_YAXIS);
        this.appendValueInput("W/B")
            .setCheck("Boolean")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("%{BKY_MYGAME_HUE}");
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };
  
  Blockly.Blocks['mg_draw_bitmap'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_DRAWBMP);
      this.appendValueInput("X")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
      this.appendValueInput("Y")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
      this.appendValueInput("W")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_XWIDTH);
      this.appendValueInput("H")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_XHEIGHT);
      /*this.appendValueInput("BMP")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_BMP);*/
    this.appendDummyInput("BMP")
        .appendField(Blockly.Msg.MYGAME_DRAW_MSG_BMP)
        .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_GET_ITEM), 'BMP');
      this.appendValueInput("W/B")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['mg_create_bitmap'] = {
      init: function() {
          this.appendDummyInput()
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_CBMP)
              .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_GET_ITEM), 'VAR')
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_HEIGHT)
              .appendField(new Blockly.FieldNumber(8, 1, 16, null, this.handleRowNumber.bind(this)), "rowInput")
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WIDTH)
              .appendField(new Blockly.FieldNumber(8, 1, 16, null, this.handleColNumber.bind(this)), "colInput");
          this.rowNum = this.getFieldValue('rowInput');
          this.oldRow = this.getFieldValue('rowInput');
          this.colNum = this.getFieldValue('colInput');
          this.oldCol = this.getFieldValue('colInput');
          this.updateShape();
          this.setInputsInline(false);
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour("%{BKY_MYGAME_HUE}");
          this.setTooltip('');
          this.setHelpUrl('');
      },
      handleRowNumber: function (newNum) {
          if(this.rowNum !== newNum) {
              this.oldRow = this.rowNum;
              this.rowNum = newNum;
              this.updateShape();
          }
      },
      handleColNumber: function (newNum) {
          if(this.colNum !== newNum) {
              this.colNum = newNum;
              this.updateShape();
          }
      },
      updateShape: function () {
          for (var i = 0; i < this.oldRow; i++) {
              this.removeInput('appendToMe'+String(i));
          }
          for (var i = 0; i < this.rowNum; i++) {
              if (this.getInput('appendToMe'+String(i))) {
                  this.removeInput('appendToMe'+String(i));
              }
              var input = this.appendDummyInput('appendToMe'+String(i));
              for (var j = 0; j < this.colNum; j++) {
                  input.appendField(new Blockly.FieldCheckbox("FALSE"), "e"+String(i)+"_"+String(j));
              }
          }
          this.oldRow = this.rowNum;
      },
      mutationToDom: function () {
          var container = document.createElement('mutation');
          container.setAttribute('row_num', this.rowNum);
          container.setAttribute('col_num', this.colNum);
          return container;
      },
      domToMutation: function (xmlElement) {
          var rowN = xmlElement.getAttribute('row_num');
          var colN = xmlElement.getAttribute('col_num');
          if(rowN && rowN !== 'undefined') {
              this.rowNum = rowN;
          }
          if(colN && colN !== 'undefined') {
              this.colNum = colN;
          }
          this.updateShape();
      }
  };
  
  Blockly.Blocks['mg_draw_string'] = {
      init: function() {
          this.appendDummyInput()
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_DRAWSTRING);
          this.appendValueInput("X")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
          this.appendValueInput("Y")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
          this.appendValueInput("C")
              //.setCheck("Text")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_STRING);
          this.appendValueInput("S")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_SIZE);
          this.appendValueInput("W/B")
              .setCheck("Boolean")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
          this.setInputsInline(true);
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour("%{BKY_MYGAME_HUE}");
          this.setTooltip('');
          this.setHelpUrl('');
      }
  };
  
  Blockly.Blocks['mg_draw_char'] = {
      init: function() {
          this.appendDummyInput()
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_DRAWCHAR);
          this.appendValueInput("X")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
          this.appendValueInput("Y")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
          this.appendValueInput("C")
              //.setCheck("Text")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_CHAR);
          this.appendValueInput("S")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_SIZE);
          this.appendValueInput("W/B")
              .setCheck("Boolean")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
          this.setInputsInline(true);
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour("%{BKY_MYGAME_HUE}");
          this.setTooltip('');
          this.setHelpUrl('');
      }
  };
  
  Blockly.Blocks['mg_draw_num'] = {
      init: function() {
          this.appendDummyInput()
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_DRAWNUM);
          this.appendValueInput("X")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_X);
          this.appendValueInput("Y")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_Y);
          this.appendValueInput("C")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_NUM);
          this.appendValueInput("S")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_SIZE);
          this.appendValueInput("W/B")
              .setCheck("Boolean")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_WB);
          this.setInputsInline(true);
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour("%{BKY_MYGAME_HUE}");
          this.setTooltip('');
          this.setHelpUrl('');
      }
  };
  
  Blockly.Blocks['mg_button_check'] = {
      init: function() {
          this.appendDummyInput()
              .appendField(Blockly.Msg.MYGAME_BTN_MSG_BTN)
              .appendField(new Blockly.FieldDropdown([["A", "A_BTN"], ["B", "B_BTN"], ["U", "U_BTN"], ["D", "D_BTN"], ["L", "L_BTN"], ["R", "R_BTN"]]), "BTN")
              .appendField(Blockly.Msg.MYGAME_BTN_MSG_STATE);
          this.setInputsInline(false);
          this.setOutput(true, "Boolean");
          this.setColour("%{BKY_MYGAME_HUE}");
          this.setTooltip('');
          this.setHelpUrl('');
      }
  };
  
  Blockly.Blocks['mg_button_pressed'] = {
      init: function() {
          this.appendDummyInput()
              .appendField(Blockly.Msg.MYGAME_DRAW_MSG_BTN)
              .appendField(new Blockly.FieldDropdown([["A", "A_BTN"], ["B", "B_BTN"], ["U", "U_BTN"], ["D", "D_BTN"], ["L", "L_BTN"], ["R", "R_BTN"]]), "BTN")
              .appendField(Blockly.Msg.MYGAME_BTN_MSG_PRESSED);
          this.setInputsInline(false);
          this.setOutput(true, "Boolean");
          this.setColour("%{BKY_MYGAME_HUE}");
          this.setTooltip('');
          this.setHelpUrl('');
      }
  };
  
  Blockly.Blocks['mg_array_create'] = {
      init: function() {
          this.appendDummyInput()
              .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_CARRAY)
              .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_GET_ITEM), 'VAR')
              .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_ROW)
              .appendField(new Blockly.FieldNumber(8, 1, 24, null, this.handleRowNumber.bind(this)), "rowInput")
              .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_COL)
              .appendField(new Blockly.FieldNumber(8, 1, 24, null, this.handleColNumber.bind(this)), "colInput")
              .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_TYPE)
              .appendField(new Blockly.FieldDropdown([["boolean", "boolean"], ["8bit", "int8_t"], ["16bit", "int16_t"]]), "TYPE");
          this.rowNum = this.getFieldValue('rowInput');
          this.oldRow = this.getFieldValue('rowInput');
          this.colNum = this.getFieldValue('colInput');
          this.oldCol = this.getFieldValue('colInput');
          this.updateShape();
          this.setInputsInline(false);
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour("%{BKY_MYGAME_HUE}");
          this.setTooltip('');
          this.setHelpUrl('');
      },
      handleRowNumber: function (newNum) {
          if(this.rowNum !== newNum) {
              this.oldRow = this.rowNum;
              this.rowNum = newNum;
              this.updateShape();
          }
      },
      handleColNumber: function (newNum) {
          if(this.colNum !== newNum) {
              this.colNum = newNum;
              this.updateShape();
          }
      },
      updateShape: function () {
          for (var i = 0; i < this.oldRow; i++) {
              this.removeInput('appendToMe'+String(i));
          }
          for (var i = 0; i < this.rowNum; i++) {
              if (this.getInput('appendToMe'+String(i))) {
                  this.removeInput('appendToMe'+String(i));
              }
              var input = this.appendDummyInput('appendToMe'+String(i));
              for (var j = 0; j < this.colNum; j++) {
                  input.appendField(new Blockly.FieldNumber(0), "e"+String(i)+"-"+String(j));
              }
          }
          this.oldRow = this.rowNum;
      },
      mutationToDom: function () {
          var container = document.createElement('mutation');
          container.setAttribute('row_num', this.rowNum);
          container.setAttribute('col_num', this.colNum);
          return container;
      },
      domToMutation: function (xmlElement) {
          var rowN = xmlElement.getAttribute('row_num');
          var colN = xmlElement.getAttribute('col_num');
          if(rowN && rowN !== 'undefined') {
              this.rowNum = rowN;
          }
          if(colN && colN !== 'undefined') {
              this.colNum = colN;
          }
          this.updateShape();
      }
  };

  Blockly.Blocks['mg_array_set'] = {
    //helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function() {
        this.appendDummyInput()
        .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_SET);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_ARRAY)
          .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_GET_ITEM), 'VAR');
    this.appendValueInput("Row", 'Number')
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_ROW);
    this.appendValueInput("Col", 'Number')
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_COL);
    this.appendValueInput("Val", 'Number')
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_VALUE);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
    }
  };

  Blockly.Blocks['mg_array_get'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_GET);
      this.appendDummyInput()
          .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_ARRAY)
            .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_GET_ITEM), 'VAR');
      this.appendValueInput("Row", 'Number')
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_ROW);
      this.appendValueInput("Col", 'Number')
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.MYGAME_ARRAY_MSG_COL);
        
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour("%{BKY_MYGAME_HUE}");
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };