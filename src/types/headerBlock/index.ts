/**
 * This file contains all the types for Slack header block.
 *
 * For more information about header block, see
 * https://api.slack.com/reference/block-kit/blocks#header
 */

import { PlainText } from '../compositionObjects';

export type HeaderBlock = {
  type: 'header';
  text: PlainText;
  block_id?: string;
};
