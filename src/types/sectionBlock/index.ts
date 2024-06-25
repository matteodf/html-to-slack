/**
 * This file contains all the types for Slack section block.
 *
 * For more information about section block, see
 * https://api.slack.com/reference/block-kit/blocks#section
 */

import {
  Button,
  Checkbox,
  DatePicker,
  Image,
  Multiselect,
  Overflow,
  Radio,
  Select,
  Timepicker,
} from '../blockElements';

export type SectionBlock = {
  type: 'section';
  text: Text;
  block_id?: string;
  fields?: Text[];
  accessory?:
    | Button
    | Checkbox
    | DatePicker
    | Image
    | Multiselect
    | Overflow
    | Radio
    | Select
    | Timepicker;
};
