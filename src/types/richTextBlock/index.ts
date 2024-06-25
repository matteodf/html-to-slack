/**
 * This file contains all the types for Slack rich text block.
 *
 * For more information about rich text block, see
 * https://api.slack.com/reference/block-kit/blocks#rich_text
 */

export type Channel = {
  type: 'channel';
  channel_id: string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    strike?: boolean;
    highlight?: string;
    client_highlight?: string;
    unlink?: boolean;
  };
};

export type Emoji = {
  type: 'emoji';
  name: string;
};

export type Link = {
  type: 'link';
  url: string;
  text?: string;
  unsafe?: boolean;
  style?: {
    bold?: boolean;
    italic?: boolean;
    strike?: boolean;
    code?: boolean;
  };
};

export type RichText = {
  type: 'text';
  text: string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    strike?: boolean;
    code?: boolean;
  };
};

export type User = {
  type: 'user';
  user_id: string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    strike?: boolean;
    highlight?: string;
    client_highlight?: string;
    unlink?: boolean;
  };
};

export type Usergroup = {
  type: 'usergroup';
  usergroup_id: string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    strike?: boolean;
    highlight?: string;
    client_highlight?: string;
    unlink?: boolean;
  };
};

export type RichTextElement =
  | Channel
  | Emoji
  | Link
  | RichText
  | User
  | Usergroup;

export type RichTextSection = {
  type: 'rich_text_section';
  elements: RichTextElement[];
};

export type RichTextList = {
  type: 'rich_text_list';
  style: 'bullet' | 'ordered';
  elements: RichTextSection[];
  indent?: number;
  offset?: number;
  border?: number;
};

export type RichTextPreformatted = {
  type: 'rich_text_preformatted';
  elements: RichTextElement[];
  border?: number;
};

export type RichTextQuote = {
  type: 'rich_text_quote';
  elements: RichTextElement[];
  border?: number;
};

export type RichTextBlock = {
  type: 'rich_text';
  elements: (
    | RichTextSection
    | RichTextList
    | RichTextPreformatted
    | RichTextQuote
  )[];
  block_id?: string;
};
