import { Parser } from 'htmlparser2';
import { Attribs } from '../types';
import {
  addTextBlock,
  handleCloseTag,
  handleOpenTag,
  handleText,
} from '../handlers';

/**
 * Preprocesses HTML content to handle content inside and outside of <pre> tags separately.
 *
 * @param {string} html - The HTML content to preprocess.
 * @returns {string} - The preprocessed HTML content.
 */
export function preprocessHtmlContent(html: string): string {
  try {
    // Split the HTML by <pre> tags to separately handle content inside and outside of <pre> tags
    return html
      .split(/(<\/?pre[^>]*>)/g)
      .map((segment, index, array) => {
        // If the segment is a <pre> tag or its content, return it without changes
        if (
          array[index - 1]?.startsWith('<pre') &&
          array[index + 1].startsWith('</pre')
        ) {
          return segment;
        }

        // Otherwise, apply the preprocessing to the non-<pre> content
        return segment.replace(/>([^<]*)</g, (match, p1) => {
          // Check if the p1 starts with a newline character
          if (p1.startsWith('\n')) {
            // If it starts with a newline, remove the newline and leading whitespace
            return '>' + p1.replace(/^\n\s*/, '') + '<';
          } else {
            // Otherwise, replace newline characters followed by spaces with a single space
            return '>' + p1.replace(/\n\s+/g, ' ') + '<';
          }
        });
      })
      .join('');
  } catch (error) {
    console.error('Error preprocessing HTML content:', error);
    return html; // Return original HTML if preprocessing fails
  }
}

/**
 * Parses HTML content and converts it to Slack blocks.
 *
 * @param {string} html - The HTML content to parse.
 */
export function parseHtml(html: string) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : html; // Extract body content if present, otherwise use the entire HTML

  const preprocessedHtml = preprocessHtmlContent(bodyHtml); // Preprocess the HTML content

  const parser = new Parser(
    {
      onopentag(tagname: string, attribs: Attribs) {
        try {
          handleOpenTag(tagname, attribs);
        } catch (error) {
          console.error(`Error handling open tag <${tagname}>:`, error);
        }
      },
      ontext(text: string) {
        try {
          handleText(text);
        } catch (error) {
          console.error('Error handling text:', error);
        }
      },
      onclosetag(tagname: string) {
        try {
          handleCloseTag(tagname);
        } catch (error) {
          console.error(`Error handling close tag </${tagname}>:`, error);
        }
      },
    },
    { decodeEntities: true }
  );

  try {
    parser.write(preprocessedHtml);
    parser.end();
    addTextBlock();
  } catch (error) {
    console.error('Error parsing HTML:', error);
  }
}
