import { resetBlocks } from '../../src/handlers';
import convertHtmlToSlackBlocks from '../../src/index';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('convertHtmlToSlackBlocks', () => {
    beforeEach(() => {
        resetBlocks();
    });

    it('should convert simple HTML to Slack blocks', () => {
        const html = '<p>Hello, <b>world</b>!</p>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Hello, *world*!',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle multiple paragraphs', () => {
        const html = '<p>First paragraph.</p><p>Second paragraph.</p>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'First paragraph.',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Second paragraph.',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle nested tags', () => {
        const html = '<p>Hello, <i>beautiful <b>world</b></i>!</p>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Hello, _beautiful *world*_!',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle blockquote', () => {
        const html = '<blockquote>This is a quote.<br>This is another line.</blockquote>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '> This is a quote.\nThis is another line.',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle lists', () => {
        const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '• Item 1\n• Item 2',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle nested lists', () => {
        const html = '<ul><li>Item 1<ul><li>Subitem 1</li></ul></li></ul>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '• Item 1\n\t\t◦ Subitem 1',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle links', () => {
        const html = '<a href="http://example.com">Example</a>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '<http://example.com|Example>',
                },
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
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Line 1\nLine 2',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle code blocks', () => {
        const html = '<pre><code>console.log("Hello, world!");</code></pre>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '````console.log("Hello, world!");````',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle inline code', () => {
        const html = '<p>Use the <code>npm</code> command.</p>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Use the `npm` command.',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle empty HTML', () => {
        const html = '';
        const expectedBlocks: any[] = [];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle malformed HTML', () => {
        const html = '<p>Unclosed <b>tag';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Unclosed *tag*',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should perform correctly and efficiently with large HTML input, even if malformed', () => {
        const largeHtml = '<p>Large <b>input</p>'.repeat(1000000);

        const startTime = performance.now();
        const blocks = convertHtmlToSlackBlocks(largeHtml);
        const endTime = performance.now();

        const executionTime = endTime - startTime;

        const randomIndex = Math.floor(Math.random() * blocks.length);
        expect(blocks.length).toBe(1000000);
        expect(blocks[randomIndex].type).toBe('section');
        expect(blocks[randomIndex].text.type).toBe('mrkdwn');
        expect(blocks[randomIndex].text.text).toBe('Large *input*');
        expect(executionTime).toBeLessThan(10000);
    });

    it('should convert complex HTML to Slack blocks correctly', () => {
        const html = `
      <h1>Title</h1>
      <p>This is a <b>bold</b> paragraph with a <a href="http://example.com">link</a>.</p>
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
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'This is a *bold* paragraph with a <http://example.com|link>.',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '• Item 1\n• Item 2',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '\n```console.log("Hello, world!");```',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    describe('Handling Real-world HTML', () => {
        it('should correctly convert real-world HTML', () => {
            const html = readFileSync(join(__dirname, '../real_world_sample.html'), 'utf8');
            const blocks = convertHtmlToSlackBlocks(html);

            expect(blocks).toContainEqual({
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Welcome to the Sample Page',
                },
            });

            expect(blocks).toContainEqual({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'This is an example paragraph to test *bold*, _italic_, and `inline code` formatting.',
                },
            });

            expect(blocks).toContainEqual({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Here is a link to <http://example.com|Example> website.',
                },
            });

            expect(blocks).toContainEqual({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '• First item\n• Second item with a <http://example.com/item|link>\n• Third item\n\t\t◦ Nested item 1\n\t\t◦ Nested item 2',
                },
            });

            expect(blocks).toContainEqual({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '\n```\nfunction helloWorld() {\n  console.log("Hello, world!");\n}\n```',
                },
            });

            expect(blocks).toContainEqual({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '> This is a blockquote to test the blockquote formatting.',
                },
            });

            expect(blocks).toContainEqual({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'First paragraph of multiple paragraphs.',
                },
            });

            expect(blocks).toContainEqual({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Second paragraph of multiple paragraphs.',
                },
            });
        });
    });

    it('should handle HTML with special characters', () => {
        const html = '<p>Special characters: &amp; &lt; &gt;</p>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Special characters: & < >',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should ignore unsupported HTML tags', () => {
        const html = '<p>Text with <unsupported>unsupported tag</unsupported>.</p>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Text with unsupported tag.',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle empty HTML string', () => {
        const html = '';
        const expectedBlocks: any[] = [];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle HTML string with only whitespace', () => {
        const html = '   ';
        const expectedBlocks: any[] = [];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle deeply nested HTML elements', () => {
        const html = '<div><p><span><b>Deeply nested text</b></span></p></div>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*Deeply nested text*',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle malformed HTML with unclosed tags', () => {
        const html = '<p>Unclosed <b>tag';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Unclosed *tag*',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });

    it('should handle HTML with entities', () => {
        const html = '<p>Entities: &amp; &lt; &gt; &quot; &apos;</p>';
        const expectedBlocks = [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Entities: & < > " \'',
                },
            },
        ];

        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual(expectedBlocks);
    });
});
