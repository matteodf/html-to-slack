import { CheckboxOption, Confirmation, MultiselectOption, MultiselectOptionGroup, OverflowOption, PlainText, RadioOption, SelectOption, SelectOptionGroup, SlackFile } from "../compositionObjects";

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