import convertHtmlToSlackBlocks from '../../src/index';
import { handleOpenTag, handleCloseTag, resetBlocks, handleText, addHeadingBlock, addTextBlock } from '../../src/handlers';
import { Attribs } from '../../src/types';


describe('Error Handling Tests', () => {
    beforeEach(() => {
        resetBlocks();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return an empty array and log an error if parseHtml throws an error', () => {
        jest.spyOn(require('../../src/parsers'), 'parseHtml').mockImplementationOnce(() => {
            throw new Error('Simulated error');
        });

        const html = '<p>Test</p>';
        const blocks = convertHtmlToSlackBlocks(html);

        expect(blocks).toEqual([]);
        expect(console.error).toHaveBeenCalledWith('Error converting HTML to Slack blocks:', expect.any(Error));
    });

    it('should return an empty array and log an error for non-string input', () => {
        const invalidInput = 12345;
        const blocks = convertHtmlToSlackBlocks(invalidInput as any);
        expect(blocks).toEqual([]);
        expect(console.error).toHaveBeenCalledWith('Invalid input: HTML content should be a string.');
    });

    it('should catch and log errors in handleOpenTag', () => {
        // Simulate an error in handleOpenTag by passing an unexpected tag
        jest.spyOn(require('../../src/handlers'), 'handleOpenTag').mockImplementationOnce(() => {
            throw new Error('Simulated error in handleOpenTag');
        });

        const malformedHtml = '<h8 attrib="malformed">malformed';
        const blocks = convertHtmlToSlackBlocks(malformedHtml);
        expect(blocks).toEqual([{
            "text": {
                "text": "malformed",
                "type": "mrkdwn",
            },
            "type": "section",
        }]);
        expect(console.error).toHaveBeenCalledWith('Error handling open tag <h8>:', expect.any(Error));
    });

    it('should catch and log errors in handleCloseTag', () => {
        // Simulate an error in handleCloseTag by passing an unexpected tag
        jest.spyOn(require('../../src/handlers'), 'handleCloseTag').mockImplementationOnce(() => {
            throw new Error('Simulated error in handleCloseTag');
        });

        const html = '<h8 attrib="malformed">Test</h8>';
        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual([{
            "text": {
                "text": "Test",
                "type": "mrkdwn",
            },
            "type": "section",
        }]);
        expect(console.error).toHaveBeenCalledWith('Error handling close tag </h8>:', new Error('Simulated error in handleCloseTag'));
    });

    it('should catch and log errors in handleText', () => {
        // Simulate an error in handleText by passing unexpected text
        jest.spyOn(require('../../src/handlers'), 'handleText').mockImplementationOnce(() => {
            throw new Error('Simulated error in handleText');
        });

        const html = '<p>Test</p>';
        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual([]);
        expect(console.error).toHaveBeenCalledWith('Error handling text:', new Error('Simulated error in handleText'));
    });

    it('should catch and log errors in cleanText', () => {
        // Simulate an error in cleanText by passing unexpected text
        jest.spyOn(require('../../src/utils'), 'cleanText').mockImplementationOnce(() => {
            throw new Error('Simulated error in cleanText');
        });

        const html = '<p>   Test  </p>';
        const blocks = convertHtmlToSlackBlocks(html);
        expect(blocks).toEqual([{
            "text": {
                "text": "   Test  ",
                "type": "mrkdwn",
            },
            "type": "section",
        }]);
        expect(console.error).toHaveBeenCalledWith('Error adding text block:', new Error('Simulated error in cleanText'));
    });

    it('should handle non-string inputs in cleanText gracefully', () => {
        const cleanText = require('../../src/utils').cleanText;
        const result = cleanText(12345 as any);
        expect(result).toBe('');
        expect(console.error).toHaveBeenCalledWith('Expected a string for cleanText, but received:', 'number');
    });

    it('should throw an error if tagname is not a string or attribs is not an object in handleOpenTag', () => {
        expect(() => handleOpenTag(null as any, {} as Attribs)).toThrow('Invalid arguments for handleOpenTag');
        expect(() => handleOpenTag('p', 12345 as any)).toThrow('Invalid arguments for handleOpenTag');
    });

    it('should throw an error if tagname is not a string in handleCloseTag', () => {
        expect(() => handleCloseTag(null as any)).toThrow('Invalid argument for handleCloseTag');
    });

    it('should log an error if an exception occurs in addTextBlock', () => {
        // Mock cleanText to throw an error
        jest.spyOn(require('../../src/utils'), 'cleanText').mockImplementationOnce(() => {
            throw new Error('Simulated error');
        });

        // Set up currentText to ensure addTextBlock is called
        handleText('Test text');
        addTextBlock();

        expect(console.error).toHaveBeenCalledWith('Error adding text block:', expect.any(Error));
    });


    it('should log an error if an exception occurs in addHeadingBlock', () => {
        handleText('Test heading');

        // Mock blocks.push to throw an error
        const originalPush = Array.prototype.push;
        Array.prototype.push = jest.fn(() => { throw new Error('Simulated error'); });

        // Call addHeadingBlock
        addHeadingBlock();

        // Restore the original push method
        Array.prototype.push = originalPush;

        // Verify that console.error was called with the correct arguments
        expect(console.error).toHaveBeenCalledWith('Error adding heading block:', expect.any(Error));
    });

    it('should throw an error if text is not a string in handleText', () => {
        expect(() => handleText(null as any)).toThrow('Invalid argument for handleText');
        expect(() => handleText(123 as any)).toThrow('Invalid argument for handleText');
    });
});
