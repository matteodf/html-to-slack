/**
 * This file contains all the types for Slack block elements.
 *
 * For more information about block elements, see
 * https://api.slack.com/reference/block-kit/block-elements
 */

import {
  CheckboxOption,
  Confirmation,
  MultiselectOption,
  MultiselectOptionGroup,
  OverflowOption,
  PlainText,
  RadioOption,
  SelectOption,
  SelectOptionGroup,
  SlackFile,
} from '../compositionObjects';

export type Button = {
  type: 'button';
  text: PlainText;
  action_id?: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
  confirm?: Confirmation;
  accessibility_label?: string;
};

export type Checkbox = {
  type: 'checkboxes';
  options: CheckboxOption[];
  action_id?: string;
  initial_options?: CheckboxOption[];
  confirm?: Confirmation;
  focus_on_load?: boolean;
};

export type DatePicker = {
  type: 'datepicker';
  action_id?: string;
  initial_date?: string;
  confirm?: Confirmation;
  focus_on_load?: boolean;
  placeholder?: PlainText;
};

export type ImageURL = {
  type: 'image';
  alt_text: string;
  image_url: string;
};

export type ImageFile = {
  type: 'image';
  alt_text: string;
  slack_file: SlackFile;
};

export type Image = ImageURL | ImageFile;

export type Multiselect = {
  type: 'multi_static_select';
  options: MultiselectOption[];
  action_id?: string;
  options_groups: MultiselectOptionGroup[];
  initial_options?: MultiselectOption[];
  confirm?: Confirmation;
  max_selected_items?: number;
  focus_on_load?: boolean;
  placeholder?: PlainText;
};

export type Overflow = {
  type: 'overflow';
  options: OverflowOption[];
  action_id?: string;
  confirm?: Confirmation;
};

export type Radio = {
  type: 'radio_buttons';
  options: RadioOption[];
  action_id?: string;
  initial_option?: RadioOption;
  confirm?: Confirmation;
  focus_on_load?: boolean;
};

export type Select = {
  type: 'static_select';
  options: SelectOption[];
  action_id?: string;
  options_groups: SelectOptionGroup[];
  initial_option?: SelectOption;
  confirm?: Confirmation;
  focus_on_load?: boolean;
  placeholder?: PlainText;
};

export type Timepicker = {
  type: 'timepicker';
  action_id?: string;
  initial_time?: string;
  confirm?: Confirmation;
  focus_on_load?: boolean;
  placeholder?: PlainText;
  timezone?: string;
};
