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
  // Create a temporary container to parse the input HTML
  const document = parseDocument(input);
  const result: string[] = [];

  function processList(element: DomElement, indent: number): void {
    const tagName = element.tagName;

    const items: string[] = [];
    DomUtils.getChildren(element).forEach((child) => {
      if (DomUtils.isTag(child) && child.tagName === 'li') {
        items.push(
          `<li>${DomUtils.getInnerHTML(child)
            .trim()
            .replace(/<ul[\s\S]*?<\/ul>/g, '')
            .replace(/<ol[\s\S]*?<\/ol>/g, '')}</li>`
        );

        // Check for nested lists
        const nestedList = DomUtils.getChildren(child).find(
          (nested) =>
            DomUtils.isTag(nested) &&
            (nested.tagName === 'ul' || nested.tagName === 'ol')
        );
        if (nestedList) {
          result.push(
            `<${tagName} indent=${indent}>${items.join('')}</${tagName}>`
          );
          items.length = 0; // Clear items array
          processList(nestedList as DomElement, indent + 1);
        }
      }
    });

    if (items.length > 0) {
      result.push(
        `<${tagName} indent=${indent}>${items.join('')}</${tagName}>`
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
