/**
 * This file contains all the types for Slack composition objects.
 *
 * For more information about composition objects, see
 * https://api.slack.com/reference/block-kit/composition-objects
 */

export type PlainText = {
  type: 'plain_text';
  text: string;
  emoji?: boolean;
};

export type MarkdownText = {
  type: 'mrkdwn';
  text: string;
  verbatim?: boolean;
};

export type Text = PlainText | MarkdownText;

export type Confirmation = {
  title: PlainText;
  text: PlainText;
  confirm: PlainText;
  deny: PlainText;
  style?: 'primary' | 'danger';
};

export type OverflowOption = {
  text: PlainText;
  value: string;
  description?: PlainText;
  url?: string;
};

export type SelectOption = {
  text: PlainText;
  value: string;
  description?: PlainText;
};

export type MultiselectOption = {
  text: PlainText;
  value: string;
  description?: PlainText;
};

export type RadioOption = {
  text: PlainText | MarkdownText;
  value: string;
  description?: PlainText | MarkdownText;
};

export type CheckboxOption = {
  text: PlainText | MarkdownText;
  value: string;
  description?: PlainText | MarkdownText;
};

export type SelectOptionGroup = {
  label: PlainText;
  options: SelectOption[];
};

export type MultiselectOptionGroup = {
  label: PlainText;
  options: MultiselectOption[];
};

export type SlackFileByURL = {
  url: string;
};

export type SlackFileByID = {
  id: string;
};

export type SlackFile = SlackFileByURL | SlackFileByID;
