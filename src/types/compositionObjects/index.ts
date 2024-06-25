
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