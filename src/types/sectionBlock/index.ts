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

/**
 * Represents a section block in Slack.
 */
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
