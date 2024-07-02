import { parseDocument } from 'htmlparser2';
import { DomUtils } from 'htmlparser2';
import { Element as DomElement } from 'domhandler';
import { HeaderBlock } from '../types/headerBlock';
import { ImageBlock } from '../types/imageBlock';
import {
  RichTextBlock,
  RichTextList,
  RichTextPreformatted,
  RichTextQuote,
  RichTextSection,
} from '../types/richTextBlock';

export function linearizeLists(input: string): string {
  const document = parseDocument(input);
  const result: string[] = [];

  function processList(listElement: DomElement, indentLevel: number): void {
    const listType = listElement.tagName;
    const listItems: string[] = [];

    DomUtils.getChildren(listElement).forEach((child) => {
      if (DomUtils.isTag(child) && child.tagName === 'li') {
        const listItemContent = DomUtils.getInnerHTML(child)
          .trim()
          .replace(/<ul[\s\S]*?<\/ul>/g, '')
          .replace(/<ol[\s\S]*?<\/ol>/g, '')
          .replace(/<li[\s\S]*?<\/li>/g, '');
        listItems.push(`<li>${listItemContent}</li>`);

        const nestedList = DomUtils.getChildren(child).find(
          (nestedChild) =>
            DomUtils.isTag(nestedChild) &&
            (nestedChild.tagName === 'ul' || nestedChild.tagName === 'ol')
        );
        if (nestedList) {
          result.push(
            `<${listType} indent=${indentLevel}>${listItems.join('')}</${listType}>`
          );
          listItems.length = 0;
          processList(nestedList as DomElement, indentLevel + 1);
        }
      }
    });

    if (listItems.length > 0) {
      result.push(
        `<${listType} indent=${indentLevel}>${listItems.join('')}</${listType}>`
      );
    }
  }

  DomUtils.getElementsByTagName('ul', document)
    .concat(DomUtils.getElementsByTagName('ol', document))
    .forEach((element) => {
      const parent = DomUtils.getParent(element);

      if (
        parent &&
        DomUtils.isTag(parent) &&
        (parent.tagName === 'li' ||
          parent.tagName === 'ul' ||
          parent.tagName === 'ol')
      )
        return;
      processList(element, 0);
      const newElement = result.join('');
      input = input.replace(DomUtils.getOuterHTML(element), newElement);
      result.length = 0;
    });

  return input;
}

export function blockBuilder(
  array: (
    | RichTextSection
    | RichTextList
    | RichTextPreformatted
    | RichTextQuote
    | HeaderBlock
    | ImageBlock
  )[]
) {
  const blocks = [];
  let richTextBlocks: RichTextBlock = {
    type: 'rich_text',
    elements: [],
  };
  for (let i = 0; i < array.length; i++) {
    const block = array[i];
    if (block.type === 'image' || block.type === 'header') {
      if (richTextBlocks.elements.length > 0) {
        blocks.push(richTextBlocks);
        richTextBlocks = {
          type: 'rich_text',
          elements: [],
        };
      }
      blocks.push(block);
    } else {
      richTextBlocks.elements.push(block);
    }
  }
  if (richTextBlocks.elements.length > 0) {
    blocks.push(richTextBlocks);
  }
  return blocks;
}
