import { parseHtml } from './parsers';
import { getBlocks, resetBlocks } from './handlers';

/**
 * Converts an HTML string to Slack blocks.
 *
 * @param {string} html - The HTML content to convert.
 * @returns {Block[]} Block[] - An array of Slack blocks.
 */
function convertHtmlToSlackBlocks(html: string) {
  if (typeof html !== 'string') {
    console.error('Invalid input: HTML content should be a string.');
    return [];
  }

  try {
    resetBlocks(); // Ensure the state is clean before parsing
    parseHtml(html);
    return getBlocks();
  } catch (error) {
    console.error('Error converting HTML to Slack blocks:', error);
    return []; // Return an empty array on error
  }
}

export default convertHtmlToSlackBlocks;
