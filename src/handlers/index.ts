import { Attribs, Block } from '../types';
import { cleanText } from '../utils';

const blocks: Block[] = [];
let currentText = '';
let inList = false;
let listLevel = 0;
const listSymbols = ['•', '◦', '‣'];
let insidePre = false;

/**
 * Handles opening HTML tags.
 * @param {string} tagname - The name of the HTML tag.
 * @param {Attribs} attribs - The attributes of the HTML tag.
 */
export function handleOpenTag(tagname: string, attribs: Attribs) {
  if (typeof tagname !== 'string' || typeof attribs !== 'object') {
    throw new Error('Invalid arguments for handleOpenTag');
  }

  switch (tagname) {
    case 'b':
    case 'strong':
      currentText += '*';
      break;
    case 'i':
    case 'em':
      currentText += '_';
      break;
    case 's':
    case 'del':
      currentText += '~';
      break;
    case 'code':
      currentText += '`';
      break;
    case 'pre':
      insidePre = true;
      currentText += '```';
      break;
    case 'a':
      if (attribs.href) currentText += `<${attribs.href}|`;
      break;
    case 'blockquote':
      currentText += '> ';
      break;
    case 'ul':
      handleListOpen();
      break;
    case 'li':
      handleListItemOpen();
      break;
    case 'p':
      addTextBlock();
      break;
    case 'br':
      currentText += '\n';
      break;
    default:
      if (tagname.match(/^h[1-6]$/)) {
        addTextBlock();
      }
  }
}

/**
 * Handles closing HTML tags.
 *
 * @param {string} tagname - The name of the HTML tag.
 */
export function handleCloseTag(tagname: string) {
  if (typeof tagname !== 'string') {
    throw new Error('Invalid argument for handleCloseTag');
  }

  switch (tagname) {
    case 'b':
    case 'strong':
      currentText += '*';
      break;
    case 'i':
    case 'em':
      currentText += '_';
      break;
    case 's':
    case 'del':
      currentText += '~';
      break;
    case 'code':
      currentText += '`';
      break;
    case 'pre':
      currentText += '```';
      addTextBlock();
      insidePre = false;
      break;
    case 'a':
      currentText += '>';
      break;
    case 'blockquote':
      currentText += '\n';
      addTextBlock();
      break;
    case 'ul':
      handleListClose();
      addTextBlock();
      break;
    case 'li':
      currentText += '\n';
      break;
    case 'p':
      addTextBlock();
      break;
    default:
      if (tagname.match(/^h[1-6]$/)) {
        addHeadingBlock();
      }
  }
}

/**
 * Handles the opening of a list.
 */
export function handleListOpen() {
  inList = true;
  listLevel++;
}

/**
 * Handles the closing of a list.
 */
function handleListClose() {
  listLevel--;
  if (listLevel === 0) {
    inList = false;
  }
}

/**
 * Handles the opening of a list item.
 */
function handleListItemOpen() {
  if (currentText.trim() !== '') {
    currentText += '\n';
  }
  currentText +=
    '\t\t'.repeat(listLevel - 1) +
    listSymbols[(listLevel - 1) % listSymbols.length] +
    ' ';
}

/**
 * Adds a text block to the blocks array.
 */
export function addTextBlock() {
  if (currentText.trim() !== '' && !(currentText.trim() === '•' && inList)) {
    let cleanedText;
    try {
      cleanedText = cleanText(currentText, insidePre);
    } catch (error) {
      console.error('Error adding text block:', error);
      cleanedText = currentText; // Use original text if cleaning fails
    }
    if (cleanedText.trim() !== '') {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: cleanedText,
        },
      });
    }
    currentText = '';
  }
}

/**
 * Adds a heading block to the blocks array.
 */
export function addHeadingBlock() {
  try {
    if (currentText.trim() !== '') {
      blocks.push({
        type: 'header',
        text: {
          type: 'plain_text',
          text: currentText.trim(),
        },
      });
      currentText = '';
    }
  } catch (error) {
    console.error('Error adding heading block:', error);
  }
}

/**
 * Handles text content within HTML tags.
 *
 * @param {string} text - The text content.
 */
export function handleText(text: string) {
  if (typeof text !== 'string') {
    throw new Error('Invalid argument for handleText');
  }
  currentText += text;
}

/**
 * Gets the array of Slack blocks.
 *
 * @returns {Block[]} - The array of Slack blocks.
 */
export function getBlocks(): Block[] {
  return blocks;
}

/**
 * Resets the state of blocks and related variables.
 */
export function resetBlocks() {
  blocks.length = 0;
  currentText = '';
  inList = false;
  listLevel = 0;
}
