/**
 * Represents the attributes of an HTML tag.
 */
export interface Attribs {
  [key: string]: string;
}

/**
 * Represents plain text in Slack.
 */
export type PlainText = {
  type: 'plain_text';
  text: string;
  emoji?: boolean;
};

/**
 * Represents markdown text in Slack.
 */
export type MarkdownText = {
  type: 'mrkdwn';
  text: string;
  verbatim?: boolean;
};

/**
 * Represents text in Slack, which can be either plain text or markdown.
 */
export type Text = PlainText | MarkdownText;

/**
 * Represents a confirmation dialog in Slack.
 */
export type Confirmation = {
  title: PlainText;
  text: PlainText;
  confirm: PlainText;
  deny: PlainText;
  style?: 'primary' | 'danger';
};

/**
 * Represents an option in an overflow menu in Slack.
 */
export type OverflowOption = {
  text: PlainText;
  value: string;
  description?: PlainText;
  url?: string;
};

/**
 * Represents an option in a select menu in Slack.
 */
export type SelectOption = {
  text: PlainText;
  value: string;
  description?: PlainText;
};

/**
 * Represents an option in a multiselect menu in Slack.
 */
export type MultiselectOption = {
  text: PlainText;
  value: string;
  description?: PlainText;
};

/**
 * Represents an option in a radio button group in Slack.
 */
export type RadioOption = {
  text: PlainText | MarkdownText;
  value: string;
  description?: PlainText | MarkdownText;
};

/**
 * Represents an option in a checkbox group in Slack.
 */
export type CheckboxOption = {
  text: PlainText | MarkdownText;
  value: string;
  description?: PlainText | MarkdownText;
};

/**
 * Represents a group of select options in Slack.
 */
export type SelectOptionGroup = {
  label: PlainText;
  options: SelectOption[];
};

/**
 * Represents a group of multiselect options in Slack.
 */
export type MultiselectOptionGroup = {
  label: PlainText;
  options: MultiselectOption[];
};

/**
 * Represents a Slack file that can be referenced by URL.
 */
export type SlackFileByURL = {
  url: string;
};

/**
 * Represents a Slack file that can be referenced by ID.
 */
export type SlackFileByID = {
  id: string;
};

/**
 * Represents a Slack file, which can be referenced either by URL or by ID.
 */
export type SlackFile = SlackFileByURL | SlackFileByID;

/**
 * Represents a button element in Slack.
 */
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

/**
 * Represents a checkbox group in Slack.
 */
export type Checkbox = {
  type: 'checkboxes';
  options: CheckboxOption[];
  action_id?: string;
  initial_options?: CheckboxOption[];
  confirm?: Confirmation;
  focus_on_load?: boolean;
};

/**
 * Represents a date picker element in Slack.
 */
export type DatePicker = {
  type: 'datepicker';
  action_id?: string;
  initial_date?: string;
  confirm?: Confirmation;
  focus_on_load?: boolean;
  placeholder?: PlainText;
};

/**
 * Represents an image element referenced by URL in Slack.
 */
export type ImageURL = {
  type: 'image';
  alt_text: string;
  image_url: string;
};

/**
 * Represents an image element referenced by a Slack file in Slack.
 */
export type ImageFile = {
  type: 'image';
  alt_text: string;
  slack_file: SlackFile;
};

/**
 * Represents an image element in Slack, which can be referenced either by URL or by a Slack file.
 */
export type Image = ImageURL | ImageFile;

/**
 * Represents a multiselect menu in Slack.
 */
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

/**
 * Represents an overflow menu in Slack.
 */
export type Overflow = {
  type: 'overflow';
  options: OverflowOption[];
  action_id?: string;
  confirm?: Confirmation;
};

/**
 * Represents a radio button group in Slack.
 */
export type Radio = {
  type: 'radio_buttons';
  options: RadioOption[];
  action_id?: string;
  initial_option?: RadioOption;
  confirm?: Confirmation;
  focus_on_load?: boolean;
};

/**
 * Represents a static select menu in Slack.
 */
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

/**
 * Represents a time picker element in Slack.
 */
export type Timepicker = {
  type: 'timepicker';
  action_id?: string;
  initial_time?: string;
  confirm?: Confirmation;
  focus_on_load?: boolean;
  placeholder?: PlainText;
  timezone?: string;
};

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

/**
 * Represents a header block in Slack.
 */
export type HeaderBlock = {
  type: 'header';
  text: PlainText;
  block_id?: string;
};

/**
 * Represents a Slack block element, which can be a section or a header.
 */
export type Block = SectionBlock | HeaderBlock;
