import { PlainText } from '../compositionObjects';

/**
 * Represents a header block in Slack.
 */
export type HeaderBlock = {
  type: 'header';
  text: PlainText;
  block_id?: string;
};
