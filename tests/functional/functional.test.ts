import convertHtmlToSlackBlocks from '../../src/index';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Functional Tests', () => {
  it('should convert a full HTML document to Slack blocks', () => {
    const html = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Sample HTML</title>
        </head>
        <body>
            <h1>Welcome to the Sample Page</h1>
            <p>
                This is an example paragraph to test <b>bold</b>, <i>italic</i>, and <code>inline code</code> formatting.
            </p>
            <p>Here is a link to <a href="http://example.com">Example</a> website.</p>
            <h2>List of Items</h2>
            <ul>
            <li>First item</li>
            <li>Second item with a <a href="http://example.com/item">link</a></li>
            <li>
                Third item
                <ul>
                    <li>Nested item 1</li>
                    <li>Nested item 2</li>
                </ul>
            </li>
            </ul>
            <h2>Code Block Example</h2>
            <pre>
            function helloWorld() {
              console.log("Hello, world!");
            }
            </pre>
            <h2>Blockquote Example</h2>
            <blockquote>
              This is a blockquote to test the blockquote formatting.
            </blockquote>
            <h2>Image Example</h2>
            <p>Here is an image for testing:</p>
            <img src="http://example.com/image.jpg" />
            <h2>Multiple Paragraphs</h2>
            <p>First paragraph of multiple paragraphs.</p>
            <p>Second paragraph of multiple paragraphs.</p>
        </body>
        </html>
        `;

    const expectedBlocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Welcome to the Sample Page',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'This is an example paragraph to test ',
              },
              {
                type: 'text',
                text: 'bold',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: ', ',
              },
              {
                type: 'text',
                text: 'italic',
                style: {
                  italic: true,
                },
              },
              {
                type: 'text',
                text: ', and ',
              },
              {
                type: 'text',
                text: 'inline code',
                style: {
                  code: true,
                },
              },
              {
                type: 'text',
                text: ' formatting.\n',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Here is a link to ',
              },
              {
                type: 'link',
                text: 'Example',
                url: 'http://example.com',
              },
              {
                type: 'text',
                text: ' website.\n',
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'List of Items',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_list',
            style: 'bullet',
            indent: 0,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'First item',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Second item with a ',
                  },
                  {
                    type: 'link',
                    text: 'link',
                    url: 'http://example.com/item',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Third item',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'bullet',
            indent: 1,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Nested item 1',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Nested item 2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Code Block Example',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_preformatted',
            elements: [
              {
                type: 'text',
                text: 'function helloWorld() {\n  console.log("Hello, world!");\n}\n',
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Blockquote Example',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_quote',
            elements: [
              {
                type: 'text',
                text: 'This is a blockquote to test the blockquote formatting.',
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Image Example',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Here is an image for testing:\n',
              },
            ],
          },
        ],
      },
      {
        type: 'image',
        image_url: 'http://example.com/image.jpg',
        alt_text: '',
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Multiple Paragraphs',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'First paragraph of multiple paragraphs.\n',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Second paragraph of multiple paragraphs.\n',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle real-world HTML samples correctly', () => {
    const html = readFileSync(
      join(__dirname, '../real_world_sample.html'),
      'utf8'
    );
    const expectedBlocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Welcome to the Sample Page',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'This is an example paragraph to test ',
              },
              {
                type: 'text',
                text: 'bold',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: ', ',
              },
              {
                type: 'text',
                text: 'italic',
                style: {
                  italic: true,
                },
              },
              {
                type: 'text',
                text: ', and ',
              },
              {
                type: 'text',
                text: 'inline code',
                style: {
                  code: true,
                },
              },
              {
                type: 'text',
                text: ' formatting. Also mixed, like ',
              },
              {
                type: 'text',
                text: 'this',
                style: {
                  bold: true,
                  italic: true,
                },
              },
              {
                type: 'text',
                text: ' or ',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: 'this',
                style: {
                  code: true,
                  bold: true,
                },
              },
              {
                type: 'text',
                text: '.\n',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Here is a link to ',
              },
              {
                type: 'link',
                text: 'Example',
                url: 'http://example.com',
              },
              {
                type: 'text',
                text: ' website.\n',
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'List of Items',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_list',
            style: 'bullet',
            indent: 0,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'First item',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Second item with a ',
                  },
                  {
                    type: 'link',
                    text: 'link',
                    url: 'http://example.com/item',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Third item',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'bullet',
            indent: 1,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Nested item 1',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Nested item 2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Code Block Example',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_preformatted',
            elements: [
              {
                type: 'text',
                text: 'function helloWorld() {\n  console.log("Hello, world!");\n}\n',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'This is a ',
              },
              {
                type: 'text',
                text: 'deleted test',
                style: {
                  strike: true,
                },
              },
              {
                type: 'text',
                text: '. Also ',
              },
              {
                type: 'text',
                text: 'this',
                style: {
                  strike: true,
                },
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Blockquote Example',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_quote',
            elements: [
              {
                type: 'text',
                text: 'This is a blockquote to test the blockquote formatting.',
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Image Example',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Here is an image for testing:\n',
              },
            ],
          },
        ],
      },
      {
        type: 'image',
        image_url: 'http://example.com/image.jpg',
        alt_text: 'Example Image',
        title: {
          type: 'plain_text',
          text: 'Example',
        },
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Multiple Paragraphs',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'First paragraph of multiple paragraphs.\n',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Second paragraph of multiple paragraphs.\n',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'This is an example paragraph to test ',
              },
              {
                type: 'text',
                text: 'bold',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: ', ',
              },
              {
                type: 'text',
                text: 'italic',
                style: {
                  italic: true,
                },
              },
              {
                type: 'text',
                text: ', and ',
              },
              {
                type: 'text',
                text: 'inline code',
                style: {
                  code: true,
                },
              },
              {
                type: 'text',
                text: ' formatting. Also mixed, like ',
              },
              {
                type: 'text',
                text: 'this, ',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: 'this',
                style: {
                  bold: true,
                  italic: true,
                },
              },
              {
                type: 'text',
                text: ' or ',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: 'this',
                style: {
                  code: true,
                  bold: true,
                },
              },
              {
                type: 'text',
                text: ' and ',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: ' this.\n',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle HTML with a mix of supported and unsupported tags', () => {
    const html = `
            <html>
                <body>
                    <h1>Title</h1>
                    <p>Paragraph with <b>bold</b> and <unsupported>unsupported</unsupported> tags.</p>
                    <h2>Subtitle</h2>
                    <p>Another paragraph.</p>
                </body>
            </html>
        `;

    const expectedBlocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Title',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Paragraph with ',
              },
              {
                type: 'text',
                text: 'bold',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: ' and ',
              },
              {
                type: 'text',
                text: ' tags.\n',
              },
            ],
          },
        ],
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Subtitle',
        },
      },
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Another paragraph.\n',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });
});
