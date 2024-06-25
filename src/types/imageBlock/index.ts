import { PlainText } from '../compositionObjects';

export type ImageBlockUrl = {
  type: 'image';
  alt_text: string;
  image_url: string;
  title?: PlainText;
  block_id?: string;
};

export type ImageBlockSlack = {
  type: 'image';
  alt_text: string;
  slack_file: {
    url?: string;
    id?: string;
  };
  title?: PlainText;
  block_id?: string;
};

export type ImageBlock = ImageBlockUrl | ImageBlockSlack;
