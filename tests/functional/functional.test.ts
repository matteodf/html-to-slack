import convertHtmlToSlackBlocks from '../../src/index';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resetBlocks } from '../../src/handlers';

describe('Functional Tests', () => {
    beforeEach(() => {
        resetBlocks();
    });

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
                This is an example paragraph to test <b>bold</b>, <i>italic</i>, and
                <code>inline code</code> formatting.
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
            <img src="http://example.com/image.jpg" alt="Example Image" />
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
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'This is an example paragraph to test *bold*, _italic_, and `inline code` formatting.',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Here is a link to <http://example.com|Example> website.',
                },
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'List of Items',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '• First item\n• Second item with a <http://example.com/item|link>\n• Third item\n\t\t◦ Nested item 1\n\t\t◦ Nested item 2',
                },
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Code Block Example',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '\n```\nfunction helloWorld() {\n  console.log("Hello, world!");\n}\n```',
                },
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Blockquote Example',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '> This is a blockquote to test the blockquote formatting.',
                },
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Image Example',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Here is an image for testing:',
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
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'First paragraph of multiple paragraphs.',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Second paragraph of multiple paragraphs.',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle real-world HTML samples correctly', () => {
        const html = readFileSync(join(__dirname, '../real_world_sample.html'), 'utf8');
        const expectedBlocks = [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Welcome to the Sample Page',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'This is an example paragraph to test *bold*, _italic_, and `inline code` formatting.',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Here is a link to <http://example.com|Example> website.',
                },
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'List of Items',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '• First item\n• Second item with a <http://example.com/item|link>\n• Third item\n\t\t◦ Nested item 1\n\t\t◦ Nested item 2',
                },
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Code Block Example',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '\n```\nfunction helloWorld() {\n  console.log("Hello, world!");\n}\n```',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'This is a ~deleted test~. Also ~this~',
                }
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Blockquote Example',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '> This is a blockquote to test the blockquote formatting.',
                },
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Image Example',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Here is an image for testing:',
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
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'First paragraph of multiple paragraphs.',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Second paragraph of multiple paragraphs.',
                },
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
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Paragraph with *bold* and unsupported tags.',
                },
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Subtitle',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Another paragraph.',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });
});
