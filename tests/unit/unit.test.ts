import convertHtmlToSlackBlocks from '../../src/index';

describe('convertHtmlToSlackBlocks', () => {
  it('should convert simple HTML to Slack blocks', () => {
    const html = '<p>Hello, <b>world</b>!</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Hello, ',
              },
              {
                type: 'text',
                text: 'world',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: '!',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle multiple paragraphs', () => {
    const html = '<p>First paragraph.</p><p>Second paragraph.</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'First paragraph.',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Second paragraph.',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle nested tags', () => {
    const html = '<p>Hello, <i>beautiful <b>world</b></i>!</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Hello, ',
              },
              {
                type: 'text',
                text: 'beautiful ',
                style: {
                  italic: true,
                },
              },
              {
                type: 'text',
                text: 'world',
                style: {
                  italic: true,
                  bold: true,
                },
              },
              {
                type: 'text',
                text: '!',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle blockquote', () => {
    const html =
      '<blockquote>This is a quote.<br>This is another line.</blockquote>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_quote',
            elements: [
              {
                type: 'text',
                text: 'This is a quote.\nThis is another line.',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle lists', () => {
    const html = '<ol><li>Item 1</li><li>Item 2</li></ol>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_list',
            style: 'ordered',
            indent: 0,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Item 1',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Item 2',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle nested lists', () => {
    const html =
      '<ul><li>1<ul><li>1.1</li><li>1.2<ul><li>1.2.1</li><li>1.2.2</li></ul></li><li>1.3</li></ul></li></ul><ol><li>A<ol><li>a.a</li><li>a.b<ol><li>a.b.a</li></ol></li><li>A.c</li></ol></li><li>B</li></ol>';
    const expectedBlocks = [
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
                    text: '1',
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
                    text: '1.1',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: '1.2',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'bullet',
            indent: 2,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: '1.2.1',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: '1.2.2',
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
                    text: '1.3',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'ordered',
            indent: 0,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'A',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'ordered',
            indent: 1,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'a.a',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'a.b',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'ordered',
            indent: 2,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'a.b.a',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'ordered',
            indent: 1,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'A.c',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_list',
            style: 'ordered',
            indent: 0,
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'B',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle links', () => {
    const html = '<p><a href="http://example.com">Example</a></p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'link',
                text: 'Example',
                url: 'http://example.com',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle headings', () => {
    const html = '<h1>Heading 1</h1><h2>Heading 2</h2>';
    const expectedBlocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Heading 1',
        },
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Heading 2',
        },
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle line breaks', () => {
    const html = '<p>Line 1<br>Line 2</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Line 1\nLine 2',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle preformatted and code blocks', () => {
    const html = '<pre><code>console.log("Hello, world!");</code></pre>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_preformatted',
            elements: [
              {
                type: 'text',
                text: 'console.log("Hello, world!");',
                style: {
                  code: true,
                },
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle inline code', () => {
    const html = '<p>Use the <code>npm</code> command.</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Use the ',
              },
              {
                type: 'text',
                text: 'npm',
                style: {
                  code: true,
                },
              },
              {
                type: 'text',
                text: ' command.',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle empty HTML', () => {
    const html = '';
    const expectedBlocks: [] = [];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle malformed HTML', () => {
    const html = '<p>Unclosed <b>tag';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Unclosed ',
              },
              {
                type: 'text',
                text: 'tag',
                style: {
                  bold: true,
                },
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle malformed HTML', () => {
    const html = `
    <ul>
      <li>
        name of pr
        <a href="https://github.com/reponame/reponame/pull/1605"
          >https://github.com/reponame/reponame/pull/1605</a
        >
      </li>
    </ul>
    `;

    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_list',
            style: 'bullet',
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'name of pr',
                  },
                  {
                    type: 'link',
                    url: 'https://github.com/reponame/reponame/pull/1605',
                    text: 'https://github.com/reponame/reponame/pull/1605',
                  },
                ],
              },
            ],
            indent: 0,
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  // it('should not print empty headings', () => {
  //   const html = '<h1></h1>';
  //   const expectedBlocks: [] = [];

  //   const blocks = convertHtmlToSlackBlocks(html);

  //   console.log("BRO");
  //   console.log(JSON.stringify(blocks, null, 2));
  //   expect(blocks).toEqual(expectedBlocks);
  // });

  // it('should perform correctly and efficiently with large HTML input, even if malformed', () => {
  //     const largeHtml = '<p>Large <b>input</p>'.repeat(500000);

  //     const startTime = performance.now();
  //     const blocks = convertHtmlToSlackBlocks(largeHtml);
  //     const endTime = performance.now();

  //     const executionTime = endTime - startTime;

  //     const randomIndex = Math.floor(Math.random() * blocks.length);
  //     expect(blocks.length).toBe(500000);
  //     expect(blocks[randomIndex].type).toBe('rich_text_section');
  //     expect((blocks[randomIndex] as RichTextSection).elements).toContainEqual(
  //         {
  //             type: 'text',
  //             text: "input",
  //             style: {
  //                 bold: true
  //             }
  //         }
  //     );
  //     expect((blocks[randomIndex] as RichTextSection).elements).toContainEqual(
  //         {
  //             type: 'text',
  //             text: "Large ",
  //         }
  //     );

  //     expect(executionTime).toBeLessThan(10000);
  // });

  it('should convert complex HTML to Slack blocks correctly', () => {
    const html = `
      <h1>Title</h1>
      <p>This is a <b>bold</b> paragraph <b>with a <a href="http://example.com">link</a></b>.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <pre>console.log("Hello, world!");</pre>
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
                text: 'This is a ',
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
                text: ' paragraph ',
              },
              {
                type: 'text',
                text: 'with a ',
                style: {
                  bold: true,
                },
              },

              {
                type: 'link',
                text: 'link',
                url: 'http://example.com',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: '.',
              },
            ],
          },

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
                    text: 'Item 1',
                  },
                ],
              },
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Item 2',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich_text_preformatted',
            elements: [
              {
                type: 'text',
                text: 'console.log("Hello, world!");',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should fallback to plain text on underline tags', () => {
    const html = '<p>Text with <u>underline</u>.</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Text with ',
              },
              {
                type: 'text',
                text: 'underline',
              },
              {
                type: 'text',
                text: '.',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should skip unsupported HTML tags', () => {
    const html = '<p>Text with <unsupported>unsupported tag</unsupported>.</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Text with ',
              },
              {
                type: 'text',
                text: '.',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  // it('should handle HTML string with only whitespace', () => {
  //   const html = '   ';
  //   const expectedBlocks: [] = [];

  //   const blocks = convertHtmlToSlackBlocks(html);
  //   expect(blocks).toEqual(expectedBlocks);
  // });

  it('should handle deeply nested HTML elements', () => {
    const html = '<div><p><span><b>Deeply nested text</b></span></p></div>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Deeply nested text',
                style: {
                  bold: true,
                },
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle HTML with entities', () => {
    const html = '<p>Entities: &amp; &lt; &gt; &quot; &apos;</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Entities: & < > " \'',
              },
            ],
          },
        ],
      },
    ];

    const blocks = convertHtmlToSlackBlocks(html);
    expect(blocks).toEqual(expectedBlocks);
  });

  it('should handle line breaks and clean up paragraphs with only line breaks', () => {
    const html =
      '<p>Some Text</p><p>More text without line break</p><p><br></p><p>text after an empty line</p>';
    const expectedBlocks = [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'Some Text',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'More text without line break',
              },
            ],
          },
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: 'text after an empty line',
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
