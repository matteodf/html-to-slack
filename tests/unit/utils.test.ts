import { resetBlocks } from '../../src/handlers';
import { cleanText } from '../../src/utils';

describe('cleanText', () => {
    beforeEach(() => {
        resetBlocks();
    });

    it('should normalize line endings and remove common leading indentation in preformatted text', () => {
        const text = '    line1\n    line2\n    line3';
        const expected = 'line1\nline2\nline3';
        expect(cleanText(text, true)).toBe(expected);
    });

    it('should handle mixed indentation levels in preformatted text', () => {
        const text = '  line1\n    line2\n line3';
        const expected = ' line1\n   line2\nline3';
        expect(cleanText(text, true)).toBe(expected);
    });

    it('should remove leading spaces on new lines in non-preformatted text', () => {
        const text = '  line1\n    line2\n  line3';
        const expected = 'line1\nline2\nline3';
        expect(cleanText(text)).toBe(expected);
    });

    it('should trim whitespace and normalize spaces in non-preformatted text', () => {
        const text = '  line1 \n    line2  \n  line3';
        const expected = 'line1\nline2\nline3';
        expect(cleanText(text)).toBe(expected);
    });

    it('should handle empty text', () => {
        const text = '';
        const expected = '';
        expect(cleanText(text)).toBe(expected);
    });

    it('should handle text with only whitespace', () => {
        const text = '    ';
        const expected = '';
        expect(cleanText(text)).toBe(expected);
    });

    it('should log an error and return original text if an error occurs during cleaning', () => {
        const text = 'Some text';

        // Mock the replace method to throw an error
        const originalReplace = String.prototype.replace;
        String.prototype.replace = jest.fn(() => { throw new Error('Simulated error'); });

        const originalConsoleError = console.error;
        console.error = jest.fn();

        const result = cleanText(text);

        expect(result).toBe(text);
        expect(console.error).toHaveBeenCalledWith('Error cleaning text:', expect.any(Error));

        // Restore the original replace method and console.error
        String.prototype.replace = originalReplace;
        console.error = originalConsoleError;
    });
});
