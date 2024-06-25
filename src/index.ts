import { parseHtml } from './parsers';
import { HeaderBlock } from './types/headerBlock';
import { ImageBlockUrl, ImageBlockSlack } from './types/imageBlock';
import { RichTextBlock } from './types/richTextBlock';

/**
 * Converts an HTML string to Slack blocks.
 *
 * @param {string} html - The HTML content to convert.
 * @returns {Block[]} Block[] - An array of Slack blocks.
 */
function convertHtmlToSlackBlocks(
  html: string
): (RichTextBlock | HeaderBlock | ImageBlockUrl | ImageBlockSlack)[] {
  if (typeof html !== 'string') {
    console.error('Invalid input: HTML content should be a string.');
    return [];
  }

  try {
    return parseHtml(html);
  } catch (error) {
    console.error('Error converting HTML to Slack blocks:', error);
    return []; // Return an empty array on error
  }
}

export default convertHtmlToSlackBlocks;
