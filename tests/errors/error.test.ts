import convertHtmlToSlackBlocks from '../../src/index';
import * as parsers from '../../src/parsers';

describe('Error Handling Tests', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return an empty array and log an error if parseHtml throws an error', () => {
    jest.spyOn(parsers, 'parseHtml').mockImplementationOnce(() => {
      throw new Error('Simulated error');
    });

    const html = '<p>Test</p>';
    const blocks = convertHtmlToSlackBlocks(html);

    expect(blocks).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      'Error converting HTML to Slack blocks:',
      expect.any(Error)
    );
  });

  it('should return an empty array and log an error for non-string input', () => {
    const invalidInput = 12345;
    const blocks = convertHtmlToSlackBlocks(invalidInput as never);
    expect(blocks).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      'Invalid input: HTML content should be a string.'
    );
  });
});
