import { preprocessHtmlContent } from '../../src/parsers';
import { parseHtml } from '../../src/parsers';
import { getBlocks, resetBlocks } from '../../src/handlers';


describe('Parsers Tests', () => {
    beforeEach(() => {
        resetBlocks();
    });

    describe('preprocessHtmlContent', () => {

        it('should log an error and return original HTML if an error occurs during preprocessing', () => {
            const html = '<p>Some HTML content</p>';

            // Mock the replace method to throw an error
            const originalReplace = String.prototype.replace;
            String.prototype.replace = jest.fn(() => { throw new Error('Simulated error'); });

            const originalConsoleError = console.error;
            console.error = jest.fn();

            const result = preprocessHtmlContent(html);

            expect(result).toBe(html);
            expect(console.error).toHaveBeenCalledWith('Error preprocessing HTML content:', expect.any(Error));

            // Restore the original replace method and console.error
            String.prototype.replace = originalReplace;
            console.error = originalConsoleError;
        });

        it('should handle the case where previous and next segments are <pre> tags', () => {
            const html = '<pre>Code block</pre>';
            const result = preprocessHtmlContent(html);

            expect(result).toBe(html);
        });

        it('should preprocess non-<pre> content correctly', () => {
            const html = '<p>Some text</p>';
            const result = preprocessHtmlContent(html);

            // Verify that the preprocessing was applied
            expect(result).toBe('<p>Some text</p>');
        });

        it('should handle the case where previous segment is not present', () => {
            const html = 'Code outside of pre';
            const result = preprocessHtmlContent(html);

            // Verify that the preprocessing was applied correctly
            expect(result).toBe('Code outside of pre');
        });

        it('should handle the case where next segment is not present', () => {
            const html = '<pre>Code block</pre>Some text';
            const result = preprocessHtmlContent(html);

            // Verify that the preprocessing was applied correctly
            expect(result).toBe('<pre>Code block</pre>Some text');
        });
    });

    describe('parseHtml', () => {
        it('should log an error if an error occurs during parsing', () => {
            const html = '<p>Some HTML content</p>';

            // Mock the parser's write method to throw an error
            const originalWrite = require('htmlparser2').Parser.prototype.write;
            require('htmlparser2').Parser.prototype.write = jest.fn(() => { throw new Error('Simulated error'); });

            const originalConsoleError = console.error;
            console.error = jest.fn();

            parseHtml(html);

            expect(console.error).toHaveBeenCalledWith('Error parsing HTML:', expect.any(Error));

            // Restore the original write method and console.error
            require('htmlparser2').Parser.prototype.write = originalWrite;
            console.error = originalConsoleError;
        });
    });
});